// form
// @mui
import { Box, Card, CardHeader, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, { RHFTextField } from "../../../components/hook-form";
import { useAuthContext } from "../../../auth/JwtContext";
import { useEffect, useState } from "react";
import { Profile, UserInformation } from "../../../models/responses/UserModel";
import { httpClient } from "../../../services";
import { fDate } from "../../../utils/formatTime";

// utils

// ----------------------------------------------------------------------

type FormValuesProps = {
  adminID: string;
  role: string;

  displayName: string;
  gender: string;
  email: string;
  phoneNumber: string;
};

export default function AdminInformation() {
  const { user } = useAuthContext();

  const [profile, setProfile] = useState<UserInformation>({
    id: "",
    dateOfBirth: fDate(new Date()),
    email: "--",
    firstName: "--",
    lastName: "--",
    gender: "N/A",
    phoneNumber: "--",
    userName: "--",
    jobTitle: "Administrator",
  });

  const defaultValues = {
    adminID: profile.id,
    role: "Administrator",

    displayName: profile.firstName + " " + profile.lastName || "--",
    gender: profile.gender,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { setValue } = methods;

  const fetchProfile = async () => {
    if (user) {
      var response = await httpClient.authService.getAdminInfo(user?.id);
      if (response) {
        setProfile(response);
        setValue("adminID", response.id.slice(0, 8));
        setValue("displayName", response.firstName + " " + response.lastName);
        setValue("email", response.email);
        setValue("email", response.email);
        setValue("phoneNumber", response.phoneNumber);
        setValue("gender", response.gender.toLocaleUpperCase());
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <FormProvider methods={methods}>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <CardHeader title="Administrator Information" />
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
              name="adminID"
              label="Admin ID"
              InputProps={{ readOnly: true }}
            />

            <RHFTextField
              name="role"
              label="Role"
              InputProps={{ readOnly: true }}
            />
          </Box>
        </Card>

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
              name="displayName"
              label="Name"
              InputProps={{ readOnly: true }}
            />

            <RHFTextField
              name="gender"
              label="Gender"
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
        </Card>
      </Stack>
    </FormProvider>
  );
}
