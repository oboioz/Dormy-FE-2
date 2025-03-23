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
import { httpClient } from "../../utils/axios";
import {
  IRoomService,
  RoomServiceEnum,
} from "../../models/responses/RoomServiceModels";
import RoomServiceRow from "../../sections/@dashboard/admin/venue/RoomServiceRow";

const TABLE_HEAD = [
  { id: "roomServiceName", label: "Service Name", align: "left" },
  { id: "cost", label: "Price", align: "left" },
  { id: "unit", label: "Unit", align: "left" },
  { id: "roomServiceType", label: "Type", align: "left" },
  {
    id: "isServiceIndicatorUsed",
    label: "Is Indicator Used?",
    align: "left",
  },
  { id: "" },
];

export default function RoomServicePage() {
  useAuthGuard(UserRole.ADMIN);
  const navigate = useNavigate();

  const [roomServices, setRoomServices] = useState<IRoomService[]>([]);
  const [roomServiceEnums, setRoomServiceEnums] = useState<RoomServiceEnum[]>(
    []
  );

  const {
    page,
    rowsPerPage,
    selected,
    setPage,
    setSelected,
    onSelectRow,
    onSelectAllRows,
  } = useTable();

  const dataInPage = roomServices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState(roomServices);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !roomServices.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_ADMIN.dormitory.roomTypeForm);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = roomServices.filter((row) => row.id.toString() !== id);
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
      } else if (selectedRows.length === roomServices.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage =
          Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const fetchRoomServices = async () => {
    var response = await httpClient.getRoomServiceBatch({
      isGetAll: true,
      ids: [],
    });
    console.log(response);
    setRoomServices(response || []);
  };

  const fetchRoomServiceEnums = async () => {
    var response = await httpClient.getRoomServiceEnums();
    console.log(response);
    setRoomServiceEnums(response || []);
  };

  useEffect(() => {
    fetchRoomServices();
    fetchRoomServiceEnums();
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
              component={RouterLink}
              to={PATH_ADMIN.dormitory.roomServiceForm}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
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
                        onEditRow={() => handleEditRow(row.id.toString())}
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

// ----------------------------------------------------------------------
