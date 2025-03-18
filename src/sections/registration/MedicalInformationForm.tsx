// @mui
import { Button, Container, Divider, FormHelperText, Grid, MenuItem, Stack, StackProps, Typography } from '@mui/material';
// @types
// _mock
// components
//
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { IUser } from '../../@types/user';
import FormProvider from '../../components/hook-form';
import RHFCodes from '../../components/hook-form/RHFCodes';
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
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  code7: string;
  code8: string;
  code9: string;
  code10: string;
  code11: string;
  code12: string;
  code13: string;
  code14: string;
  code15: string;
  city: string;
  hospital: string;
};

const UpdateSchema = Yup.object().shape({
  code1: Yup.string().required('Code is required'),
  code2: Yup.string().required('Code is required'),
  code3: Yup.string().required('Code is required'),
  code4: Yup.string().required('Code is required'),
  code5: Yup.string().required('Code is required'),
  code6: Yup.string().required('Code is required'),
  code7: Yup.string().required('Code is required'),
  code8: Yup.string().required('Code is required'),
  code9: Yup.string().required('Code is required'),
  code10: Yup.string().required('Code is required'),
  code11: Yup.string().required('Code is required'),
  code12: Yup.string().required('Code is required'),
  code13: Yup.string().required('Code is required'),
  code14: Yup.string().required('Code is required'),
  code15: Yup.string().required('Code is required'),

  city: Yup.string().required('City is required!'),
  hospital: Yup.string().required('Hospital is required!'),
});

const defaultValues: FormValuesProps = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
  code5: '',
  code6: '',
  code7: '',
  code8: '',
  code9: '',
  code10: '',
  code11: '',
  code12: '',
  code13: '',
  code14: '',
  code15: '',
  city: '',
  hospital: '',
};

export default function MedicalInformationForm({ generalInformation, onNextStep, onBackStep }: Props) {

  const { medical } = generalInformation.healthInsurance


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
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('DATA', data);
    reset();
  };


  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 5 }}>
        Please fill in all the health insurance information
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} alignContent={'center'} justifyContent={'center'}>
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              <Typography variant="h6">Health Information Information</Typography>

              <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6', 'code7', 'code8', 'code9', 'code10', 'code11', 'code12', 'code13', 'code14', 'code15']} />

              {(!!errors.code1 ||
                !!errors.code2 ||
                !!errors.code3 ||
                !!errors.code4 ||
                !!errors.code5 ||
                !!errors.code6 ||
                !!errors.code7 ||
                !!errors.code8 ||
                !!errors.code9 ||
                !!errors.code10 ||
                !!errors.code11 ||
                !!errors.code12 ||
                !!errors.code13 ||
                !!errors.code14 ||
                !!errors.code15) && (
                  <FormHelperText error sx={{ px: 2 }}>
                    Code is required
                  </FormHelperText>
                )}


              <RHFSelect name="city" label="City">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>


              <RHFSelect name="hospital" label="Hospital">
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

interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

function Block({ label = 'RHFTextField', sx, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'right',
          fontStyle: 'italic',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
