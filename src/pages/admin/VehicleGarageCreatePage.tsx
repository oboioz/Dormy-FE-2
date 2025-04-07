import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useDispatch } from "../../redux/store";
import { useSettingsContext } from "../../components/settings";
import { Helmet } from "react-helmet-async";
import GarageCreateForm from "../../sections/@dashboard/admin/garage/GarageCreateForm";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";

export default function VehicleGarageCreatePage() {
  useAuthGuard(UserRole.ADMIN);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Form | Parking Spot</title>
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
        <GarageCreateForm />
      </Container>
    </>
  );
}
