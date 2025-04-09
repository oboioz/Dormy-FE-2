// @mui
import {
  Button,
  Container,
  Grid,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { IParkingRequest } from "../../@types/vehicle";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { RHFUpload } from "../../components/hook-form/RHFUpload";
import Iconify from "../../components/iconify";
import { PATH_USER } from "../../routes/paths";

type Props = {
  request: IParkingRequest;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
};

type FormValuesProps = {
  licensePlate: string;
  type: string;
  licensePhoto: File | null;
  vehicleDocumentPhoto: File | null;
};

const UpdateSchema = Yup.object().shape({
  licensePlate: Yup.string().required("Licenseplate is required!"),
  type: Yup.string().required("Vehicle Type is required!"),
  licensePhoto: Yup.mixed().required("Single upload is required").nullable(),
  vehicleDocumentPhoto: Yup.mixed()
    .required("Single upload is required")
    .nullable(),
});

const defaultValues: FormValuesProps = {
  licensePlate: "",
  type: "",
  licensePhoto: null,
  vehicleDocumentPhoto: null,
};

export default function VehicleRegistrationForm({ request }: Props) {
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("DATA", data);
    reset();
  };

  const handleDropLicensePhoto = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue("licensePhoto", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropVehicleDocumentPhoto = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue("vehicleDocumentPhoto", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h6">1. General Information</Typography>
              <Block>
                <Typography variant="body1">Portrait photo</Typography>
                <RHFUpload
                  name="licensePhoto"
                  maxSize={3145728}
                  onDrop={handleDropLicensePhoto}
                  onDelete={() =>
                    setValue("licensePhoto", null, { shouldValidate: true })
                  }
                />
              </Block>

              <Block>
                <RHFTextField name="firstName" label="First Name" />
              </Block>

              <Block>
                <RHFTextField name="lastName" label="Last Name" />
              </Block>

              <Block>
                <Typography variant="body1">Portrait photo</Typography>
                <RHFUpload
                  name="vehicleDocumentPhoto"
                  maxSize={3145728}
                  onDrop={handleDropVehicleDocumentPhoto}
                  onDelete={() =>
                    setValue("vehicleDocumentPhoto", null, {
                      shouldValidate: true,
                    })
                  }
                />
              </Block>
            </Stack>
          </Grid>

          <Container
            sx={{
              pt: 15,
            }}
          >
            <Stack spacing={3} direction="row" justifyContent="space-between">
              <Button
                variant="outlined"
                size="large"
                component={RouterLink} // Use RouterLink for navigation
                to={PATH_USER.vehicle}
              >
                Back Step
              </Button>

              {/* Next Step Button */}
              <LoadingButton
                variant="contained"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                size="large"
                type="submit"
                loading={isSubmitting}
              >
                Next Step
              </LoadingButton>
            </Stack>
          </Container>
        </Grid>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

function Block({ label = "RHFTextField", sx, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: "right",
          fontStyle: "italic",
          color: "text.disabled",
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
