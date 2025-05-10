import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ConfirmDialog from "../../components/confirm-dialog";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedAction,
  useTable,
} from "../../components/table";
import { PATH_ADMIN } from "../../routes/paths";
import GarageListRow from "../../sections/@dashboard/admin/garage/GarageListRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { httpClient } from "../../services";
import {
  IParkingSpot,
  IParkingSpotCreateModel,
  IParkingSpotUpdateModel,
} from "../../models/responses/ParkingSpotModels";
import { toast } from "react-toastify";
import ParkingSpotCreateEditModal from "../../sections/@dashboard/admin/garage/ParkingSpotCreateEditModal";

const TABLE_HEAD = [
  { id: "parkingSpotName", label: "Parking spot", align: "left" },
  { id: "capacitySpots", label: "Capacity", align: "center" },
  { id: "currentQuantity", label: "Occupied", align: "center" },
  { id: "status", label: "Status", align: "left" },
  { id: "createinvoice", label: "Action", align: "center" },
  { id: "" },
];

export default function VehicleGaragePage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<IParkingSpot[]>([]);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const isNotFound = !tableData.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleEditRow = (id: string) => {
    // navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.id.toString() !== id);
    setSelected([]);
    setTableData(deleteRow);

    // if (page > 0) {
    //   if (dataInPage.length < 2) {
    //     setPage(page - 1);
    //   }
    // }
  };
  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter(
      (row) => !selectedRows.includes(row.id.toString())
    );
    setSelected([]);
    setTableData(deleteRows);

    // if (page > 0) {
    //   if (selectedRows.length === dataInPage.length) {
    //     setPage(page - 1);
    //   } else if (selectedRows.length === mockParkingSpots.length) {
    //     setPage(0);
    //   } else if (selectedRows.length > dataInPage.length) {
    //     const newPage =
    //       Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
    //     setPage(newPage);
    //   }
    // }
  };

  const fetchParkingSpots = async () => {
    var request = await httpClient.parkingSpotService.getParkingSpotBatch({
      ids: [],
    });

    request.sort((a, b) => {
      if (a.isDeleted === b.isDeleted) {
        return (
          new Date(b.createdDateUtc).getTime() -
          new Date(a.createdDateUtc).getTime()
        );
      }
      return a.isDeleted ? 1 : -1; // Place isDeleted = true at the end
    });

    setTableData(request);
  };

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleEditParkingSpot = async (updatedParkingSpot: IParkingSpot) => {
    try {
      const payload: IParkingSpotUpdateModel = {
        id: updatedParkingSpot.id,
        parkingSpotName: updatedParkingSpot.parkingSpotName,
        capacitySpots: updatedParkingSpot.capacitySpots,
      };
      const response = await httpClient.parkingSpotService.updateParkingSpot(
        payload
      );
      if (response) {
        toast.success("Parking spot was updated successfully!");
        setTableData((prevParkingSpots) =>
          prevParkingSpots.map((parkingSpot) =>
            parkingSpot.id === updatedParkingSpot.id
              ? updatedParkingSpot
              : parkingSpot
          )
        );
        handleCloseCreateModal();
      }
    } catch (error) {
      toast.error("An error occurred while saving the workplace.");
    }
  };

  const handleCreateParkingSpot = async (formData: IParkingSpotCreateModel) => {
    try {
      const response = await httpClient.parkingSpotService.createParkingSpot(
        formData
      );
      if (response) {
        toast.success("Parking spot was created successfully!");
        const addParkingSpot: IParkingSpot = {
          id: response,
          parkingSpotName: formData.parkingSpotName,
          capacitySpots: formData.capacitySpots,
          currentQuantity: 0,
          status: "AVAILABLE",
          vehicles: [],
        };
        setTableData((prevParkingSpots) => [
          ...prevParkingSpots,
          addParkingSpot,
        ]);
        handleCloseCreateModal();
      }
    } catch (error) {
      toast.error("An error occurred while creating the parking spot.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Parking Spot List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Parking Spot List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Parking Spot List" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenCreateModal}
            >
              Add new Parking Spot
            </Button>
          }
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            {/* <TableSelectedAction
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id.toString())
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            /> */}

            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id.toString())
                    )
                  }

                  // rowCount={tableData.length}
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <GarageListRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        onEditRow={() => handleEditRow(row.id.toString())}
                        // onEditRow={(updatedParkingSpot) => handleEditParkingSpot(updatedParkingSpot)}
                        onDeleteRow={() => handleDeleteRow(row.id.toString())}
                      />
                    ))}

                  <TableEmptyRows
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Deactivate Parking Spot"
        content={
          <>
            Are you sure want to deactivate <strong> {selected.length} </strong>{" "}
            items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Deactivate
          </Button>
        }
      />
      <ParkingSpotCreateEditModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateParkingSpot}
      />
    </>
  );
}
