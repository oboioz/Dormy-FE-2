import { useNavigate } from "react-router-dom";
// @mui
import {
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
// components
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { IAdmin } from "../../@types/admin";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  useTable,
} from "../../components/table";
import { PATH_ADMIN } from "../../routes/paths";
import GarageWorkerRow from "../../sections/@dashboard/admin/garage/GarageWorkerRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "phoneNumber", label: "Phone Number", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "role", label: "role", align: "left" },
  // { id: 'status', label: 'Status', align: 'center' },
  { id: "" },
];

const mockAdmins: IAdmin[] = [
  {
    adminID: 1,
    password: "securePass123",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    dateOfBirth: new Date(1985, 3, 15),
    gender: "Female",
    phoneNumber: "+1234567890",
    jobTitle: "Dormitory Manager",
    workplaceID: 101,
    absenceID: 201,
    notificationID: 301,
    parkingSpotID: 401,
    imageURL: "https://example.com/images/alice.jpg",
  },
  {
    adminID: 2,
    password: "adminPass456",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    dateOfBirth: new Date(1990, 7, 22),
    gender: "Male",
    phoneNumber: "+0987654321",
    jobTitle: "Security Officer",
    workplaceID: 102,
    absenceID: 202,
    notificationID: 302,
    parkingSpotID: 402,
    imageURL: "https://example.com/images/bob.jpg",
  },
  {
    adminID: 3,
    password: "strongPass789",
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie.davis@example.com",
    dateOfBirth: new Date(1982, 5, 10),
    gender: "Non-binary",
    phoneNumber: "+1122334455",
    jobTitle: "Maintenance Supervisor",
    workplaceID: 103,
    absenceID: 203,
    notificationID: 303,
    parkingSpotID: 403,
    imageURL: "https://example.com/images/charlie.jpg",
  },
];

// ----------------------------------------------------------------------

export default function VehicleWorkerPage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    rowsPerPage,
    setPage,
    //
    // selected,
    // setSelected,
    // onSelectRow,
    // onSelectAllRows,
  } = useTable();

  const dataInPage = mockAdmins.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState(mockAdmins);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !mockAdmins.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleEditRow = (id: string) => {
    // navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  // const handleDeleteRow = (id: string) => {
  //   const deleteRow = tableData.filter((row) => row.vehicleID.toString() !== id);
  //   setSelected([]);
  //   setTableData(deleteRow);

  //   if (page > 0) {
  //     if (dataInPage.length < 2) {
  //       setPage(page - 1);
  //     }
  //   }
  // };

  // const handleDeleteRows = (selectedRows: string[]) => {
  //   const deleteRows = tableData.filter((row) => !selectedRows.includes(row.vehicleID.toString()));
  //   setSelected([]);
  //   setTableData(deleteRows);

  //   if (page > 0) {
  //     if (selectedRows.length === dataInPage.length) {
  //       setPage(page - 1);
  //     } else if (selectedRows.length === _vehicleList.length) {
  //       setPage(0);
  //     } else if (selectedRows.length > dataInPage.length) {
  //       const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
  //       setPage(newPage);
  //     }
  //   }
  // };

  return (
    <>
      <Helmet>
        <title>Garage Worker List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Garage Worker"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "User", href: PATH_ADMIN.profile },
            { name: "Garage Worker" },
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
            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                />

                <TableBody>
                  {mockAdmins
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <GarageWorkerRow key={row.adminID} row={row} />
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
    </>
  );
}

// ----------------------------------------------------------------------
