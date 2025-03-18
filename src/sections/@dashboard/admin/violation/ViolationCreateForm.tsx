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

type FormValuesProps = {
  violator: string;
  description: string;
  penalty: number;
  violationDate: Date;
};

const ViolationSchema = Yup.object().shape({
  violator: Yup.string().required('Violator name is required'),
  description: Yup.string().required('Description is required'),
  penalty: Yup.number()
    .required('Penalty amount is required')
    .min(0, 'Penalty cannot be negative'),
  violationDate: Yup.date().required('Violation date is required'),
});

const defaultValues: FormValuesProps = {
  violator: '', // Empty string as default
  description: '', // Empty string as default
  penalty: 0, // Default penalty is 0
  violationDate: new Date(), // Default to current date
};

export default function ViolationCreateForm() {


  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ViolationSchema),
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
        Violation Create Form
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} alignContent={'center'} justifyContent={'center'}>
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">Information of the violation</Typography>


              <RHFTextField name="violator" label="Violator Name" />

              <RHFTextField name="description" rows={2} label="Description" />

              <RHFTextField
                name="penalty"
                label="Penalty"
                onChange={(event) =>
                  setValue('penalty', Number(event.target.value), { shouldValidate: true })
                }
                InputProps={{
                  type: 'number',
                }}
              />

              <Controller
                name="violationDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    label="Violation Date"
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
                to={PATH_ADMIN.violation.list}
              >
                Back to Violation List
              </Button>

              {/* Next Step Button */}
              <LoadingButton
                variant="contained"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                size='large'
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

// ----------------------------------------------------------------------

