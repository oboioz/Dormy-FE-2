import { useNavigate } from "react-router-dom";
// @mui
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
// routes

// components
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { httpClient } from "../../services";
import { toast } from "react-toastify";
import { RegistrationAccommodationResponseModel } from "../../models/responses/RegistrationModels";
import RegistrationRow from "../../sections/@dashboard/admin/venue/RegistrationRow";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "contractPeriod", label: "Contract period", align: "left" },
  { id: "userFullname", label: "Tenant", align: "left" },
  { id: "roomNumber", label: "Room", align: "center" },
  { id: "buildingName", label: "Building", align: "center" },
  { id: "roomTypeName", label: "Room Type", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "action", label: "", align: "left" },
];

// ----------------------------------------------------------------------

export default function RegistrationListPage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    rowsPerPage,
    setRowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<RegistrationAccommodationResponseModel[]>([]);

  const dataInPage = tableData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !tableData.length;

  const fetchContractExtensionsData = async () => {
    const response = await httpClient.registrationService.getRegistrationAccommodationBatch();

    setTableData(response);
  };

  useEffect(() => {
    fetchContractExtensionsData();
  }, []);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  // const handleEditRow = (id: string) => {
  //   // navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  // };

  // const handleDeleteRow = (id: string) => {
  //   const deleteRow = tableData.filter((row) => row.id !== id);
  //   setSelected([]);
  //   setTableData(deleteRow);

  //   if (page > 0) {
  //     if (dataInPage.length < 2) {
  //       setPage(page - 1);
  //     }
  //   }
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Helmet>
        <title>Registration List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Registration List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Registration" },
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
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.contractExtensionId)
                    )
                  }

                  // rowCount={tableData.length}
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <RegistrationRow
                        key={row.contractExtensionId}
                        registration={row}
                        // setContracts={setTableData}
                        selected={selected.includes(row.contractExtensionId)}
                        onSelectRow={() => onSelectRow(row.contractExtensionId)}
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
            count={tableData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
