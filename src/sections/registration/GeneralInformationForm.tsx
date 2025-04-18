// @mui
import {
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { IDocuments, IRegistrationFormState, IUser } from "../../@types/user";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { RHFSelect } from "../../components/hook-form/RHFSelect";
import { RHFUpload } from "../../components/hook-form/RHFUpload";
import Iconify from "../../components/iconify";
import { PATH_REGISTER } from "../../routes/paths";
import { RHFDatePicker } from "../../components/hook-form/RHFDatePicker";
import { IEnumModel } from "../../models/responses/EnumModels";
import { WorkplaceOptionModel } from "../../models/responses/WorkplaceModels";
// redux
import { updateGeneralInformation } from "../../redux/slices/registration";
import { useDispatch } from "../../redux/store";

// ----------------------------------------------------------------------

type Props = {
  generalInformation: IRegistrationFormState;
  genderEnums: IEnumModel[];
  workplaceOptions: WorkplaceOptionModel[];
  documents: IDocuments;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
};

type FormValuesProps = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | null;
  email: string;
  phoneNumber: string;
  workplaceName: string;
  nationalIDNumber: string;
  insuranceCardNumber: string;
  expirationDate: Date | null;
  registeredHospital: string;
  //Remove these fields if not needed
  portraitPhoto: File | null;
  educationPhoto: File | null;
  nationalIDPhotosFront: File | null;
  nationalIDPhotosBack: File | null;
};

const UpdateSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required!"),
  dateOfBirth: Yup.date()
    .nullable() // Allow null values
    .required("Date of Birth is required")
    .typeError("Date of Birth must be a valid date"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  phoneNumber: Yup.string().required("Phone number is required!"),
  workplaceName: Yup.string().required("Workplace name is required!"),
  nationalIDNumber: Yup.string().required("National ID Number is required!"),
  insuranceCardNumber: Yup.string().required("Insurance card number is required!"),
  expirationDate: Yup.date()
    .nullable() // Allow null values
    .required("Expiration date is required")
    .typeError("Expiration date must be a valid date"),
  registeredHospital: Yup.string().required("Registered hospital is required!"),
  //
  // portraitPhoto: Yup.mixed().nullable().required("Single upload is required"),
  // educationPhoto: Yup.mixed().nullable().required("Single upload is required"),
  // nationalIDPhotosFront: Yup.mixed().nullable().required("Single upload is required"),
  // nationalIDPhotosBack: Yup.mixed().nullable().required("Single upload is required"),
});

