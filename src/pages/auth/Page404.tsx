import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography } from '@mui/material';
import { MotionContainer, varBounce } from '../../components/animate';

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      {/* <Helmet>
        <title> 404 Page Not Found | Minimal UI</title>
      </Helmet> */}

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>
        </m.div>

        <Button component={RouterLink} to="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </>
  );
}
