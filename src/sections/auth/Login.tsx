import { Alert, Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import { Link as RouterLink } from "react-router-dom";
import LoginLayout from "../../layouts/login";
import { PATH_REGISTER } from "../../routes/paths";
import AuthLoginForm from "./AuthLoginForm";

export default function Login() {
  return (
    <LoginLayout>
      <Typography variant="h4">Sign in to Dormy</Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Your username is <strong>phone number</strong> which you provide for us.
        Your default password bases on <strong>date of birth</strong> and follows by format them into a string (like <strong>03May2025</strong>)
      </Alert>

      <AuthLoginForm />

      <Divider sx={{ my: 3 }} />

      <Button
        fullWidth
        color="primary"
        size="large"
        component={RouterLink} // Use RouterLink for navigation
        to={PATH_REGISTER.form} // Navigate to register policy page
        variant="outlined"
      >
        Register
      </Button>

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
