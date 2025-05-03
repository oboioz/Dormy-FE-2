import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
// routes
import { PATH_AUTH } from "../../routes/paths";
// components
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { httpClient } from "../../services";
import { HttpStatusCode } from "axios";
import { toast, ToastContainer } from "react-toastify";

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function AuthResetPasswordForm() {
  const navigate = useNavigate();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema) as any,
    defaultValues: { email: "demo@minimals.cc" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      var response = await httpClient.authService.forgotPassword({
        email: data.email,
      });
      if (response === HttpStatusCode.Ok) {
        toast.success(
          `Check your email: ${data.email} for the reset password.`
        );
        navigate(PATH_AUTH.login);
      } else if (response === HttpStatusCode.NotFound) {
        toast.error("Email not found");
      } else {
        toast.error("An error occurred while sending the reset password link");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Send Reset Password Email
        </LoadingButton>
      </FormProvider>
    </>
  );
}
