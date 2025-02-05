import { useParams } from 'react-router-dom';
// @mui
import { CardHeader, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import { IRoom } from '../../@types/room';
import RoomDetails from '../../sections/roomdetails/RoomDetails';
import RoomateInformation from '../../sections/roomdetails/RoomateInformation';

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
  const { id } = useParams();
  const { arr } = useParams();

  const currentRoom = id;

  const currentRoommates = arr;

  return (
    <>
      {/* <Helmet>
        <title> Room Details</title>
      </Helmet> */}

      <Container maxWidth={'lg'}>
        <CustomBreadcrumbs
          heading="Room Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Room',
              href: PATH_DASHBOARD.invoice.root,
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
