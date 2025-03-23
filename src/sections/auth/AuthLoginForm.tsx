import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import Iconify from "../../components/iconify";
import { PATH_ADMIN, PATH_AUTH, PATH_USER } from "../../routes/paths";
import { useAuthContext } from "../../auth/JwtContext";
import { toast } from "react-toastify";
import { UserRole } from "../../models/enums/DormyEnums";
// import { httpClient } from "../../utils/axios";
import { httpClient } from "../../services";

type FormValuesProps = {
  username: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const userSignIn = async (data: FormValuesProps) => {
    var response = await httpClient.authService.userSignIn({
      username: data.username,
      password: data.password,
    });

    if (response) {
      signIn({
        id: response.userInformation.userId,
        name: `${response.userInformation.firstName} ${response.userInformation.lastName}`,
        role: UserRole.CUSTOMER,
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

  const adminSignIn = async (data: FormValuesProps) => {
    var response = await httpClient.authService.adminSignIn({
      username: data.username,
      password: data.password,
    });

    if (response) {
      signIn({
        id: response.adminInformation.id,
        name: `${response.adminInformation.firstName} ${response.adminInformation.lastName}`,
        role: UserRole.ADMIN,
        token: response.accessToken,
      });
      toast.success(
        `Login success, hello admin ${response.adminInformation.firstName} ${response.adminInformation.lastName}`
      );
      navigate(PATH_ADMIN.dashboard);
    } else {
      toast.error("Login failed, please check your username or password");
      reset();
      setError("afterSubmit", {
        message: "Username or password is incorrect",
      });
    }
  };

  const onSubmit = async (data: FormValuesProps) => {
    if (isAdmin) {
      await adminSignIn(data);
    } else {
      await userSignIn(data);
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

      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        sx={{ my: 2 }}
      >
        <FormGroup sx={{ marginTop: "-10px" }}>
          <FormControlLabel
            sx={{
              marginLeft: 0,
            }}
            label={
              <Typography variant="body1" fontWeight={"bold"}>
                I'm Admin
              </Typography>
            }
            labelPlacement="start"
            control={
              <Checkbox
                color="success"
                checked={isAdmin}
                onChange={(evt) => setIsAdmin(evt.target.checked)}
              />
            }
          />
        </FormGroup>
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
