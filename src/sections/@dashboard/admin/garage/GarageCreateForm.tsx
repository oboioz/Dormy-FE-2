import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";
import Iconify from "../../../../components/iconify";
import { PATH_ADMIN } from "../../../../routes/paths";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";

type FormValuesProps = {
  parkingSpotName: string;
  capacitySpots: number;
};

const UpdateSchema = Yup.object().shape({
  parkingSpotName: Yup.string().required("Spot Name is required"),
  capacitySpots: Yup.number()
    .required("Capacity is required!")
    .min(1, "Minimum value is >= 1"),
});

const defaultValues: FormValuesProps = {
  parkingSpotName: "Spot Name",
  capacitySpots: 1,
};

export default function GarageCreateForm() {
  const navigate = useNavigate();
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
    formState: { isSubmitting },
  } = methods;

  const createParkingSpot = async (data: FormValuesProps) => {
    var response = await httpClient.parkingSpotService.createParkingSpot({
      capacitySpots: data.capacitySpots,
      parkingSpotName: data.parkingSpotName,
    });

    if (response) {
      toast.success("Create Spot Success");
      navigate(PATH_ADMIN.garage.parkingSpot);
    } else {
      toast.error("An error has occurred, please try again later");
      reset();
    }
  };

  const onSubmit = async (data: FormValuesProps) => {
    createParkingSpot(data);
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        Parking Spot Create Form
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={5}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">
                Information of the Parking Spot
              </Typography>

              <RHFTextField
                name="parkingSpotName"
                label="Spot Name"
                onChange={(event) =>
                  setValue("parkingSpotName", event.target.value, {
                    shouldValidate: true,
                  })
                }
                InputProps={{
                  type: "number",
                }}
              />
              <RHFTextField
                name="capacitySpots"
                label="Capacity"
                onChange={(event) =>
                  setValue("capacitySpots", Number(event.target.value), {
                    shouldValidate: true,
                  })
                }
                InputProps={{
                  type: "number",
                }}
              />
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
                to={PATH_ADMIN.garage.parkingSpot}
              >
                Back to Parking Spot List
              </Button>

              {/* Next Step Button */}
              <LoadingButton
                variant="contained"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                size="large"
                type="submit"
                loading={isSubmitting}
              >
                Confirm
              </LoadingButton>
            </Stack>
          </Container>
        </Grid>
      </FormProvider>
    </>
  );
}
