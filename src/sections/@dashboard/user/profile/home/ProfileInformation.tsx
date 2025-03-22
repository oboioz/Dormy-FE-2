import { useForm } from "react-hook-form";
import { Box, Card, CardHeader, Stack } from "@mui/material";
import FormProvider, {
  RHFTextField,
} from "../../../../../components/hook-form";
import { useAuthContext } from "../../../../../auth/JwtContext";
import { useEffect, useState } from "react";
import { Profile } from "../../../../../models/responses/UserModel";
import { httpClient } from "../../../../../utils/axios";

type FormValuesProps = {
  firstName: string;
  lastName: string;
  gender: string;
  dayOfBirth: Date;
  address: string;
  NIC: string;
  email: string;
  phoneNumber: string;
  priority: string | null;

  workplaceName: string;
  workplaceAddress: string;

  guardianName: string;
  guardianAddress: string;
  guardianPhoneNumber: string;
  guardianEmail: string;
  guardianRelationship: string;
};

export default function ProfileInformation() {
  const [profile, setProfile] = useState<Profile>();
  var { user } = useAuthContext();

  const setUserData = (profile: Profile) => {
    setValue("firstName", profile.firstName);
    setValue("lastName", profile.lastName);
    setValue("gender", profile.gender.toLocaleUpperCase());
    setValue(
      "dayOfBirth",
      profile.dateOfBirth ? new Date(profile.dateOfBirth) : new Date()
    );
    setValue("address", "--");
    setValue("NIC", profile.nationalIdNumber);
    setValue("email", profile.email);
    setValue("phoneNumber", profile.phoneNumber);
    setValue("priority", "");
    setValue("workplaceName", "ABC Corporation");
    setValue("workplaceAddress", "456 Business Road, District 1, HCMC");
    setValue("guardianName", "Nguyen Van A");
    setValue("guardianAddress", "789 Family Street, Ho Chi Minh City");
    setValue("guardianPhoneNumber", "0971234567");
    setValue("guardianEmail", "guardian@example.com");
    setValue("guardianRelationship", "Father");
  };

  const fetchProfile = async () => {
    if (user) {
      var response = await httpClient.userGetProfile(user?.id);
      if (response) {
        setProfile(response);
        setUserData(response);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const defaultValues = {
    firstName: "--",
    lastName: "--",
    gender: "--",
    dayOfBirth: new Date(), // October 26, 1999 (Months are 0-based)

    address: "--",
    NIC: "--",
    email: "--",
    phoneNumber: "--",
    priority: "",

    workplaceName: "ABC Corporation",
    workplaceAddress: "456 Business Road, District 1, HCMC",

    guardianName: "Nguyen Van A",
    guardianAddress: "789 Family Street, Ho Chi Minh City",
    guardianPhoneNumber: "0971234567",
    guardianEmail: "guardian@example.com",
    guardianRelationship: "Father",
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
              name="dayOfBirth"
              label="Date of Birth"
              type="date"
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
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <RHFTextField
              name="priority"
              multiline
              rows={4}
              label="Priority"
              InputProps={{ readOnly: true }}
            />
          </Stack>
        </Card>

        <Card sx={{ p: 3 }}>
          <CardHeader title="Workplace" />
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
              name="workplaceName"
              label="Workplace Name"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="workplaceAddress"
              label="Workplace Address"
              InputProps={{ readOnly: true }}
            />
          </Box>
        </Card>

        <Card sx={{ p: 3 }}>
          <CardHeader title="Guardian Information" />
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
              name="guardianName"
              label="Guardian Name"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="guardianAddress"
              label="Guardian Address"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="guardianPhoneNumber"
              label="Guardian Phone Number"
              InputProps={{ readOnly: true }}
            />
            <RHFTextField
              name="guardianEmail"
              label="Guardian Email"
              InputProps={{ readOnly: true }}
            />
          </Box>
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <RHFTextField
              name="guardianRelationship"
              label="Guardian Relationship"
              InputProps={{ readOnly: true }}
            />
          </Stack>
        </Card>
      </Stack>
    </FormProvider>
  );
}
