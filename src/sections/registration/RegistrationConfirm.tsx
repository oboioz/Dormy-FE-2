import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Divider,
  Stack,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { IRegistrationFormState } from "../../@types/user";
import { WorkplaceOptionModel } from "../../models/responses/WorkplaceModels";
import { IEnumModel } from "../../models/responses/EnumModels";
import { httpClient } from "../../services";
import { IRegistrationInformationCreationModel } from "../../models/responses/RegistrationModels";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { DateTimeUtils } from "../../utils/DateTimeUtils";
import { RoomSummaryResponseModel } from "../../models/responses/RoomModel";
import { fDate } from "../../utils/formatTime";
import { fCurrency } from "../../utils/formatNumber";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Iconify from "../../components/iconify";
import TermAndConditionModal from "./TermAndConditionModal";

type Props = {
  generalInformation: IRegistrationFormState;
  genderEnums: IEnumModel[];
  relationshipEnums: IEnumModel[];
  workplaceOptions: WorkplaceOptionModel[];
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
};

type FormValuesProps = {
  isConfirmed: boolean;
  isReadTerms: boolean;
};

const UpdateSchema = Yup.object().shape({
  isConfirmed: Yup.boolean().oneOf(
    [true],
    "You must confirm that all the information is correct."
  ),
  isReadTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions."
  ),
});

