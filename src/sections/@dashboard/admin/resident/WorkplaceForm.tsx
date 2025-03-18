// @mui
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
// @types
// _mock
// components
//
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from "yup";
import { IUserWorkplace } from '../../../../@types/user';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';
import { PATH_ADMIN } from '../../../../routes/paths';



// ----------------------------------------------------------------------

const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];

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
    .required('Name is required')
    .min(6, 'Mininum 6 characters'),
  address: Yup.string().required('Address is required!'),
  abbreviation: Yup.string().required('Abbreviation is required!'),
});

const defaultValues: FormValuesProps = {
  name: '',
  address: '',
  abbreviation: '',
};

export default function WorkplaceForm({ workplaceInformation }: Props) {


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
    console.log('DATA', data);
    reset();
  };


  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 5 }}>
        Please fill the form
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} alignContent={'center'} justifyContent={'center'}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h6">Workplace Information</Typography>

              <RHFTextField name="name" label="Name" />

              <RHFTextField name="address" label="Address" />

              <RHFTextField name="abbreviation" label="Abbreviation" />


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
                size='large'
                component={RouterLink} // Use RouterLink for navigation
                to={PATH_ADMIN.workplace.list}
              >
                Back Step
              </Button>

              {/* Next Step Button */}
              <LoadingButton
                variant="contained"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                size='large'
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

