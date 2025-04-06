import { useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
// redux
import {
  backStep,
  nextStep,
} from '../../redux/slices/registration';
import { useDispatch, useSelector } from '../../redux/store';
// sections
import { useSettingsContext } from '../../components/settings';
import GeneralInformationForm from '../../sections/registration/GeneralInformationForm';
import GuardianInformationForm from '../../sections/registration/GuardianInformationForm';
import MedicalInformationForm from '../../sections/registration/RoomPickingForm';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function RegistrationPreviewPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  const { generalInformation, documents, } = useSelector((state) => state.registration.registrationInformation);



  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  return (
    <>
      {/* <Helmet>
        <title> Ecommerce: Checkout | Minimal UI</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <>

          <GeneralInformationForm
            generalInformation={generalInformation}
            documents={documents}
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
          />

          <GuardianInformationForm
            generalInformation={generalInformation}
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
          />

          <MedicalInformationForm
            generalInformation={generalInformation}
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
          />
        </>
      </Container >
    </>
  );
}
