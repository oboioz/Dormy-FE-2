import { Alert, Tooltip, Stack, Typography, Link, Box } from "@mui/material";
import LoginLayout from "../../layouts/login";
import AuthLoginForm from "./AuthLoginForm";

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Sign in to Minimal</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link variant="subtitle2">Create an account</Link>
        </Stack>

        <Tooltip title={"login"} placement="left">
          <Box
            component="img"
            alt={"login"}
            src={`/assets/icons/auth/ic_${"login"}.png`}
            sx={{ width: 32, height: 32, position: "absolute", right: 0 }}
          />
        </Tooltip>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :
        <strong> demo1234</strong>
      </Alert>

      <AuthLoginForm />

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
