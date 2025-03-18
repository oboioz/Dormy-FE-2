// @mui
import { Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from "yup";
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';
import { PATH_USER } from '../../../../routes/paths';


// ----------------------------------------------------------------------

type FormValuesProps = {
  startDate: Date | null;
  endDate: Date | null;
  reason: string;
};

const UpdateSchema = Yup.object().shape({
  startDate: Yup.date().nullable().required('Start Date is required'),
  endDate: Yup.date().nullable().required('End Date is required'),
  reason: Yup.string().required('Reason is required!'),
});

const defaultValues: FormValuesProps = {
  startDate: null,
  endDate: null,
  reason: '',
};

export default function OvernightAbsenceForm() {


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
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">Overnight Absence Form</Typography>

              <Stack spacing={2} direction={'row'}>

                <Controller
                  name="startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Date Of Birth"
                      // inputFormat="dd/MM/yyyy"
                      format="DD/MM/YYYY"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Date Of Birth"
                      // inputFormat="dd/MM/yyyy"
                      format="DD/MM/YYYY"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

              </Stack>

              <RHFTextField name="reason" multiline rows={4} label="Reason" />



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
                to={PATH_USER.overnight}
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

