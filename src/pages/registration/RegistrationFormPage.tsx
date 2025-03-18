import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Grid } from '@mui/material';
// routes
// redux
import {
  backStep,
  nextStep,
} from '../../redux/slices/registration';
import { useDispatch, useSelector } from '../../redux/store';
// sections
import { useSettingsContext } from '../../components/settings';

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GeneralInformationForm from '../../sections/registration/GeneralInformationForm';
import GuardianInformationForm from '../../sections/registration/GuardianInformationForm';
import MedicalInformationForm from '../../sections/registration/MedicalInformationForm';
import RegistrationComplete from '../../sections/registration/RegistrationComplete';
import RegistrationSteps from '../../sections/registration/RegistrationSteps';

// ----------------------------------------------------------------------

const STEPS = ['General Information', 'Guardian Information', 'Medical Information'];

// ----------------------------------------------------------------------

export default function RegistrationFormPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  const { activeStep } = useSelector((state) => state.registration);
  const { generalInformation, documents, } = useSelector((state) => state.registration.registrationInformation);




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

      <Container maxWidth={themeStretch ? false : 'lg'}
        sx={{
          pt: 15,
          pb: 10,
          // flexDirection: 'column',
          // alignItems: 'center', // Centers horizontally
          // justifyContent: 'center', // Centers vertically
          minHeight: '100vh', // Ensures full viewport height for vertical centering
        }}
      >
        <Grid container justifyContent={'center'}>
          <Grid item xs={12} md={8}>
            <RegistrationSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        {completed ? (
          <RegistrationComplete open={open} onClose={() => setOpen(false)} />
        ) : (
          <>
            {activeStep === 0 && (
              <GeneralInformationForm
                generalInformation={generalInformation}
                documents={documents}
                onNextStep={handleNextStep}
              // onBackStep={handleBackStep}
              />
            )}
            {activeStep === 1 && (
              <GuardianInformationForm
                generalInformation={generalInformation}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
              />
            )}
            {activeStep === 2 && (
              <MedicalInformationForm
                generalInformation={generalInformation}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
              />
            )}
          </>
        )}
      </Container >
    </>
  );
}
