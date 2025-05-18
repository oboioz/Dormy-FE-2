import { useForm } from "react-hook-form";
import { Box, Card, CardHeader, Stack, Typography } from "@mui/material";
import FormProvider, {
  RHFTextField,
} from "../../../../../components/hook-form";
import { useAuthContext } from "../../../../../auth/JwtContext";
import { useEffect, useState } from "react";
import { Profile, UserProfileDetailInformationResponseModel, UserProfileGuardianResponseModel, UserProfileWorkplaceResponseModel } from "../../../../../models/responses/UserModel";
// import { httpClient } from "../../../../../utils/axios";
import { WorkplaceModel } from "../../../../../models/responses/WorkplaceModels";
import { GuardianModel } from "../../../../../models/responses/GuardianModels";
import { httpClient } from "../../../../../services";
import { getGenderDescription } from "../../../../../models/enums/GenderEnum";
import { fDate } from "../../../../../utils/formatTime";

type Guardian = {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  relationship: string;
};

type FormValuesProps = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  NIC: string;
  email: string;
  phoneNumber: string;
  // priority: string | null;

  workplaceName: string;
  workplaceAddress: string;

  guardians: Guardian[]; // Define a list of guardians
};

export default function ProfileInformation() {
  var { user } = useAuthContext();

  const [profile, setProfile] = useState<UserProfileDetailInformationResponseModel>();
  const [workplace, setWorkplace] = useState<UserProfileWorkplaceResponseModel>();
  const [guardians, setGuardians] = useState<UserProfileGuardianResponseModel[]>();

  const setUserData = (
    profile: UserProfileDetailInformationResponseModel | undefined,
    workplace: UserProfileWorkplaceResponseModel | undefined,
    guardians: UserProfileGuardianResponseModel[]
  ) => {
    setValue("firstName", profile?.firstName || "--");
    setValue("lastName", profile?.lastName || "--");
    setValue("gender", profile?.gender ? getGenderDescription(profile?.gender) : "--");
    setValue(
      "dateOfBirth",
      profile?.dateOfBirth
        ? fDate(profile?.dateOfBirth, "dd/MM/yyyy")
        : "--/--/--"
    );
    setValue("address", "--");
    setValue("NIC", profile?.nationalIdNumber || "--");
    setValue("email", profile?.email || "--");
    setValue("phoneNumber", profile?.phoneNumber || "--");
    // setValue("priority", "");
    setValue("workplaceName", workplace?.name || "--");
    setValue("workplaceAddress", workplace?.address || "--");
    setValue(
      "guardians",
      guardians?.map((guardian) => ({
        name: guardian.name || "--",
        address: guardian.address || "--",
        phoneNumber: guardian.phoneNumber || "--",
        email: guardian.email || "--",
        relationship: guardian.relationshipToUser || "--",
      })));
  };

  useEffect(() => {
    setUserData(profile, workplace, guardians || []);
  }, [profile, workplace, guardians]);

  const fetchProfile = async () => {
    if (user) {
      var response = await httpClient.userService.userGetProfile(user?.id);
      if (response) {
        setProfile(response.user);
        setGuardians(response.guardians);
        setWorkplace(response.workplace);
      }
    }
  };

  // const fetchWorkplace = async () => {
  //   if (user) {
  //     var response = await httpClient.workplaceService.getUserWorkplace();
  //     if (response) {
  //       setWorkplace(response);
  //     }
  //   }
  // };

  // const fetchGuardian = async () => {
  //   if (user) {
  //     var response = await httpClient.guardianService.getUserGuardian();
  //     if (response) {
  //       console.log("GUARDIAN", response);
  //       setGuardians(response);
  //     }
  //   }
  // };

  useEffect(() => {
    fetchProfile();
    // fetchWorkplace();
    // fetchGuardian();
  }, []);

  const defaultValues = {
    firstName: "--",
    lastName: "--",
    gender: "--",
    dateOfBirth: '--',
    address: "--",
    NIC: "--",
    email: "--",
    phoneNumber: "--",

    workplaceName: "--",
    workplaceAddress: "--",

    guardians: [
      {
        name: "--",
        address: "--",
        phoneNumber: "--",
        email: "--",
        relationship: "--",
      },
    ],
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("DATA", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <CardHeader title="Personal Information" />
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <RHFTextField
              name="firstName"
              label="First Name"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="lastName"
              label="Last Name"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="gender"
              label="Gender"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="dateOfBirth"
              label="Date of Birth"
              // type="date"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="address"
              label="Address"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="NIC"
              label="NIC (National ID Card)"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="email"
              label="Email Address"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="phoneNumber"
              label="Phone Number"
              InputProps={{ readOnly: true }}
            />
          </Box>
          {/* <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <RHFTextField
              name="priority"
              multiline
              rows={4}
              label="Priority"
              InputProps={{ readOnly: true }}
            />
          </Stack> */}
        </Card>

        <Card sx={{ p: 3 }}>
          <CardHeader title="Place of Work/Study" />
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <RHFTextField
              name="workplaceName"
              label="Place of Work/Study Name"
              InputProps={{ readOnly: true }}
            />
          </Stack>
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <RHFTextField
              name="workplaceAddress"
              label="Place of Work/Study Address"
              InputProps={{ readOnly: true }}
            />
          </Stack>
        </Card>

        <Card sx={{ p: 3 }}>
          <CardHeader title="Relative Information" />
          {methods.watch("guardians").map((guardian, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Relative {index + 1}
              </Typography>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <RHFTextField
                  name={`guardians[${index}].name`}
                  label="Name"
                  InputProps={{ readOnly: true }}
                />
                <RHFTextField
                  name={`guardians[${index}].relationship`}
                  label="Relationship"
                  InputProps={{ readOnly: true }}
                />
                <RHFTextField
                  name={`guardians[${index}].phoneNumber`}
                  label="Phone Number"
                  InputProps={{ readOnly: true }}
                />
                <RHFTextField
                  name={`guardians[${index}].email`}
                  label="Email"
                  InputProps={{ readOnly: true }}
                />
                {/* <RHFTextField
                  name={`guardians[${index}].address`}
                  label="Address"
                  InputProps={{ readOnly: true }}
                /> */}
              </Box>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                sx={{ mt: 3 }}
              >
                <RHFTextField
                  name={`guardians[${index}].address`}
                  label="Address"
                  InputProps={{ readOnly: true }}
                />
              </Box>
            </Box>
          ))}
        </Card>
      </Stack>
    </FormProvider>
  );
}
