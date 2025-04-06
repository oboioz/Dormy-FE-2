// @mui
import {
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { IRegistrationFormState, IUser } from "../../@types/user";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { RHFSelect } from "../../components/hook-form/RHFSelect";
import Iconify from "../../components/iconify";
import { IEnumModel } from "../../models/responses/EnumModels";
import { useState } from "react";
import { useDispatch } from "../../redux/store";
import { updateGeneralInformation } from "../../redux/slices/registration";

type Props = {
  generalInformation: IRegistrationFormState;
  relationshipEnums: IEnumModel[];
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
};

const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .required("First name is required")
    .min(6, "Mininum 6 characters")
    .max(32, "Maximum 32 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  phoneNumber: Yup.string().required("Phone number is required!"),
  address: Yup.string().required("Address is required!"),
  relationshipToUser: Yup.string().required("Relationship is required!"),
});

type Guardian = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  relationshipToUser: string;
};

type FormValuesProps = {
  guardians: Guardian[]; // Define the guardians array
};

export default function GuardianInformationForm({
  generalInformation,
  relationshipEnums,
  onNextStep,
  onBackStep,
}: Props) {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: FormValuesProps = {
    guardians: generalInformation.guardianState?.length
      ? generalInformation.guardianState.map((guardian) => ({
          name: guardian.name || "",
          email: guardian.email || "",
          phoneNumber: guardian.phoneNumber || "",
          address: guardian.address || "",
          relationshipToUser: guardian.relationshipToUser || "",
        }))
      : [
          {
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            relationshipToUser: "",
          },
        ],
  };

  const methods = useForm<FormValuesProps>({
    // resolver: yupResolver(UpdateSchema),
    defaultValues,
  });

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guardians", // Field array name
  });

  const validateForm = (data: FormValuesProps) => {
    const errors: Record<string, string> = {};

    data.guardians.forEach((guardian, index) => {
      if (!guardian.name) {
        errors[`guardians.${index}.name`] = "Name is required.";
      }
      if (!guardian.relationshipToUser) {
        errors[`guardians.${index}.relationshipToUser`] =
          "Relationship is required.";
      }
      // if (!guardian.email) {
      //   errors[`guardians.${index}.email`] = "Email is required.";
      // }
      if (!guardian.phoneNumber) {
        errors[`guardians.${index}.phoneNumber`] = "Phone number is required.";
      }
      if (!guardian.address) {
        errors[`guardians.${index}.address`] = "Address is required.";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (data: FormValuesProps) => {
    if (!validateForm(data)) {
      return;
    }
    setIsLoading(true);
    const dataPayload: IRegistrationFormState = {
      userState: generalInformation.userState,
      healthInsuranceState: generalInformation.healthInsuranceState,
      guardianState: data.guardians.map((guardian) => ({
        name: guardian.name,
        email: guardian.email,
        phoneNumber: guardian.phoneNumber,
        address: guardian.address,
        relationshipToUser: guardian.relationshipToUser,
      })),
      workplaceId: generalInformation.workplaceId,
      roomState: generalInformation.roomState,
      startDate: generalInformation.startDate,
      endDate: generalInformation.endDate,
    };

    dispatch(updateGeneralInformation(dataPayload));
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("DATA", data);

    setIsLoading(false);
    onNextStep();
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        Please fill in all the guardian information
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={5}
          alignContent={"center"}
          justifyContent={"center"}
        >
          {fields.map((field, index) => (
            <Grid item xs={12} md={10} key={field.id}>
              <Stack spacing={2}>
                <Typography variant="h6">
                  Guardian Information {index + 1}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <RHFTextField
                      name={`guardians[${index}].name`}
                      label="Name"
                    />
                    {formErrors[`guardians.${index}.name`] && (
                      <Typography color="error">
                        {formErrors[`guardians.${index}.name`]}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RHFSelect
                      name={`guardians[${index}].relationshipToUser`}
                      label="Relationship To User"
                    >
                      {relationshipEnums?.map((option) => (
                        <MenuItem
                          key={option.enumValue}
                          value={option.enumValue}
                        >
                          {option.vietnameseEnumDescription +
                            " (" +
                            option.englishEnumDescription +
                            ")"}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                    {formErrors[`guardians.${index}.relationshipToUser`] && (
                      <Typography color="error">
                        {formErrors[`guardians.${index}.relationshipToUser`]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <RHFTextField
                      name={`guardians[${index}].email`}
                      label="Email address"
                    />
                    {formErrors[`guardians.${index}.email`] && (
                      <Typography color="error">
                        {formErrors[`guardians.${index}.email`]}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RHFTextField
                      name={`guardians[${index}].phoneNumber`}
                      label="Phone Number"
                    />
                    {formErrors[`guardians.${index}.phoneNumber`] && (
                      <Typography color="error">
                        {formErrors[`guardians.${index}.phoneNumber`]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <RHFTextField
                      name={`guardians[${index}].address`}
                      label="Address"
                    />
                    {formErrors[`guardians.${index}.address`] && (
                      <Typography color="error">
                        {formErrors[`guardians.${index}.address`]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                {fields.length > 1 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => remove(index)}
                        sx={{ float: "right" }}
                      >
                        Remove Guardian
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Grid container alignContent={"center"} justifyContent={"center"}>
          <Container
            sx={{
              pt: 5,
            }}
          >
            <Stack spacing={1} direction="row" justifyContent="center">
              <Button
                variant="contained"
                onClick={() =>
                  append({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                    relationshipToUser: "",
                  })
                }
              >
                Add Guardian
              </Button>
            </Stack>
          </Container>
        </Grid>

        <Grid container alignContent={"center"} justifyContent={"center"}>
          <Container
            sx={{
              pt: 5,
            }}
          >
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
                size="large"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Next Step"}
              </Button>
            </Stack>
          </Container>
        </Grid>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------