export default function RegistrationConfirm({
  onNextStep,
  onBackStep,
  generalInformation,
  genderEnums,
  relationshipEnums,
  workplaceOptions,
}: Props) {
  const {
    userState,
    healthInsuranceState,
    guardianState,
    roomState,
    workplaceId,
    startDate,
    endDate,
  } = generalInformation;

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isReadTerms, setIsReadTerms] = useState(false);
  const [roomInformation, setRoomInformation] =
    useState<RoomSummaryResponseModel>();
  const [openTerms, setOpenTerms] = useState(false);

  const defaultValues: FormValuesProps = {
    isConfirmed: false,
    isReadTerms: false,
    // ...add other fields as needed
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchema) as any,
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    // formState: { isSubmitting, errors },
  } = methods;

  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);
  const handleConfirmTerms = () => {
    setIsReadTerms(true);
    setOpenTerms(false);
  };

  const fetchRoomSumaryData = async (roomId: string) => {
    const response = await httpClient.registrationService.getRoomSumaryById(
      roomId
    );

    setRoomInformation(response);
  };

  useEffect(() => {
    fetchRoomSumaryData(roomState.roomId);
  }, [roomState.roomId]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!isConfirmed) {
      errors.isConfirmed =
        "You must confirm that all the information is correct.";
    }
    if (!isReadTerms) {
      errors.isReadTerms = "You must agree to the terms and conditions.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const payload: IRegistrationInformationCreationModel = {
      user: {
        firstName: userState.firstName,
        lastName: userState.lastName,
        email: userState.email,
        gender: userState.gender,
        nationalIdNumber: userState.nationalIdNumber,
        dateOfBirth: userState.dateOfBirth
          ? DateTimeUtils.toStringWithDefaultTime(userState.dateOfBirth)
          : "",
        phoneNumber: userState.phoneNumber,
      },
      workplaceId: workplaceId,
      roomId: roomState.roomId,
      startDate: startDate
        ? DateTimeUtils.toStringWithDefaultTime(startDate)
        : "",
      endDate: endDate ? DateTimeUtils.toStringWithDefaultTime(endDate) : "",
      healthInsurance: {
        insuranceCardNumber: healthInsuranceState.insuranceCardNumber,
        expirationDate: healthInsuranceState.expirationDate
          ? DateTimeUtils.toStringWithDefaultTime(
              healthInsuranceState.expirationDate
            )
          : "",
        registeredHospital: healthInsuranceState.registeredHospital,
      },
      guardians: guardianState,
      vehicles: [],
    };

    const response = await httpClient.registrationService.registerAccommodation(
      payload
    );

    if (response == undefined || response.status !== HttpStatusCode.Created) {
      toast.error("An error has occurred, please try again later");
      setIsLoading(false);
      return;
    }

    toast.success("You have successfully registered for the room.");
    setIsLoading(false);
    onNextStep();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
      >
        Registration Confirmation
      </Typography>

      {/* General Information */}
      <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 3, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          General Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>First Name:</strong> {userState?.firstName || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Last Name:</strong> {userState?.lastName || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Email:</strong> {userState?.email || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Phone Number:</strong> {userState?.phoneNumber || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Gender:</strong>{" "}
              {(() => {
                const gender = genderEnums.find(
                  (g) => g.enumValue === userState?.gender
                );
                return gender
                  ? `${gender.vietnameseEnumDescription} (${gender.englishEnumDescription})`
                  : "N/A";
              })()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Date of Birth:</strong>{" "}
              {userState?.dateOfBirth
                ? fDate(userState.dateOfBirth, "dd/MM/yyyy")
                : "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Health Insurance Information */}
      <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 3, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Health Insurance Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Insurance Card Number:</strong>{" "}
              {healthInsuranceState?.insuranceCardNumber || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Expiration Date:</strong>{" "}
              {healthInsuranceState?.expirationDate
                ? fDate(healthInsuranceState.expirationDate, "dd/MM/yyyy")
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Registered Hospital:</strong>{" "}
              {healthInsuranceState?.registeredHospital || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Workplace Information */}
      <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 3, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Place of Work/Study Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Place of Work/Study:</strong>{" "}
              {workplaceOptions.find(
                (workplace) => workplace.id === workplaceId
              )?.name || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Contract Information */}
      <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 3, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Contract Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Start date:</strong>{" "}
              {startDate ? fDate(startDate, "dd/MM/yyyy") : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>End date:</strong>{" "}
              {endDate ? fDate(endDate, "dd/MM/yyyy") : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Room number:</strong> {roomInformation?.roomNumber}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Building:</strong> {roomInformation?.buildingName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Room type:</strong> {roomInformation?.roomTypeName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Price:</strong> {fCurrency(roomInformation?.price)}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Guardian Information */}
      <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 3, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Relative Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {guardianState?.length > 0 ? (
          guardianState.map((guardian: any, index: number) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Relative {index + 1}:</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Name:</strong> {guardian.name || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Email:</strong> {guardian.email || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Phone Number:</strong>{" "}
                    {guardian.phoneNumber || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Relationship:</strong>{" "}
                    {(() => {
                      const relationship = relationshipEnums.find(
                        (rel) => rel.enumValue === guardian.relationshipToUser
                      );
                      return relationship
                        ? `${relationship.vietnameseEnumDescription} (${relationship.englishEnumDescription})`
                        : "N/A";
                    })()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Address:</strong> {guardian.address || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="body2">
            No guardian information provided.
          </Typography>
        )}
      </Box>

      {/* Confirmation Checkbox */}
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
          }
          label="I confirm that all the information provided is correct."
        />
      </Box>
      {formErrors.isConfirmed && (
        <Typography color="error" sx={{ mb: 1 }}>{formErrors.isConfirmed}</Typography>
      )}

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isReadTerms}
              disabled={!isReadTerms}
              onChange={(e) => setIsReadTerms(e.target.checked)}
            />
          }
          label="I have read and agree to the terms and conditions."
        />
        <Button
          size="small"
          sx={{ ml: 1, textTransform: "none" }}
          onClick={handleOpenTerms}
        >
          View Terms{" "}
          <Iconify icon="eva:eye-outline" width={18} sx={{ ml: 1 }} />
        </Button>
        <TermAndConditionModal
          open={openTerms}
          onClose={handleCloseTerms}
          onConfirm={handleConfirmTerms}
        />
      </Box>
      {formErrors.isReadTerms && (
        <Typography color="error">
          {formErrors.isReadTerms}
        </Typography>
      )}

      {/* Action Buttons */}
      <Stack
        spacing={3}
        direction="row"
        justifyContent="space-between"
        sx={{ mt: 5 }}
      >
        <Button
          variant="outlined"
          onClick={onBackStep}
          size="large"
          disabled={isLoading}
        >
          Back Step
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "Processing your request" : "Register"}
        </Button>
      </Stack>
    </Container>
  );
}
