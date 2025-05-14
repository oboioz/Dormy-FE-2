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
import { GetBatchContractRequestModel } from "../../models/requests/ContractRequestModels";
import { toast } from "react-toastify";
import ContractAdminRow from "../../sections/@dashboard/admin/venue/ContractAdminRow";
import { ContractBatchResponseModel } from "../../models/responses/ContractResponseModels";
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

export default function ContractAdminListPage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<ContractBatchResponseModel[]>([]);

  const dataInPage = tableData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const isNotFound = !tableData.length;

  const fetchContractsData = async () => {
    const payload: GetBatchContractRequestModel = {
      ids: [],
    };
    const response = await httpClient.contractService.getBatchContracts(
      payload
    );

    if (response) {
      console.log("response", response);
      setTableData(response);
    } else {
      setTableData([]);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchContractsData();
  }, []);

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
        <title>Contract List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Contract List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Contract" },
          ]}
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
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ContractAdminRow
                        key={row.id}
                        contract={row}
                        setContracts={setTableData}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
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
    </>
  );
}

// ----------------------------------------------------------------------
