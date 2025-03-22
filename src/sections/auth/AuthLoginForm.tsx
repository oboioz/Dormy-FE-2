import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, IconButton, InputAdornment, Link, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import Iconify from "../../components/iconify";
import { PATH_AUTH, PATH_USER } from "../../routes/paths";
import { useAuthContext } from "../../auth/JwtContext";
import { httpClient } from "../../utils/axios";
import { toast } from "react-toastify";

type FormValuesProps = {
  username: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { signIn } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues: FormValuesProps = {
    username: "string",
    password: "22Mar2025",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema) as any,
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    var response = await httpClient.userSignIn({
      username: data.username,
      password: data.password,
    });

    if (response) {
      signIn({
        id: response.userInformation.userId,
        name: `${response.userInformation.firstName} ${response.userInformation.lastName}`,
        role: "user",
        token: response.accessToken,
      });
      toast.success(
        `Login success, hello ${response.userInformation.firstName} ${response.userInformation.lastName}`
      );
      navigate(PATH_USER.profile);
    } else {
      toast.error("Login failed, please check your username or password");
      reset();
      setError("afterSubmit", {
        message: "Username or password is incorrect",
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="username" label="Username" required />

        <RHFTextField
          name="password"
          label="Password"
          required
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
