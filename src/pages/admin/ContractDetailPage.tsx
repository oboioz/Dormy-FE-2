import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fDate } from "../../utils/formatTime";
import { ContractResponseModel } from "../../models/responses/ContractResponseModels";
import { httpClient } from "../../services";
import ContractStatusTag from "../../sections/tag/ContractStatusTag";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_ADMIN } from "../../routes/paths";

export default function ContractDetailPage() {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState<ContractResponseModel | null>(null);

  const fetchContractDetails = async (contractId: string) => {
    try {
      const response = await httpClient.contractService.getContractById(
        contractId
      );
      setContract(response);
    } catch (error) {
      console.error("Failed to fetch contract details:", error);
    }
  };

  useEffect(() => {
    fetchContractDetails(contractId);
  }, [contractId]);

  if (!contract) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Adjusts spacing between the button and heading
          alignItems: "center", // Aligns items vertically
          mb: 3, // Adds margin below the container
        }}
      >
        <Typography variant="h4" gutterBottom>
          General Contract Information
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(PATH_ADMIN.contract.list)}
        >
          Back to Contract List
        </Button>
      </Box>

      <Card sx={{ p: 3, mb: 3 }}>
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
              <strong>Workplace:</strong> {contract.workplaceName}
            </Typography>
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
              {fDate(contract.expirationDate, "dd/MM/yyyy")}
            </Typography>
          </Grid>

          {/* Second Column */}
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Contract period:</strong>{" "}
              {fDate(contract.startDate, "dd/MM/yyyy")}
              {" - "}
              {fDate(contract.endDate, "dd/MM/yyyy")}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Room Number:</strong> {contract.roomNumber}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Room Type:</strong> {contract.roomTypeName}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Building:</strong> {contract.buildingName}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Price:</strong> {contract.price.toLocaleString()} VND
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Status:</strong>{" "}
              <ContractStatusTag status={contract.status} />
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Contract Extensions */}
      <Typography variant="h5" gutterBottom>
        Contract Detail
      </Typography>
      <div>
        {contract.contractExtensions.map((extension) => (
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
                  <strong>Room Number:</strong> {extension.roomNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  <b>Status:</b> <ContractStatusTag status={extension.status} />
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Approver:</strong>{" "}
                  {extension.approverId ? extension.approverFullName : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </div>
    </Container>
  );
}
