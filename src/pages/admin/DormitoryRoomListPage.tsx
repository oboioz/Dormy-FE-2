import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
// @mui
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

  // const [tableData, setTableData] = useState<BuildingModel>();
  const [building, setBuilding] = useState<BuildingModel>();

  // const [filterName, setFilterName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

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

    var response = await buildingService.getBuildingById(buildingId);
    if (response) {
      setBuilding(response);
    }
  };

  useEffect(() => {
    if (buildingId) {
      fetchBuilding(buildingId);
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
              component={RouterLink}
              to={PATH_ADMIN.dormitory.roomCreate}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Room
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
    </>
  );
}

// ----------------------------------------------------------------------

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