export default function GeneralInformationForm({
  generalInformation,
  genderEnums,
  workplaceOptions,
  documents,
  onNextStep,
  onBackStep,
}: Props) {
  const defaultValues: FormValuesProps = {
    firstName: generalInformation.userState.firstName,
    lastName: generalInformation.userState.lastName,
    gender: generalInformation.userState.gender,
    dateOfBirth: generalInformation.userState.dateOfBirth,
    email: generalInformation.userState.email,
    phoneNumber: generalInformation.userState.phoneNumber,
    workplaceName: generalInformation.workplaceId,
    nationalIDNumber: generalInformation.userState.nationalIdNumber,
    insuranceCardNumber:
      generalInformation.healthInsuranceState.insuranceCardNumber,
    expirationDate: generalInformation.healthInsuranceState.expirationDate,
    registeredHospital:
      generalInformation.healthInsuranceState.registeredHospital,
    //Remove these fields if not needed
    portraitPhoto: null,
    educationPhoto: null,
    nationalIDPhotosFront: null,
    nationalIDPhotosBack: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchema) as any,
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    // formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  // const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    setIsLoading(true);
    const dataPayload: IRegistrationFormState = {
      userState: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        nationalIdNumber: data.nationalIDNumber,
      },
      healthInsuranceState: {
        insuranceCardNumber: data.insuranceCardNumber,
        expirationDate: data.expirationDate,
        registeredHospital: data.registeredHospital,
      },
      guardianState: generalInformation.guardianState,
      workplaceId: data.workplaceName,
      roomState: generalInformation.roomState,
      startDate: generalInformation.startDate,
      endDate: generalInformation.endDate,
    };

    dispatch(updateGeneralInformation(dataPayload));

    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("DATA", data);

    setIsLoading(false);
    // Call the next step function
    onNextStep();

    // reset();
  };

  const [portraitPhoto, setPortraitPhoto] = useState<File | string | null>(
    null
  );
  const [educationPhoto, setEducationPhoto] = useState<File | string | null>(
    null
  );
  const [nationalIDPhotosFront, setNationalIDPhotosFront] = useState<
    File | string | null
  >(null);
  const [nationalIDPhotosBack, setNationalIDPhotosBack] = useState<
    File | string | null
  >(null);

  const handleDropPortraitPhoto = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue("portraitPhoto", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropEducationPhoto = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue("educationPhoto", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropNationalIDPhotosFront = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue("nationalIDPhotosFront", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropNationalIDPhotosBack = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue("nationalIDPhotosBack", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  // const { workplace } = generalInformation;

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        Please fill in all the personal information
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={5}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={12} md={10}>
            <Stack spacing={1}>
              <Typography variant="h6">1. General Information</Typography>

              {/* <Typography variant="body1" fontWeight="bold">Portrait photo</Typography>
              <RHFUpload
                name="portraitPhoto"
                maxSize={3145728}
                onDrop={handleDropPortraitPhoto}
                onDelete={() => setValue('portraitPhoto', null, { shouldValidate: true })}
              /> */}

              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="firstName" label="First Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="lastName" label="Last Name" />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <RHFSelect name="gender" label="Gender">
                    {/* <MenuItem value="">None</MenuItem>
                    <Divider sx={{ borderStyle: "dashed" }} /> */}
                    {genderEnums?.map((option) => (
                      <MenuItem key={option.enumValue} value={option.enumValue}>
                        {option.vietnameseEnumDescription +
                          " (" +
                          option.englishEnumDescription +
                          ")"}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFDatePicker name="dateOfBirth" label="Date of birth" />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="email" label="Email address" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name="phoneNumber" label="Phone Number" />
                </Grid>
              </Grid>
            </Stack>

            <Stack
              spacing={1}
              sx={{
                pt: 5,
              }}
            >
              <Typography variant="h6">2. Education Information</Typography>
              {/* <Typography variant="body1" fontWeight="bold">
                Education photo
              </Typography>
              <RHFUpload
                name="educationPhoto"
                maxSize={3145728}
                onDrop={handleDropEducationPhoto}
                onDelete={() =>
                  setValue("educationPhoto", null, { shouldValidate: true })
                }
              /> */}

              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <RHFSelect name="workplaceName" label="Workplace">
                    {workplaceOptions?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name + " (" + option.abbrevation + ")"}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
              </Grid>
            </Stack>

            <Stack
              spacing={1}
              sx={{
                pt: 5,
              }}
            >
              <Typography variant="h6">
                3. National Identity Information
              </Typography>
              {/* <Typography variant="body1" fontWeight="bold">
                National ID Photo Front
              </Typography>
              <RHFUpload
                name="nationalIDPhotosFront"
                maxSize={3145728}
                onDrop={handleDropNationalIDPhotosFront}
                onDelete={() =>
                  setValue("nationalIDPhotosFront", null, {
                    shouldValidate: true,
                  })
                }
              />

              <Typography variant="body1" fontWeight="bold">
                National ID Photo Back
              </Typography>
              <RHFUpload
                name="nationalIDPhotosBack"
                maxSize={3145728}
                onDrop={handleDropNationalIDPhotosBack}
                onDelete={() =>
                  setValue("nationalIDPhotosBack", null, {
                    shouldValidate: true,
                  })
                }
              /> */}
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <RHFTextField
                    name="nationalIDNumber"
                    label="National Identity Number"
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack
              spacing={1}
              sx={{
                pt: 5,
              }}
            >
              <Typography variant="h6">
                4. Health Information Information
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name="insuranceCardNumber"
                    label="Insurance card number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFDatePicker name="expirationDate" label="Expired date" />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <RHFTextField
                    name="registeredHospital"
                    label="Registered hospital"
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Container
          sx={{
            pt: 5,
          }}
        >
          {/* Back to Login Button */}
          <Stack spacing={3} direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={onBackStep} // Change this based on your path
              size="large"
            >
              Back Step
            </Button>

            {/* Next Step Button */}
            <Button
              variant="contained"
              endIcon={
                !isLoading ? (
                  <Iconify icon="eva:arrow-ios-forward-fill" />
                ) : null
              }
              onClick={handleSubmit(onSubmit)}
              // onClick={onNextStep} // Change this based on your path
              size="large"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Next Step"}
            </Button>
          </Stack>
        </Container>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------
