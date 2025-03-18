// @mui
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
// sections
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../components/iconify';
import { PATH_AUTH, PATH_REGISTER } from '../../routes/paths';
import DocumentRequirement from '../../sections/registration/DocumentRequirement';
import PricingListing from '../../sections/registration/PricingListing';
import RegistrationProcess from '../../sections/registration/RegistrationProcess';

// ----------------------------------------------------------------------

export default function RegistrationPolicyPage() {

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Policy | Registration</title>
      </Helmet>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          // minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          {`Trang thông tin dành cho tân sinh viên đăng ký ở ký túc xá năm 2024 - 2025`}
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Ban hành kèm theo Thông báo số 546/TB-TTQLKTX ngày 22 tháng 8 năm 2024 của Trung tâm quản lý ký túc xá

          <Box sx={{ mt: 2 }}>
            <Link>(Tải file đầy đủ tại đây)</Link>
          </Box>
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
          // minHeight: 1,
        }}
      >
        <PricingListing />
      </Container>


      <Container
        sx={{
          pt: 15,
          pb: 10,
        }}
      >
        {/* Back to Login Button */}
        <Stack spacing={3} direction="row" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => navigate(PATH_AUTH.login)} // Change this based on your path
            size='large'
          >
            Back to Login
          </Button>

          {/* Next Step Button */}
          <Button
            variant="contained"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            onClick={() => navigate(PATH_REGISTER.email)} // Change this based on your path
            size='large'
          >
            Next Step
          </Button>
        </Stack>

      </Container>
    </>
  );
}
