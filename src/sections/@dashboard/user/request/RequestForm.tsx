// @mui
import { Button, Container, Divider, Grid, MenuItem, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from "yup";
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { RHFSelect } from '../../../../components/hook-form/RHFSelect';
import Iconify from '../../../../components/iconify';
import { PATH_USER } from '../../../../routes/paths';


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
  typeOfRequest: string;
  reason: string;
};

const UpdateSchema = Yup.object().shape({
  typeOfRequest: Yup.string().required('Type of Request is required!'),
  reason: Yup.string().required('Reason is required!'),
});

const defaultValues: FormValuesProps = {
  typeOfRequest: '',
  reason: '',
};

export default function RequestForm() {


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
              <Typography variant="h6">Request Form</Typography>



              <RHFSelect name="typeOfRequest" label="Type Of Request">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

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
                to={PATH_USER.request}
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

