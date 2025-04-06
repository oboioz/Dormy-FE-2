import { useNavigate } from "react-router-dom";
// @mui
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
// components
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { mockParkingRequests } from "../../_mock/assets/vehicleRegistration";
import ConfirmDialog from "../../components/confirm-dialog";
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
import VehicleRegistrationRow from "../../sections/@dashboard/admin/garage/VehicleRegistrationRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "registrationID", label: "ID", align: "left" },
  { id: "timestamp", label: "Timestamp", align: "left" },
  { id: "name", label: "Name", align: "left" },
  { id: "phoneNumber", label: "Phone Number", align: "left" },
  { id: "vehicleType", label: "Vehicle Type", align: "center" },
  { id: "license", label: "License", align: "center" },
  { id: "" },
];

const _mockData = mockParkingRequests;

// ----------------------------------------------------------------------

export default function VehicleRegistrationListPage() {
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

  const dataInPage = _mockData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState(_mockData);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !_mockData.length;

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
    const deleteRow = tableData.filter(
      (row) =>
        row.registrationInformation.generalInformation.contract.contractID.toString() !==
        id
    );
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Vehicle Registration List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Vehicle Registration List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Vehicle Registration List" },
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
                  // numSelected={selected.length}
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     tableData.map((row) => row.registrationInformation.generalInformation.contract.contractID.toString())
                  //   )
                  // }

                  // rowCount={tableData.length}
                />

                <TableBody>
                  {_mockData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <VehicleRegistrationRow
                        key={row}
                        row={row}
                        onDenyRow={handleOpenConfirm}
                        onVerifyRow={handleOpenConfirm}
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
