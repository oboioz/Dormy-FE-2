import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { TableHeadCustom, useTable } from "../../components/table";
import { useSettingsContext } from "../../components/settings";
import { PATH_USER } from "../../routes/paths";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { ContractResponseModel } from "../../models/responses/ContractResponseModels";
import {
  ContractExtensionCreateRequestModel,
  GetBatchContractRequestModel,
} from "../../models/requests/ContractRequestModels";
import { httpClient } from "../../services";
import { fDate } from "../../utils/formatTime";
import { DateTimeUtils } from "../../utils/DateTimeUtils";
import ContractStatusTag from "../../sections/tag/ContractStatusTag";
import ContractExtensionModal from "../../sections/@dashboard/user/contract/ContractExtensionModal";
import { useNavigate } from "react-router-dom";
import {
  ContractStatusDescriptions,
  ContractStatusEnum,
} from "../../models/enums/ContractStatusEnum";
import ConfirmDialog from "../../components/confirm-dialog";
import InvoiceStatusTag from "../../sections/tag/InvoiceStatusTag";
import { EnumUtils } from "../../utils/EnumUtils";
import UserViewDetailInvoiceModal from "../../sections/@dashboard/user/invoice/UserViewDetailInvoiceModal";
import UserTermAndConditionModal from "../../sections/@dashboard/user/contract/UserTermAndConditionModal";

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

