import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  nextStep,
  backStep,
  resetForm,
} from '../../redux/slices/registration';
// sections
import {
  CheckoutCart,
  CheckoutSteps,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress,
} from '../../sections/@dashboard/e-commerce/checkout';
import GeneralInformationForm from '../../sections/registration/GeneralInformationForm';

// ----------------------------------------------------------------------

const STEPS = ['General Information', 'Guardian Information', 'Medical Information', 'Final Confirmation'];

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { activeStep } = useSelector((state) => state.registration);
  const { generalInformation, documents, } = useSelector((state) => state.registration.registrationInformation);
  const { guardian } = useSelector((state) => state.registration.registrationInformation.generalInformation.guardian);




  const completed = activeStep === STEPS.length;

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  const handleReset = () => {
    if (completed) {
      dispatch(resetForm());
      navigate(PATH_DASHBOARD.eCommerce.shop, { replace: true });
    }
  };

  return (
    <>
      {/* <Helmet>
        <title> Ecommerce: Checkout | Minimal UI</title>
      </Helmet> */}

      <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
        <Grid item xs={12} md={8}>
          <CheckoutSteps activeStep={activeStep} steps={STEPS} />
        </Grid>
      </Grid>

      {completed ? (
        <CheckoutOrderComplete open={completed} onDownloadPDF={() => { }} />
      ) : (
        <>
          {activeStep === 0 && (
            <GeneralInformationForm
              generalInformation={generalInformation}
              documents={documents}
              onNextStep={handleNextStep}
              onBackStep={handleBackStep}
            />
          )}
          {activeStep === 1 && (
            <CheckoutBillingAddress
              checkout={checkout}
              onNextStep={handleNextStep}
              onBackStep={handleBackStep}
            />
          )}
          {activeStep === 2 && billing && (
            <CheckoutPayment
              checkout={checkout}
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
