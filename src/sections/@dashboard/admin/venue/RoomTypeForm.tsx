// @mui
import { Button, Container, Grid, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from "yup";
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';
import { PATH_ADMIN } from '../../../../routes/paths';


// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  description: string;
  capacity: number;
  price: number;
};

const UpdateSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  description: Yup.string().required('Description is required!'),
  capacity: Yup.number().required('Capacity is required!').min(2, 'Mininum value is >= 2'),
  price: Yup.number().required('Price is required!'),
});

const defaultValues: FormValuesProps = {
  name: '',
  description: '',
  capacity: 0,
  price: 0,
};

export default function RoomTypeForm() {


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
        Room Type
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} alignContent={'center'} justifyContent={'center'}>
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">Information of Room Type</Typography>


              <RHFTextField name="name" label="Name" />

              <RHFTextField name="capacity" label="Capacity" />
              <RHFTextField name="price" label="Price" />
              <RHFTextField name="description" multiline rows={4} label="Description" />

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
                to={PATH_ADMIN.dormitory.roomType}
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

// ----------------------------------------------------------------------

