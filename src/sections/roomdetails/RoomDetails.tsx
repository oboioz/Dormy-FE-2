// @mui
import {
  Grid,
  TableRow,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// _mock_
// components
//
import { IRoom } from '../../@types/room';

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  room?: IRoom;
};


export default function RoomDetails({ room }: Props) {

  if (!room) {
    return null;
  }

  const {
    roomID,
    roomNumber,
    floorNumber,
    roomType,
    totalUsedBed,
    totalAvailableBed,
    status,
    building,
  } = room;

  return (
    <>


      <Grid container>
        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
          <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
            General
          </Typography>

          <Typography variant="body2">Block: {building.name}</Typography>

          <Typography variant="body2">Gender: {building.genderRestriction}</Typography>

          <Typography variant="body2">Room: {floorNumber}.{roomNumber}</Typography>
          <Typography variant="body2">Bed: {totalUsedBed}/{totalAvailableBed}</Typography>
          <Typography variant="body2">Price: {roomType.price}VND/person/month</Typography>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
          <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
            Equipment
          </Typography>

          <Typography variant="subtitle2">Room type: {roomType.roomTypeName}</Typography>

          <Typography variant="body2">{roomType.description}</Typography>

          <Typography variant="body2">{roomType.description}</Typography>

          <Typography variant="body2">{roomType.description}</Typography>
        </Grid>

      </Grid>











    </>
  );
}
