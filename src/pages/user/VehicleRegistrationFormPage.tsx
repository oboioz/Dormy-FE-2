import { useNavigate } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
// redux
import { backStep, nextStep } from "../../redux/slices/registration";
import { useDispatch, useSelector } from "../../redux/store";
// sections
import { Helmet } from "react-helmet-async";
import { useSettingsContext } from "../../components/settings";
import VehicleRegistrationForm from "../../sections/myVehicle/VehicleRegistrationForm";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function VehicleRegistrationFormPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();
  // const request = useSelector((state) => state.vehicleRegistration);

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  return (
    <>
      <Helmet>
        <title> Registration | Vehicle</title>
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
        <VehicleRegistrationForm
          request={null}
          onNextStep={handleNextStep}
          onBackStep={handleBackStep}
        />
      </Container>
    </>
  );
}
