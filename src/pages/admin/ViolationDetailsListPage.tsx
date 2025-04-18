import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import _mock from "../../_mock";
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
import ViolationTableRow from "../../sections/@dashboard/admin/violation/ViolationTableRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import {
  IViolation,
  IViolationCreate,
  IViolationUpdate,
} from "../../models/responses/ViolationModels";
import { httpClient } from "../../services";
import { toast } from "react-toastify";
import { Profile } from "../../models/responses/UserModel";
import { description } from "../../_mock/assets";
import { DatePicker } from "@mui/x-date-pickers";

const TABLE_HEAD = [
  { id: "fullName", label: "Violator", align: "left" },
  { id: "violationDate", label: "Violation Date", align: "center" },
  { id: "description", label: "Description", align: "left" },
  { id: "penalty", label: "Penalty", align: "right" },
  { id: "phone", label: "Phone", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "dateOfBirth", label: "DoB", align: "center" },
  { id: "" },
];

const _violationList = [...Array(24)].map((_, index) => ({
  violationID: index + 1, // Unique ID
  description: _mock.text.sentence(index), // Mock violation description
  violationDate: _mock.time(index), // Mock violation date
  penalty: _mock.number.age(index), // Mock penalty amount between 10 and 500
  userID: {
    id: index + 100, // Mock user ID
    firstName: _mock.name.fullName(index), // Mock user name
  },
  createdAt: _mock.time(index), // Mock creation date
  adminID: {
    id: index + 200, // Mock admin ID
    firstName: _mock.name.fullName(index + 50), // Mock admin name
  },
}));

export default function ViolationDetailsListPage() {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    order,
    orderBy,
    selected,
    rowsPerPage,
    onSort,
    setPage,
    setRowsPerPage,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onChangeRowsPerPage,
    onChangePage,
  } = useTable({ defaultRowsPerPage: 10 });

  const dataInPage = _violationList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const [tableData, setTableData] = useState<IViolation[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [violationCreate, setViolationCreate] = useState<IViolationCreate>({
    description: "",
    penalty: 0,
    userId: "",
    violationDate: new Date(),
  });

  const [filterName, setFilterName] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);

  // Create Edit Form
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<Profile | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(
    undefined
  );
  const isNotFound = !tableData.length;
  const isEnableSubmit =
    violationCreate.description.length > 0 &&
    violationCreate.penalty >= 0 &&
    violationCreate.userId &&
    violationCreate.violationDate;

  const handleOpenConfirm = (id?: string) => {
    setSelectedRowId(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenCreateModal = (id?: string) => {
    setSelectedRowId(id);
    if (id) {
      var selectedViolation = tableData.find((x) => x.id == id);
      setViolationCreate({
        description: selectedViolation?.description || "",
        penalty: selectedViolation?.penalty || 0,
        userId: selectedViolation?.userId || "",
        violationDate: selectedViolation?.violationDate
          ? new Date(selectedViolation?.violationDate)
          : new Date(),
      });
      setSelectUser(
        users.find((x) => x.userId === selectedViolation?.userId) || null
      );
    }
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setSelectedRowId(undefined);
    setSelectUser(null);
    setViolationCreate({
      description: "",
      penalty: 0,
      userId: "",
      violationDate: new Date(),
    });
  };

  // create
  const handleChangeDescription = (value: string) => {
    setViolationCreate({ ...violationCreate, description: value });
  };

  const handleChangeDate = (value: Date | null) => {
    setViolationCreate({
      ...violationCreate,
      violationDate: value || new Date(),
    });
  };

  const handleChangePenalty = (value: string) => {
    setViolationCreate({ ...violationCreate, penalty: Number(value) });
  };

  const handleChangeUser = (value: Profile | null) => {
    setSelectUser(value);
    setViolationCreate({ ...violationCreate, userId: value?.userId || "" });
  };

  const handleCreateViolation = () => {
    if (selectedRowId) {
      updateViolation({
        ...violationCreate,
        id: selectedRowId,
      } as IViolationUpdate);
    } else {
      createViolation(violationCreate);
    }
    handleCloseCreateModal();
  };
  // end create

  const handleDeleteRow = (id: string) => {
    if (id) {
      softDeleteViolation(id);
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
      } else if (selectedRows.length === _violationList.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage =
          Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const fetchViolations = async () => {
    var response = await httpClient.violationService.getViolationBatch({
      ids: [],
    });

    response.sort((a, b) => {
      if (a.isDeleted === b.isDeleted) {
        return (
          new Date(b.createdDateUtc).getTime() -
          new Date(a.createdDateUtc).getTime()
        );
      }
      return a.isDeleted ? 1 : -1; // Place isDeleted = true at the end
    });

    setTableData(response);
  };

  const fetchUsers = async () => {
    var response = await httpClient.authService.getUsers({
      ids: [],
    });

    setUsers(response);
  };

  const createViolation = async (payload: IViolationCreate) => {
    var response = await httpClient.violationService.createViolation(payload);
    if (response) {
      toast.success("Created");
      fetchViolations();
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  const updateViolation = async (payload: IViolationUpdate) => {
    var response = await httpClient.violationService.updateViolation(payload);
    if (response) {
      toast.success("Updated");
      window.location.reload();
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  const softDeleteViolation = async (id: string) => {
    var response = await httpClient.violationService.softDeleteViolation(id);
    if (response) {
      toast.success("Deleted");
      window.location.reload();
    } else {
      toast.error("An error has occurred, please try again later");
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
    fetchViolations();
    fetchUsers();
  }, []);

  return (
    <>
      <Helmet>
        <title>Violation List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Violation List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Violation" },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => handleOpenCreateModal()}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add new violation
            </Button>
          }
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
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenConfirm()}
                  >
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
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id.toString())
                    )
                  }
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ViolationTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        onEditRow={() => handleOpenCreateModal(row.id)}
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
              handleDeleteRow(selectedRowId || "");
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />

      <Dialog
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedRowId ? "Update Violation" : "Create Violation"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* Description Field */}
            <TextField
              label="Description"
              value={violationCreate.description}
              onChange={(e) => handleChangeDescription(e.target.value)}
              fullWidth
            />

            {/* Violation Date Field */}
            <DatePicker
              label="Violation Date"
              value={violationCreate.violationDate}
              onChange={(e) => handleChangeDate(e)}
            />

            {/* Penalty Field */}
            <TextField
              label="Penalty (Point)"
              type="number"
              value={violationCreate.penalty}
              onChange={(e) => handleChangePenalty(e.target.value)}
              fullWidth
            />

            {/* User Autocomplete Field */}
            <Autocomplete
              options={users}
              getOptionLabel={(option: Profile) =>
                option.firstName + " " + option.lastName || "--"
              }
              value={selectUser}
              onChange={(event, newValue: Profile) =>
                handleChangeUser(newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  key={selectUser?.userId}
                  label="Select User"
                />
              )}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateModal}>Cancel</Button>
          <Button
            disabled={!isEnableSubmit}
            variant="contained"
            onClick={() => handleCreateViolation()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