export default function ContractListPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const navigate = useNavigate();
  const [openConfirmTerminateContract, setOpenConfirmTerminateContract] =
    useState(false);
  const [contracts, setContracts] = useState<ContractResponseModel[]>([]);
  const [isCreateContractButtonEnabled, setIsCreateContractButtonEnabled] =
    useState(false);
  const [openContractExtension, setOpenContractExtension] =
    useState<boolean>(false);
  const [openViewDetailInvoiceId, setOpenViewDetailInvoiceId] = useState<
    string | null
  >(null);
  const [openTerms, setOpenTerms] = useState(false);

  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);

  const handleOpenViewDetail = (invoiceId: string) => {
    setOpenViewDetailInvoiceId(invoiceId);
  };

  const { themeStretch } = useSettingsContext();

  const fetchContractsData = async () => {
    const payload: GetBatchContractRequestModel = {
      ids: [],
    };
    const response = await httpClient.contractService.getBatchContracts(
      payload
    );

    if (response) {
      setContracts(response);
    } else {
      setContracts([]);
      toast.error("Failed to fetch data");
    }
  };

  const fetchSettingData = async () => {
    const response = await httpClient.settingService.getSettingByKeyname(
      "EnableCreateContractForNewSchoolYear"
    );
    if (response) {
      setIsCreateContractButtonEnabled(
        response.value === "true" && response.isApplied
      );
    } else {
      setIsCreateContractButtonEnabled(false);
    }
  };

  useEffect(() => {
    fetchContractsData();
    fetchSettingData();
  }, []);

  const handleOpenConfirmTerminateContract = () => {
    setOpenConfirmTerminateContract(true);
  };

  const handleCloseConfirmTerminateContract = () => {
    setOpenConfirmTerminateContract(false);
  };

  const handleTerminateContract = async (id: string) => {
    try {
      const response = await httpClient.contractService.terminateContract(id);
      if (response) {
        toast.success("Terminate contract successfully.");
      } else {
        toast.error("Failed to terminate contract.");
      }
      navigate(PATH_USER.contract);
    } catch (error) {
      toast.error("Failed to terminate contract: " + error);
    }
  };

  // const handleOpenContractExtension = () => {
  //   setOpenContractExtension(true);
  // };

  // const handleCloseContractExtension = () => {
  //   setOpenContractExtension(false);
  // };

  // const handleSubmitContractExtension = async (data: {
  //   startDate: Date;
  //   endDate: Date;
  // }) => {
  //   try {
  //     const payload: ContractExtensionCreateRequestModel = {
  //       startDate: DateTimeUtils.toStringWithDefaultTime(data.startDate),
  //       endDate: DateTimeUtils.toStringWithDefaultTime(data.endDate),
  //     };
  //     const response = await httpClient.contractService.createContractExtension(
  //       payload
  //     );
  //     if (response) {
  //       toast.success("Extend contract successfully.");
  //     } else {
  //       toast.error("Failed to extend contract.");
  //     }
  //   } catch (error) {
  //     toast.error("Failed to extend contract:" + error);
  //   }
  //   handleCloseContractExtension();
  // };

  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Contract List"
          links={[
            { name: "Dashboard", href: PATH_USER.root },
            { name: "User", href: PATH_USER.profile },
            { name: "Contract" },
          ]}
          action={
            <>
              {isCreateContractButtonEnabled && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => navigate(PATH_USER.createContract)}
                  sx={{ mr: 2 }}
                >
                  Create Contract
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:eye-outline" />}
                onClick={handleOpenTerms}
              >
                View terms - conditions
              </Button>
            </>
          }
        />

        {/* Accordion for Contracts */}
        {contracts.map((contract) => (
          <Accordion key={contract.id} sx={{ mt: 2 }}>
            <AccordionSummary
              expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              sx={{
                bgcolor: "background.default",
                borderBottom: "1px solid",
                borderColor: "divider",
                "& .MuiAccordionSummary-content": {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Room {contract.roomNumber} - Building {contract.buildingName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Status:</b> <ContractStatusTag status={contract.status} />
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} sx={{ mr: 16 }}>
                <Typography variant="body2" sx={{ mr: 16 }}>
                  <b>Start Date:</b> {fDate(contract.startDate, "dd/MM/yyyy")}
                </Typography>
                <Typography variant="body2">
                  <b>End Date:</b> {fDate(contract.endDate, "dd/MM/yyyy")}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={3}>
                  {/* First Column */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Tenant:</strong> {contract.userFullname}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Submission Date:</strong>{" "}
                      {fDate(contract.submissionDate, "dd/MM/yyyy")}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Place of Work/Study:</strong> {contract.workplaceName}
                    </Typography>
                  </Grid>

                  {/* Second Column */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Insurance Card Number:</strong>{" "}
                      {contract.insuranceCardNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Registered Hospital:</strong>{" "}
                      {contract.registeredHospital}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Expiration Date:</strong>{" "}
                      {fDate(contract.expirationDate)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  {/* First Column */}
                  <Grid item xs={12} md={6}></Grid>
                  {/* Second Column - Buttons */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end", // Align buttons to the right
                      alignItems: "center", // Vertically align buttons
                      gap: 2, // Add spacing between buttons
                    }}
                  >
                    {(contract.status === ContractStatusEnum.ACTIVE ||
                      contract.status === ContractStatusEnum.EXTENDED ||
                      contract.status === ContractStatusEnum.EXPIRED) && (
                      <Button
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() =>
                          navigate(PATH_USER.extendContract(contract.id))
                        }
                      >
                        Extend Contract
                      </Button>
                    )}
                    {(contract.status === ContractStatusEnum.ACTIVE ||
                      contract.status === ContractStatusEnum.EXTENDED ||
                      contract.status === ContractStatusEnum.EXPIRED) && (
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Iconify icon="eva:trash-2-outline" />}
                        onClick={handleOpenConfirmTerminateContract}
                      >
                        Terminate Contract
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  {/* First Column */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Room Number: </strong>
                      {contract.roomNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Room Type: </strong> {contract.roomTypeName}
                    </Typography>
                  </Grid>
                  {/* Second Column */}
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Building: </strong> {contract.buildingName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Status:</strong>{" "}
                      <ContractStatusTag status={contract.status} />
                    </Typography>
                  </Grid>
                  {/* {(contract.status === ContractStatusEnum.ACTIVE ||
                    contract.status === ContractStatusEnum.EXTENDED ||
                    contract.status === ContractStatusEnum.EXPIRED) && (
                    <Grid item xs={12} md={3} sx={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        startIcon={<Iconify icon="eva:trash-2-outline" />}
                        color="error"
                        onClick={handleOpenConfirmTerminateContract}
                      >
                        Extend Contract
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<Iconify icon="eva:trash-2-outline" />}
                        color="error"
                        onClick={handleOpenConfirmTerminateContract}
                        sx={{ mt: 2 }}
                      >
                        Terminate Contract
                      </Button>
                    </Grid>
                  )} */}
                </Grid>
                <ConfirmDialog
                  open={openConfirmTerminateContract}
                  onClose={handleCloseConfirmTerminateContract}
                  title="Terminate Contract"
                  content={
                    <>
                      Are you sure want to <strong>terminate</strong> this
                      contract ?
                    </>
                  }
                  action={
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleTerminateContract(contract.id);
                        handleCloseConfirmTerminateContract();
                      }}
                    >
                      Confirm terminate
                    </Button>
                  }
                />
              </Box>

              {/* Contract Extensions */}
              <Typography variant="h6" gutterBottom>
                Contract Extensions
              </Typography>
              {contract.contractExtensions &&
              contract.contractExtensions.length > 0 ? (
                contract.contractExtensions.map((extension, index) => (
                  <Box
                    key={extension.contractExtensionId}
                    sx={{
                      mb: 2,
                      p: 2,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      boxShadow: 1,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <b>Submission Date:</b>{" "}
                          {fDate(extension.submissionDate, "dd/MM/yyyy")}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Contract period:</strong>{" "}
                          {fDate(extension.startDate, "dd/MM/yyyy")}
                          {" - "}
                          {fDate(extension.endDate, "dd/MM/yyyy")}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Room Number: </strong>
                          {extension.roomNumber}
                          {" - "}
                          <strong>Building: </strong>
                          {extension.buildingName}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Room Type: </strong>
                          {extension.roomTypeName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <b>Status:</b>{" "}
                          <ContractStatusTag status={extension.status} />
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Approver:</strong>{" "}
                          {extension.approverId
                            ? extension.approverFullName
                            : "N/A"}
                        </Typography>
                        {extension?.invoiceId ? (
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Invoice status:</strong>{" "}
                            <InvoiceStatusTag
                              status={extension?.invoiceStatus}
                            />
                            <IconButton
                              onClick={() => {
                                handleOpenViewDetail(extension.invoiceId);
                              }}
                              sx={{
                                fontSize: 22, // Zoom in the font size for the icon and text
                                ml: 1,
                                color: "primary.main",
                                "& .MuiSvgIcon-root": {
                                  fontSize: 15,
                                },
                              }}
                            >
                              <Box
                                component="span"
                                sx={{ fontSize: 18, mr: 0.5 }}
                              >
                                View detail
                              </Box>
                              <Iconify
                                icon="eva:eye-outline"
                                sx={{ fontSize: 22 }}
                              />
                            </IconButton>
                            {openViewDetailInvoiceId === extension.invoiceId && (
                              <UserViewDetailInvoiceModal
                                open={!!openViewDetailInvoiceId}
                                onClose={() => setOpenViewDetailInvoiceId(null)}
                                invoiceId={extension?.invoiceId}
                              />
                            )}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            sx={{ mb: 1, color: "red" }}
                          >
                            <strong>No invoice </strong>
                            {extension.status === "PENDING" ? (
                              <>because contract has not approved yet.</>
                            ) : (
                              <>
                                because contract was{" "}
                                {EnumUtils.getEnumDescription(
                                  ContractStatusDescriptions,
                                  EnumUtils.convertToEnum(
                                    ContractStatusEnum,
                                    extension.status
                                  )
                                )}
                                .
                              </>
                            )}
                          </Typography>
                        )}
                        {/* <Typography variant="body2">
                          <strong>Room Type: </strong>
                          {extension.roomTypeName}
                        </Typography> */}
                      </Grid>
                    </Grid>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No extensions available.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      <UserTermAndConditionModal
        open={openTerms}
        onClose={handleCloseTerms}
      />

      {/* <ContractExtensionModal
        open={openContractExtension}
        onClose={handleCloseContractExtension}
        onSubmit={handleSubmitContractExtension}
        initialData={{
          startDate: new Date(),
          endDate: new Date(),
        }}
      /> */}
    </>
  );
}
