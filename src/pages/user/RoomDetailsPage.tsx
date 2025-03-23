import { useParams } from 'react-router-dom';
// @mui
import { CardHeader, Container } from '@mui/material';

// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import { Helmet } from 'react-helmet-async';
import { IRoom } from '../../@types/room';
import { useSettingsContext } from '../../components/settings';
import { PATH_USER } from '../../routes/paths';
import RoomDetails from '../../sections/roomdetails/RoomDetails';
import RoomateInformation from '../../sections/roomdetails/RoomateInformation';
import { useAuthGuard } from '../../auth/AuthGuard';
import { UserRole } from '../../models/enums/DormyEnums';

// ----------------------------------------------------------------------


const mockRoomData: IRoom = {
  roomID: 101,
  roomNumber: '12',
  floorNumber: 3,
  roomType: {
    roomTypeID: 1,
    roomTypeName: 'Deluxe',
    description: 'Spacious room with premium amenities.',
    capacity: 4,
    price: 2000000, // Represented in VND (Vietnamese Dong)
  },
  totalUsedBed: 2,
  totalAvailableBed: 4,
  status: 'Available',
  building: {
    buildingID: 1,
    name: 'Sunrise Tower',
    floorNumber: 10,
    genderRestriction: 'Female',
    roomID: 101, // Matches the roomID for foreign key reference
  },
};


export default function RoomDetailsPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { id } = useParams();
  const { arr } = useParams();

  const currentRoom = id;

  const currentRoommates = arr;

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Room Details</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Room Details"
          links={[
            { name: 'Dashboard', href: PATH_USER.root },
            {
              name: 'User',
              href: PATH_USER.profile,
            },
            { name: `ROOM-${id}` },
          ]}
        />

        <RoomDetails room={mockRoomData} />

        <CardHeader title={'Roomate Information'} sx={{ mb: 3 }} />


        <RoomateInformation roommate={currentRoommates} />

      </Container>
    </>
  );
}
