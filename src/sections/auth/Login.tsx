import { Alert, Button, Link, Stack, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';


import DashboardLayout from "../../layouts/dashboard";
import LoginLayout from "../../layouts/login";
import AuthLoginForm from "./AuthLoginForm";

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Sign in to Dormy</Typography>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :
        <strong> demo1234</strong>
      </Alert>

      <AuthLoginForm />

      <Divider sx={{ my: 3 }} />

      <Button
        fullWidth
        color="primary"
        size="large"
        component={Link}
        to={DashboardLayout}
        variant="outlined"
      >
        Register
      </Button>

      {/* <AuthWithSocial /> */}
    </LoginLayout >
  );
}
