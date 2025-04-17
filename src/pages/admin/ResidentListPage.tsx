import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { IUser } from "../../@types/user";
import _mock from "../../_mock";
import { PATH_ADMIN } from "../../routes/paths";
import ResidentTableRow from "../../sections/@dashboard/admin/resident/ResidentTableRow";
import ResidentTableToolbar from "../../sections/@dashboard/admin/resident/ResidentTableToolbar";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { httpClient } from "../../services";
import { Profile } from "../../models/responses/UserModel";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "nationalIdNumber", label: "Citizen Id", align: "left" },
  { id: "fullname", label: "Fullname", align: "left" },
  { id: "gender", label: "Gender", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "phoneNumber", label: "Phone number", align: "left" },
  { id: "status", label: "Status", align: "left" },
  // { id: "" },
];

export default function ResidentListPage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    order,
    orderBy,
    selected,
    rowsPerPage,
    onSort,
    setPage,
    onSelectRow,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<Profile[]>([]);

  const [filterName, setFilterName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const dataFiltered = applyFilter({
    inputData: tableData as any,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const isFiltered = filterName !== "";

  const isNotFound =
    (!dataFiltered.length && !!filterName) || !dataFiltered.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEditRow = (id: string) => {
    // navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterName("");
  };

  const fetchAllUsersForAdmin = async () => {
    var response = await httpClient.userService.getAllUsersForAdmin();
    setTableData(response);
  };

  useEffect(() => {
    fetchAllUsersForAdmin();
  }, []);

  return (
    <>
      <Helmet>
        <title> Resident List | Admin </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Resident List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Resident List" },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     to={PATH_DASHBOARD.user.new}
          //     variant="contained"
          //     startIcon={<Iconify icon="eva:plus-fill" />}
          //   >
          //     New User
          //   </Button>
          // }
        />

        <Card>
          <ResidentTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.userId)
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
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.userId)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row) => (
                      <ResidentTableRow
                        key={row.userId}
                        row={row}
                        selected={selected.includes(row.userId)}
                        onSelectRow={() => onSelectRow(row.userId)}
                        onEditRow={() => handleEditRow(row.firstName)}
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

          <TablePaginationCustom
            count={dataFiltered.length}
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
  inputData: Profile[];
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
      (user) =>
        user.firstName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
