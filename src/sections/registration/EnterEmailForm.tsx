import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function EnterEmailForm() {
  const navigate = useNavigate();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const onSubmit = async (data: FormValuesProps) => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     sessionStorage.setItem('email-recovery', data.email);
  //     navigate(PATH_AUTH.newPassword);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <FormProvider methods={methods}>
      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        // loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Continue
      </LoadingButton>
    </FormProvider>
  );
}
