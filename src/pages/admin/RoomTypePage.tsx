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
import RoomTypeRow from "../../sections/@dashboard/admin/venue/RoomTypeRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { roomTypeService } from "../../services/roomTypeService";
import {
  IRoomType,
  IRoomTypeCreate,
} from "../../models/responses/RoomTypeModels";
import { httpClient } from "../../services";
import { toast } from "react-toastify";
import CreateEditRoomTypeModal from "../../sections/@dashboard/admin/venue/CreateEditRoomTypeModal";

const TABLE_HEAD = [
  { id: "roomTypeName", label: "Name", align: "left" },
  { id: "capacity", label: "Capacity", align: "center" },
  { id: "price", label: "Price (VND)", align: "center" },
  { id: "description", label: "Description", align: "left" },
  { id: "" },
];

export default function RoomTypePage() {
  useAuthGuard(UserRole.ADMIN);
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const {
    page,
    rowsPerPage,
    selected,
    setPage,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    setRowsPerPage,
  } = useTable();

  const dataInPage = roomTypes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const { themeStretch } = useSettingsContext();

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const isNotFound = !roomTypes.length;

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

  const handleCreateOrUpdateRoomType = async (formData: IRoomTypeCreate) => {
    try {
      const response = await httpClient.roomTypeService.createRoomType(
        formData
      );
      if (response) {
        toast.success("Room type was created successfully!");
        const addRoomType: IRoomType = {
          id: response,
          roomTypeName: formData.roomTypeName,
          description: formData.description,
          capacity: formData.capacity,
          price: formData.price,
          roomServices: [],
        };
        setRoomTypes((prevRoomTypes) => [...prevRoomTypes, addRoomType]);
        // fetchRoomTypes();
        handleCloseCreateModal();
      }
    } catch (error) {
      toast.error("An error occurred while saving the room type.");
    }
  };

  const handleEditRow = (id: string) => {
    navigate(`${PATH_ADMIN.dormitory.roomTypeForm}?id=${id}`);
  };

  const handleDeleteRow = async (id: string) => {
    try {
      var response = await httpClient.roomTypeService.softDeleteRoomType(id);
      if (response) {
        toast.success("Deleted");
        window.location.reload();
      } else {
        toast.error("Error, room type is used in other places");
      }
    } catch (error) {
      toast.error("Error, room type is used in other places");
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    toast.info("Featuer is maintained");
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

  const fetchRoomTypes = async () => {
    var response = await httpClient.roomTypeService.getRoomTypeBatch();
    if (response) {
      setRoomTypes(response);
      console.log(response);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Room Type List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Room Type" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenCreateModal}
            >
              New Room Type
            </Button>
          }
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={roomTypes.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  roomTypes.map((row) => row.id.toString())
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
                  rowCount={roomTypes.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      roomTypes.map((row) => row.id.toString())
                    )
                  }
                />

                <TableBody>
                  {roomTypes
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <RoomTypeRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        onEditRow={() => handleEditRow(row.id.toString())}
                        onDeleteRow={() => handleDeleteRow(row.id.toString())}
                      />
                    ))}

                  <TableEmptyRows
                    emptyRows={emptyRows(page, rowsPerPage, roomTypes.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={roomTypes.length}
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
      <CreateEditRoomTypeModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateOrUpdateRoomType}
      />
    </>
  );
}
