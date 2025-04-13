import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

// components
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Label from "../../components/label";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import { TableHeadCustom, useTable } from "../../components/table";
import { PATH_REGISTER, PATH_USER } from "../../routes/paths";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import ContractStatusTag from "../../sections/tag/ContractStatusTag";
import { useEffect, useState } from "react";
import { ContractResponseModel } from "../../models/responses/ContractResponseModels";
import { GetBatchContractRequestModel } from "../../models/requests/ContractRequestModels";
import { httpClient } from "../../services";
import { toast } from "react-toastify";
import { fDate } from "../../utils/formatTime";
import ContractModal from "../../sections/@dashboard/admin/contract/ContractModal";
import UserContractModal from "../../sections/@dashboard/user/contract/UserContractModal";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "startDate", label: "Start date", align: "left" },
  { id: "endDate", label: "End date", align: "left" },
  { id: "userFullname", label: "Tenant", align: "left" },
  { id: "roomNumber", label: "Room", align: "left" },
  { id: "buildingName", label: "Building", align: "left" },
  { id: "roomTypeName", label: "Room Type", align: "left" },
  { id: "approverFullName", label: "Approver", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "action", label: "", align: "left" },
];

// ----------------------------------------------------------------------

export default function ContractListPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { page } = useTable();
  const [openDetails, setOpenDetails] = useState(false);
  const [contracts, setContracts] = useState<ContractResponseModel[]>([]);

  const { themeStretch } = useSettingsContext();

  const fetchContractsData = async () => {
    const payload: GetBatchContractRequestModel = {
      ids: [],
    };
    const response = await httpClient.contractService.getBatchContracts(
      payload
    );

    if (response) {
      console.log("response", response);
      setContracts(response);
    } else {
      setContracts([]);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchContractsData();
  }, []);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  return (
    <>
      {/* <Helmet>
        <title>Contract List</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Contract List"
          links={[
            { name: "Dashboard", href: PATH_USER.root },
            { name: "User", href: PATH_USER.profile },
            { name: "Contract" },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_REGISTER.policy}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Extend Contract
            </Button>
          }
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  // rowCount={tableData.length}
                />

                <TableBody>
                  {contracts.map((contract, index) => (
                    <>
                      <TableRow hover key={contract.id}>
                        <TableCell align="left">
                          {fDate(contract.startDate, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell align="left">
                          {fDate(contract.endDate, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell align="left">
                          {contract.userFullname}
                        </TableCell>
                        <TableCell align="left">
                          {contract.roomNumber}
                        </TableCell>
                        <TableCell align="left">
                          {contract.buildingName}
                        </TableCell>
                        <TableCell align="left">
                          {contract.roomTypeName}
                        </TableCell>
                        <TableCell align="left">
                          {contract.approverFullName || "--"}
                        </TableCell>
                        <TableCell align="left">
                          <ContractStatusTag status={contract.status} />
                        </TableCell>

                        <TableCell align="right">
                          <IconButton onClick={handleOpenDetails}>
                            <Iconify icon="eva:eye-outline" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <UserContractModal
                        open={openDetails}
                        onClose={handleCloseDetails}
                        contract={contract}
                        // onStatusChange={(newStatus) => handleStatusChange(row.id, newStatus)}
                      />
                    </>
                  ))}
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
