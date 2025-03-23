import { useState } from "react";
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "gender", label: "Gender", align: "left" },
  { id: "id", label: "Resident ID", align: "left" },
  { id: "place", label: "Place", align: "left" },
  { id: "phoneNumber", label: "Phone Number", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "status", label: "Status", align: "center" },
  { id: "" },
];

const _userList = [...Array(24)].map((_, index) => ({
  userID: index + 1,
  password: `Password${index + 1}!`, // Placeholder password
  firstName: _mock.name.firstName(index),
  lastName: _mock.name.lastName(index),
  email: _mock.email(index),
  phoneNumber: _mock.phoneNumber(index),
  gender: _mock.boolean(index) ? "Male" : "Female",
  dateOfBirth: _mock.time(index),
  nationalIDNumber: `ID-${index + 1000}`,
  status: _mock.boolean(index) ? "active" : "inactive",
  contract: {
    contractID: _mock.id(index),
    startDate: _mock.time(index),
    endDate: _mock.time(index + 10),
    status: _mock.boolean(index) ? "valid" : "expired",
    roomID: {
      roomNumber: _mock.number.age(index),
      floorNumber: _mock.number.age(index),
      building: {
        name: _mock.name.firstName(index),
      },
    },
  },
  priorities: [...Array((_mock.number.age(index) % 3) + 1)].map(() =>
    _mock.text.title(index)
  ), // Example: picking random priority titles
  guardian: {
    name: _mock.name.fullName(index),
    relationship: _mock.boolean(index) ? "Parent" : "Sibling",
    phoneNumber: _mock.phoneNumber(index),
    email: _mock.email(index),
    address: _mock.address.fullAddress(index),
  },
  workplace: _mock.boolean(index)
    ? {
        companyName: _mock.company(index),
        position: _mock.role(index),
        address: _mock.address.fullAddress(index),
        phoneNumber: _mock.phoneNumber(index),
      }
    : null,
  healthInsurance: _mock.boolean(index)
    ? {
        provider: _mock.company(index),
        policyNumber: `HI-${index + 5000}`,
        coverageDetails: _mock.text.description(index),
      }
    : null,
}));

// ----------------------------------------------------------------------

export default function ResidentListPage() {
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
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState(_userList);

  const [filterName, setFilterName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const dataFiltered = applyFilter({
    inputData: tableData,
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
                  tableData.map((row) => row.userID.toString())
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
                      tableData.map((row) => row.userID.toString())
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ResidentTableRow
                        key={row.userID}
                        row={row}
                        selected={selected.includes(row.userID.toString())}
                        onSelectRow={() => onSelectRow(row.userID.toString())}
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
  inputData: IUser[];
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
