// @mui
import { Box, Button, Container, Typography } from '@mui/material';
// sections
import DocumentRequirement from '../../sections/registration/DocumentRequirement';
import PricingListing from '../../sections/registration/PricingListing';
import RegistrationProcess from '../../sections/registration/RegistrationProcess';

// ----------------------------------------------------------------------

export default function RegistrationPolicyPage() {

  return (
    <>
      {/* <Helmet>
        <title> Payment | Minimal UI</title>
      </Helmet> */}

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          {`Let's finish powering you up!`}
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Professional plan is right for you.
        </Typography>
      </Container>

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <DocumentRequirement />
          <RegistrationProcess />
        </Box>
      </Container>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <PricingListing />
      </Container>

      <Button
        variant="contained"
      >
        New Product
      </Button>
    </>
  );
}
