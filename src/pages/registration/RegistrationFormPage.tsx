import { useNavigate } from "react-router-dom";
// @mui
import { Container, Grid } from "@mui/material";
// routes
// redux
import { backStep, nextStep, resetForm } from "../../redux/slices/registration";
import { useDispatch, useSelector } from "../../redux/store";
// sections
import { useSettingsContext } from "../../components/settings";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import GeneralInformationForm from "../../sections/registration/GeneralInformationForm";
import GuardianInformationForm from "../../sections/registration/GuardianInformationForm";
import RoomPickingForm from "../../sections/registration/RoomPickingForm";
import RegistrationConfirm from "../../sections/registration/RegistrationConfirm";
import RegistrationComplete from "../../sections/registration/RegistrationComplete";
import RegistrationSteps from "../../sections/registration/RegistrationSteps";
import { httpClient } from "../../services";
import { IEnumModel } from "../../models/responses/EnumModels";
import { WorkplaceOptionModel } from "../../models/responses/WorkplaceModels";
import { RoomTypeOptionModel } from "../../models/responses/RoomTypeModels";

// ----------------------------------------------------------------------

// const STEPS = ['General Information', 'Guardian Information', 'Medical Information'];
const STEPS = [
  "Room Picking",
  "General Information",
  "Relative Information",
  "Confirmation Information",
];

// ----------------------------------------------------------------------

export default function RegistrationFormPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  const { activeStep } = useSelector((state) => state.registration);
  const { generalInformation, documents } = useSelector(
    (state) => state.registration.registrationInformation
  );
  const [genderEnums, setGenderEnums] = useState<IEnumModel[]>([]);
  const [relationshipEnums, setRelationshipEnums] = useState<IEnumModel[]>([]);
  const [workplaceOptions, setWorkplaceOptions] = useState<
    WorkplaceOptionModel[]
  >([]);
  const [roomTypeOptions, setRoomTypeOptions] = useState<RoomTypeOptionModel[]>(
    []
  );

  const getInitialRegistrationData = async () => {
    var response =
      await httpClient.registrationService.getInitialRegistrationData();

    setGenderEnums(response?.genderEnums || []);
    setRelationshipEnums(response?.relationshipEnums || []);
    setWorkplaceOptions(response?.listWorkplaces || []);
    setRoomTypeOptions(response?.listRoomTypes || []);
  };

  useEffect(() => {
    // get initial data
    dispatch(resetForm());
    getInitialRegistrationData();
  }, []);

  const completed = activeStep === STEPS.length;

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (completed) setOpen(true);
  }, [completed]);

  return (
    <>
      <Helmet>
        <title> Form | Registration</title>
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
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} md={8}>
            <RegistrationSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        {completed ? (
          <RegistrationComplete
            open={open}
            onClose={() => setOpen(false)}
            phoneNumber={generalInformation.userState.phoneNumber}
            dateOfBirth={generalInformation.userState.dateOfBirth}
          />
        ) : (
          <>
            {activeStep === 0 && (
              <RoomPickingForm
                generalInformation={generalInformation}
                genderEnums={genderEnums}
                roomTypeOptions={roomTypeOptions}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
              />
            )}

            {activeStep === 1 && (
              <GeneralInformationForm
                generalInformation={generalInformation}
                genderEnums={genderEnums}
                workplaceOptions={workplaceOptions}
                documents={documents}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
              />
            )}
            {activeStep === 2 && (
              <GuardianInformationForm
                generalInformation={generalInformation}
                relationshipEnums={relationshipEnums}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
              />
            )}
            {activeStep === 3 && (
              <RegistrationConfirm
                generalInformation={generalInformation}
                genderEnums={genderEnums}
                relationshipEnums={relationshipEnums}
                workplaceOptions={workplaceOptions}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}
