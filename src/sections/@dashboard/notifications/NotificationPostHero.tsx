// @mui
import { Box, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// hooks
// utils
import { fDate } from '../../../utils/formatTime';
// _mock
// @types
import { INotification } from '../../../@types/notification';
// components
import Image from '../../../components/image';


// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

const StyledTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h3,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    ...theme.typography.h2,
    padding: theme.spacing(5),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

const StyledFooter = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  post: INotification;
};

export default function NotificationPostHero({ post }: Props) {
  const { title, adminID, date } = post;

  const cover = 'https://source.unsplash.com/random';

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        borderRadius: {
          xs: `16px 16px 16px 16px`,
          md: `16px 16px 0 0`,
        },
      }}
    >
      <StyledTitle>{title}</StyledTitle>

      <StyledFooter>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {adminID}
            </Typography>

            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {fDate(date)}
            </Typography>
          </Box>
        </Box>
      </StyledFooter>

      <StyledOverlay />

      <Image alt="cover" src={cover} ratio="21/9" />
    </Box>
  );
}
