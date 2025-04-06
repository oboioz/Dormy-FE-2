// @mui
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
// @types
// _mock
// components
//
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import * as Yup from "yup";
import { IUserWorkplace } from "../../../../@types/user";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";
import Iconify from "../../../../components/iconify";
import { PATH_ADMIN, PATH_PAGE } from "../../../../routes/paths";
import {
  WorkplaceCreateModel,
  WorkplaceModel,
  WorkplaceUpdateModel,
} from "../../../../models/responses/WorkplaceModels";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

type Props = {
  workplaceInformation: IUserWorkplace | null;
};

type FormValuesProps = {
  name: string;
  address: string;
  abbreviation: string;
};

const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .required("Workplace name is required")
    .min(1, "Minimum 1 characters"),
  address: Yup.string().required("Address is required!"),
  abbrevation: Yup.string().required("Abbreviation is required!"),
});

const defaultValues: WorkplaceCreateModel = {
  name: "",
  address: "",
  abbrevation: "",
};

export default function WorkplaceForm({ workplaceInformation }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workplaceId = searchParams.get("id");
  const [originalWorkplace, setOriginalWorkplace] =
    useState<WorkplaceCreateModel>(defaultValues);
  const isEditMode = Boolean(workplaceId);

  const methods = useForm<WorkplaceCreateModel>({
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

  const handleUpdateWorkplace = async (data: WorkplaceCreateModel) => {
    var response = await httpClient.workplaceService.updateWorkplace({
      ...data,
      id: workplaceId,
    } as WorkplaceUpdateModel);
    if (response === true) {
      toast.success("Update workplace success");
      navigate(PATH_ADMIN.workplace.list);
    } else {
      toast.error(response as string);
    }
  };

  const handleCreateWorkplace = async (data: WorkplaceCreateModel) => {
    var response = await httpClient.workplaceService.createWorkplace(data);
    if (response) {
      toast.success("Create workplace success");
      navigate(PATH_ADMIN.workplace.list);
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  const onSubmit = async (data: WorkplaceCreateModel) => {
    if (isEditMode) {
      handleUpdateWorkplace(data);
    } else {
      handleCreateWorkplace(data);
    }
  };

  const fetchWorkplaceById = async (id: string) => {
    try {
      const response = await httpClient.workplaceService.getWorkplaceById(id);
      if (response) {
        setValue("name", response.name);
        setValue("address", response.address);
        setValue("abbrevation", response.abbrevation);
        setOriginalWorkplace({
          name: response.name,
          address: response.address,
          abbrevation: response.abbrevation,
        } as WorkplaceCreateModel);
      } else {
        toast.error("An error has occurred, please try again later");
      }
    } catch (error) {
      console.error("Error fetching workplace data:", error);
    }
  };

  useEffect(() => {
    if (workplaceId) {
      fetchWorkplaceById(workplaceId);
    }
  }, [workplaceId]);

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        Create Workplace
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={5}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h6">Workplace Information</Typography>

              <RHFTextField name="name" label="Name" />

              <RHFTextField name="address" label="Address" />

              <RHFTextField name="abbrevation" label="Abbreviation" />
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
                to={PATH_ADMIN.workplace.list}
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
