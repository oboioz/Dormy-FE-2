import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { mockVehicles } from "../../_mock/assets/vehicle";
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
import VehicleListRow from "../../sections/@dashboard/admin/garage/VehicleListRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { IVehicle } from "../../models/responses/VehicleModels";
import { httpClient } from "../../services";

const TABLE_HEAD = [
  { id: "vehicleType", label: "Vehicle Type", align: "left" },
  { id: "licensePlate", label: "License Plate", align: "left" },
  { id: "parkingSpotName", label: "Parking Spot", align: "left" },
  { id: "userFullname", label: "Owner", align: "left" },
  { id: "isDeleted", label: "Status", align: "left" },
  { id: "history", label: "History", align: "center" },
  // { id: "" },
];

const _vehicleList = mockVehicles;

export default function RoomTypePage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
  } = useTable();

  const dataInPage = _vehicleList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<IVehicle[]>([]);

  const [openConfirm, setOpenConfirm] = useState(false);

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

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.id.toString() !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter(
      (row) => !selectedRows.includes(row.id.toString())
    );
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === _vehicleList.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage =
          Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const fetchVehicles = async () => {
    var request = await httpClient.vehicleService.getVehicleBatch({ ids: [] });
    request.sort(
      (a, b) =>
        new Date(b.createdDateUtc).getTime() -
        new Date(a.createdDateUtc).getTime()
    );
    console.log(request);
    setTableData(request);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <>
      <Helmet>
        <title>Vehicle List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Vehicle List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Vehicle List" },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     to={PATH_DASHBOARD.user.new}
          //     variant="contained"
          //     startIcon={<Iconify icon="eva:plus-fill" />}
          //   >
          //     Add new contract
          //   </Button>
          // }
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
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
            />

            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  // numSelected={selected.length}
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     tableData.map((row) => row.vehicleID.toString())
                  //   )
                  // }

                  // rowCount={tableData.length}
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <VehicleListRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        onEditRow={() => handleEditRow(row.id.toString())}
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
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong>{" "}
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
            Delete
          </Button>
        }
      />
    </>
  );
}
