import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
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

// components
import { useEffect, useState } from "react";
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
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
// import { httpClient } from "../../utils/axios";
import { IRoomService, IRoomServiceUpdate } from "../../models/responses/RoomServiceModels";
import RoomServiceRow from "../../sections/@dashboard/admin/venue/RoomServiceRow";
import { toast } from "react-toastify";
import { httpClient } from "../../services";
import CreateEditRoomServiceModal from "../../sections/@dashboard/admin/venue/CreateEditRoomServiceModal";

const TABLE_HEAD = [
  { id: "roomServiceName", label: "Service Name", align: "left" },
  { id: "cost", label: "Price", align: "center" },
  { id: "unit", label: "Unit", align: "left" },
  { id: "roomServiceType", label: "Type", align: "left" },
  {
    id: "isServiceIndicatorUsed",
    label: "Is Indicator Used?",
    align: "center",
  },
  { id: "" },
];

export default function RoomServicePage() {
  useAuthGuard(UserRole.ADMIN);
  const navigate = useNavigate();

  const [roomServices, setRoomServices] = useState<IRoomService[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  
  const {
    page,
    rowsPerPage,
    selected,
    setPage,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    setRowsPerPage,
  } = useTable({ defaultRowsPerPage: 10 });

  const { themeStretch } = useSettingsContext();

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !roomServices.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleEditRow = async (id: string) => {
    navigate(`${PATH_ADMIN.dormitory.roomServiceForm}?id=${id}`);
  };

  const handleDeleteRow = async (id: string) => {
    try {
      var response = await httpClient.roomServiceService.softDeleteRoomServiceBatch([id]);
      if (response) {
        toast.success("Deleted");
        window.location.reload();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  const handleDeleteRows = async (selectedRows: string[]) => {
    try {
      var response = await httpClient.roomServiceService.softDeleteRoomServiceBatch(selectedRows);
      if (response) {
        toast.success("Deleted");
        window.location.reload();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  const fetchRoomServices = async () => {
    var response = await httpClient.roomServiceService.getRoomServiceBatch({
      ids: [],
    });
    console.log(response);
    setRoomServices(response || []);
  };

  const handleUpdateRoomService = async (updatedRoomService: IRoomService) => {
    try {
      const payload: IRoomServiceUpdate = {
        id: updatedRoomService.id,
        roomServiceName: updatedRoomService.roomServiceName,
        unit: updatedRoomService.unit,
        cost: updatedRoomService.cost,
        roomServiceType: updatedRoomService.roomServiceType,
        isServiceIndicatorUsed: updatedRoomService.isServiceIndicatorUsed,
      }
      const response = await httpClient.roomServiceService.updateRoomServiceBatch(payload);
      if (response) {
        toast.success("Room service was updated successfully!");
        setRoomServices((prevRoomServices) =>
          prevRoomServices.map((roomService) =>
            roomService.id === updatedRoomService.id ? updatedRoomService : roomService
          )
        );
        handleCloseCreateModal();
      }
    } catch (error) {
      toast.error("An error occurred while saving the room service.");
    }
  };

  const handleCreateOrUpdateRoomService = async (formData: IRoomService) => {
    try {
      const response = await httpClient.roomServiceService.createRoomServiceBatch([formData]);
      if (response) {
        toast.success("Room type was created successfully!");
        const addRoomService: IRoomService = {
          id: response[0],
          roomServiceName: formData.roomServiceName,
          unit: formData.unit,
          cost: formData.cost,
          roomServiceType: formData.roomServiceType,
          isServiceIndicatorUsed: formData.isServiceIndicatorUsed,     
        } 
        setRoomServices((prevRoomServices) => [...prevRoomServices, addRoomService]);
        // fetchRoomTypes();
        handleCloseCreateModal();
      }
    } catch (error) {
      toast.error("An error occurred while saving the room service.");
    }
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

  useEffect(() => {
    fetchRoomServices();
  }, []);

  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Room Service List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Room Service" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenCreateModal}
            >
              New Room Service
            </Button>
          }
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={roomServices.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  roomServices.map((row) => row.id.toString())
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
                  rowCount={roomServices.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      roomServices.map((row) => row.id.toString())
                    )
                  }
                />

                <TableBody>
                  {roomServices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <RoomServiceRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        // onEditRow={() => handleEditRow(row.id.toString())}
                        onEditRow={(updatedRoomService) => handleUpdateRoomService(updatedRoomService)}
                        onDeleteRow={() => handleDeleteRow(row.id.toString())}
                      />
                    ))}

                  <TableEmptyRows
                    emptyRows={emptyRows(
                      page,
                      rowsPerPage,
                      roomServices.length
                    )}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={roomServices.length}
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
      <CreateEditRoomServiceModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateOrUpdateRoomService}
      />
    </>
  );
}
