import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
// @mui
import {
  Autocomplete,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Tooltip,
} from "@mui/material";
// routes

// components
import ConfirmDialog from "../../components/confirm-dialog";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from "../../components/table";
// sections
import { Helmet } from "react-helmet-async";
import { IRoom } from "../../@types/room";
import _roomList from "../../_mock/assets/room";
import { PATH_ADMIN } from "../../routes/paths";
import RoomTableRow from "../../sections/@dashboard/admin/venue/RoomTableRow";
import RoomTableToolbar from "../../sections/@dashboard/admin/venue/RoomTableToolbar";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { BuildingModel } from "../../models/responses/BuildingModels";
import { buildingService } from "../../services/buildingService";
import { IRoomType } from "../../models/responses/RoomTypeModels";
import { httpClient } from "../../services";
import { ICreateRoomBatch } from "../../models/responses/RoomModel";
import { forEach } from "lodash";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

const TABLE_HEAD = [
  { id: "floor", label: "Floor", align: "center" },
  { id: "room", label: "Room", align: "center" },
  { id: "bed", label: "Occupied Bed", align: "center" },
  { id: "roomtype", label: "Room Type", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "" },
];

export default function DormitoryRoomListPage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultRowsPerPage: 10 });

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();
  const { buildingId } = useParams();

  const [building, setBuilding] = useState<BuildingModel>();

  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const [createRoomBatch, setCreateRoomBatch] = useState<ICreateRoomBatch>({
    floorNumber: 0,
    roomTypeId: "",
    totalRoomsWantToCreate: 0,
  });
  const [selectedRoomType, setSelectedRoomType] = useState<IRoomType | null>(
    null
  );

  const isEnableSubmit =
    createRoomBatch.floorNumber > 0 &&
    createRoomBatch.roomTypeId &&
    createRoomBatch.totalRoomsWantToCreate > 0;

  const handleSetFloorNumber = (value: number) => {
    setCreateRoomBatch({ ...createRoomBatch, floorNumber: value });
  };

  const handleSetRoomType = (value: IRoomType) => {
    setSelectedRoomType(value);
    setCreateRoomBatch({ ...createRoomBatch, roomTypeId: value.id });
  };

  const handleSetTotalRoom = (value: number) => {
    setCreateRoomBatch({ ...createRoomBatch, totalRoomsWantToCreate: value });
  };

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCreateRoom, setOpenCreateForm] = useState<boolean>(false);

  const handleOpenCreateRoomModal = () => {
    setOpenCreateForm(true);
  };

  const handleCloseCreateRoomModal = () => {
    setOpenCreateForm(false);
  };

  // const dataFiltered = applyFilter({
  //   inputData: building?.rooms || [],
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const isFiltered = filterName !== "";

  // const isNotFound =
  //   (!dataFiltered.length && !!filterName) || !dataFiltered.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    // setFilterName(event.target.value);
  };

  const handleDetailRow = (id: string) => {
    navigate(PATH_ADMIN.dormitory.roomDetail(id));
  };

  const handleResetFilter = () => {
    // setFilterName("");
  };

  const fetchBuilding = async (buildingId: string) => {
    if (!buildingId) return;

    var response = await httpClient.buildingService.getBuildingById(buildingId);
    if (response) {
      setBuilding(response);
    }
  };

  const fetchRoomTypes = async () => {
    var response = await httpClient.roomTypeService.getRoomTypeBatch();
    if (response) {
      setRoomTypes(response);
      console.log(response);
    }
  };

  const handleCreateRoomBatch = async (payload: ICreateRoomBatch) => {
    var response = await httpClient.roomService.createRoomBatch(buildingId, [
      payload,
    ]);

    if (response === HttpStatusCode.Ok) {
      toast.success("Create rooms success");
      fetchBuilding(buildingId);
    } else {
      toast.error("An error has occurred, please try again later");
    }
    handleCloseCreateRoomModal();
  };

  useEffect(() => {
    if (buildingId) {
      fetchBuilding(buildingId);
      fetchRoomTypes();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Room List | Building</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Room List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Building", href: PATH_ADMIN.dormitory.buildings },
            { name: building?.name || "--" },
            { name: "Room List" },
          ]}
          action={
            <Button
              onClick={() => handleOpenCreateRoomModal()}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Rooms
            </Button>
          }
        />

        <Card>
          {/* <RoomTableToolbar
            isFiltered={false}
            filterName={""}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          /> */}

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={building?.rooms.length || 0}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  (building?.rooms ?? []).map((row) => row.id.toString())
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
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={building?.rooms.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      (building?.rooms ?? []).map((row) => row.id.toString())
                    )
                  }
                />

                <TableBody>
                  {(building?.rooms ?? [])
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort((a, b) => a.roomNumber - b.roomNumber)
                    .map((row) => (
                      <RoomTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        onDetailRow={() => handleDetailRow(row.id.toString())}
                      />
                    ))}

                  <TableEmptyRows
                    emptyRows={emptyRows(
                      page,
                      rowsPerPage,
                      building?.rooms.length || 0
                    )}
                  />

                  <TableNoData isNotFound={false} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={building?.rooms.length || 0}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
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
              // handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
      <Dialog
        open={openCreateRoom}
        onClose={() => handleCloseCreateRoomModal()}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Rooms</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* Room Number Field */}
            <TextField
              id="roomCount"
              label="Room Number"
              type="number"
              value={createRoomBatch.totalRoomsWantToCreate}
              onChange={(e) => handleSetTotalRoom(Number(e.target.value || 0))}
              fullWidth
            />
            <FormControl>
              <InputLabel id="floor-label">Select Floor</InputLabel>
              <Select
                id="floor"
                labelId="floor-label"
                label="Select Floor"
                value={createRoomBatch.floorNumber}
                onChange={(e) => handleSetFloorNumber(Number(e.target.value))}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Floor
                </MenuItem>
                {Array.from(
                  { length: building?.totalFloors || 0 },
                  (_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      Floor {index + 1}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            {/* Room Type Dropdown */}
            <Autocomplete
              id="roomType"
              options={roomTypes}
              getOptionLabel={(option: IRoomType) =>
                `${option.roomTypeName || "N/A"} - ${option.price || 0} VND`
              }
              value={selectedRoomType}
              onChange={(event, newValue: IRoomType | null) =>
                handleSetRoomType(newValue!)
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Room Type" />
              )}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseCreateRoomModal()}>Cancel</Button>
          <Button
            disabled={!isEnableSubmit}
            variant="contained"
            onClick={() => handleCreateRoomBatch(createRoomBatch)}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: IRoom[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (room) =>
        room.roomNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
