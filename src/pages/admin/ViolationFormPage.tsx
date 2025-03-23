import { useNavigate } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
// redux
import { useDispatch } from "../../redux/store";
// sections
import { useSettingsContext } from "../../components/settings";

import { Helmet } from "react-helmet-async";
import ViolationCreateForm from "../../sections/@dashboard/admin/violation/ViolationCreateForm";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ViolationFormPage() {
  useAuthGuard(UserRole.ADMIN);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Form | Violation</title>
      </Helmet>

      <Container
        maxWidth={themeStretch ? false : "lg"}
        sx={{
          pt: 15,
          pb: 10,
          // flexDirection: 'column',
          // alignItems: 'center', // Centers horizontally
          // justifyContent: 'center', // Centers vertically
          minHeight: "100vh", // Ensures full viewport height for vertical centering
        }}
      >
        <ViolationCreateForm />
      </Container>
    </>
  );
}
