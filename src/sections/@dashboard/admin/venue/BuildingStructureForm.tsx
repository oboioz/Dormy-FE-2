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
  genderRestriction: string;
  name: string;
  totalFloor: number;
};

const UpdateSchema = Yup.object().shape({
  genderRestriction: Yup.string().nullable().required('Gender is required'),
  name: Yup.string().nullable().required('Name is required'),
  totalFloor: Yup.number().required('Reason is required!').min(1, 'Mininum value is >= 1'),
});

const defaultValues: FormValuesProps = {
  genderRestriction: '',
  name: '',
  totalFloor: 1,
};

export default function BuildingStructureForm() {


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
        Building Structure
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} alignContent={'center'} justifyContent={'center'}>
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">Information of the Building</Typography>

              <RHFSelect name="genderRestriction" label="Gender">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField name="name" label="Building Name" />
              <RHFTextField
                name="totalFloor"
                label="Floor"
                onChange={(event) =>
                  setValue('totalFloor', Number(event.target.value), { shouldValidate: true })
                }
                InputProps={{
                  type: 'number',
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
                size='large'
                component={RouterLink} // Use RouterLink for navigation
                to={PATH_ADMIN.dormitory.structure}
              >
                Back to Building
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

