// @mui
import { Button, Container, Divider, Grid, MenuItem, Stack, Typography } from '@mui/material';
// @types
// _mock
// components
//
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { IUser } from '../../@types/user';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { RHFSelect } from '../../components/hook-form/RHFSelect';
import Iconify from '../../components/iconify';


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
  generalInformation: IUser;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction
};

type FormValuesProps = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  relationshipToUser: string;
};

const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .required('First name is required')
    .min(6, 'Mininum 6 characters')
    .max(32, 'Maximum 32 characters'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  phoneNumber: Yup.string().required('Phone number is required!'),
  address: Yup.string().required('Address is required!'),
  relationshipToUser: Yup.string().required('Relationship is required!'),
});

const defaultValues: FormValuesProps = {
  name: '',
  email: '',
  phoneNumber: '',
  address: '',
  relationshipToUser: '',
};

export default function GuardianInformationForm({ generalInformation, onNextStep, onBackStep }: Props) {

  const { guardian } = generalInformation.guardian


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
        Please fill in all the guardian information
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} alignContent={'center'} justifyContent={'center'}>
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">Guardian Information</Typography>

              <RHFTextField name="name" label="Name" />

              <RHFTextField name="email" label="Email address" />

              <RHFTextField name="phoneNumber" label="Phone Number" />


              <RHFTextField name="address" label="Address" />



              <RHFSelect name="relationshipToUser" label="Relationship To User">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>



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
                onClick={onBackStep} // Change this based on your path
                size='large'
              >
                Back Step
              </Button>

              {/* Next Step Button */}
              <Button
                variant="contained"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                onClick={onNextStep} // Change this based on your path
                size='large'
              >
                Next Step
              </Button>
            </Stack>

          </Container>

        </Grid>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

