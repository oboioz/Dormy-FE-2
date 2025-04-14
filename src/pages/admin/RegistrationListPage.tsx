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
import { ContractResponseModel } from "../../models/responses/ContractResponseModels";
import { httpClient } from "../../services";
import { GetBatchContractRequestModel } from "../../models/requests/ContractRequestModels";
import { toast } from "react-toastify";
import ContractRow from "../../sections/@dashboard/admin/venue/ContractRow";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "startDate", label: "Start date", align: "left" },
  { id: "endDate", label: "End date", align: "left" },
  { id: "userFullname", label: "Tenant", align: "left" },
  { id: "roomNumber", label: "Room", align: "center" },
  { id: "buildingName", label: "Building", align: "center" },
  { id: "roomTypeName", label: "Room Type", align: "left" },
  { id: "approverFullName", label: "Approver", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "action", label: "", align: "left" },
];

// ----------------------------------------------------------------------

export default function RegistrationListPage() {
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

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<ContractResponseModel[]>([]);

  const dataInPage = tableData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const [openConfirm, setOpenConfirm] = useState(false);

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
    const deleteRow = tableData.filter((row) => row.id !== id);
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
                      tableData.map((row) => row.id)
                    )
                  }

                  // rowCount={tableData.length}
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ContractRow
                        key={row.id}
                        row={row}
                        setContracts={setTableData}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        // onEditRow={() => handleEditRow(row.id)}
                        // onDeleteRow={() => handleDeleteRow(row.id)}
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
