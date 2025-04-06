// @mui
import { Card, CardHeader, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import Iconify from "../../../../../components/iconify";
import { useEffect, useState } from "react";
import { HealthInsuranceResponseModel } from "../../../../../models/responses/HealthInsuranceModels";
import { httpClient } from "../../../../../services";

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function ProfileInsurance() {
  const [healthInsurance, setHealthInsurance] =
    useState<HealthInsuranceResponseModel>();

  const fetchHealthInsurance = async () => {
    var response =
      await httpClient.healthInsuranceService.getUserHealthInsurance();
    if (response) {
      setHealthInsurance(response);
    }
  };

  useEffect(() => {
    fetchHealthInsurance();
  }, []);

  return (
    <Card>
      <CardHeader title="Health Insurance" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <StyledIcon icon="mdi:card-account-details-outline" />

          <Typography variant="body2">
            Insurance card number: &nbsp;
            {healthInsurance?.insuranceCardNumber || "--"}
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="mdi:map-marker" />
          <Typography variant="body2">
            Registered hospital: {healthInsurance?.registeredHospital || "--"}
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="mdi:hospital-box" />

          <Typography variant="body2">
            Expired date:{" "}
            {healthInsurance?.expirationDate
              ? new Date(healthInsurance.expirationDate).toLocaleDateString(
                  "en-us",
                  {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  }
                )
              : "--"}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
