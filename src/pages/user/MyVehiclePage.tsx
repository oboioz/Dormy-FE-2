import { useParams } from 'react-router-dom';
// @mui
import { CardHeader, Container, Grid } from '@mui/material';
// routes
import { PATH_USER } from '../../routes/paths';
// _mock_
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import { Helmet } from 'react-helmet-async';
import { IAdmin } from '../../@types/admin';
import { IHistory, IVehicle } from '../../@types/vehicle';
import { useSettingsContext } from '../../components/settings';
import GarageWorkers from '../../sections/myVehicle/GarageWorkers';
import HistoryPartition from '../../sections/myVehicle/HistoryPartition';
import VehicleDetails from '../../sections/myVehicle/VehicleDetails';

// ----------------------------------------------------------------------


const mockAdmins: IAdmin[] = [
  {
    adminID: 1,
    password: 'securePass123',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    dateOfBirth: new Date('1985-04-12'),
    gender: 'Female',
    phoneNumber: '123-456-7890',
    jobTitle: 'System Administrator',
    workplaceID: 101,
    absenceID: 201,
    notificationID: 301,
    parkingSpotID: 401,
    imageURL: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    adminID: 2,
    password: 'strongPass456',
    firstName: 'Michael',
    lastName: 'Smith',
    email: 'michael.smith@example.com',
    dateOfBirth: new Date('1990-06-24'),
    gender: 'Male',
    phoneNumber: '987-654-3210',
    jobTitle: 'IT Manager',
    workplaceID: 102,
    absenceID: 202,
    notificationID: 302,
    parkingSpotID: 402,
    imageURL: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    adminID: 3,
    password: 'pass789Secure',
    firstName: 'Emily',
    lastname: 'Davis',
    email: 'emily.davis@example.com',
    dateOfBirth: new Date('1988-09-15'),
    gender: 'Female',
    phoneNumber: '555-123-4567',
    jobTitle: 'HR Administrator',
    workplaceID: 103,
    absenceID: 203,
    notificationID: 303,
    parkingSpotID: 403,
    imageURL: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

const mockVehicle: IVehicle = {
  vehicleID: 1,
  licensePlate: 'ABC-1234',
  type: 'Car',
  registrationDate: new Date('2023-05-15'),
  userID: 101,
  parkingSpot: {
    parkingSpotID: 401,
    spotNumber: 'A12',
    status: 'Occupied',
    adminID: 1,
  },
};

const mockHistory: IHistory[] = [
  {
    historyID: 1,
    vehicleID: 1,
    action: 'Entered',
    time: new Date('2023-06-01T08:00:00'),
    parkingSpotID: 401,
  },
  {
    historyID: 2,
    vehicleID: 1,
    action: 'Parked',
    time: new Date('2023-06-01T08:05:00'),
    parkingSpotID: 401,
  },
  {
    historyID: 3,
    vehicleID: 1,
    action: 'Exited',
    time: new Date('2023-06-01T17:30:00'),
    parkingSpotID: 401,
  },
  {
    historyID: 4,
    vehicleID: 1,
    action: 'Entered',
    time: new Date('2023-06-02T09:00:00'),
    parkingSpotID: 401,
  },
  {
    historyID: 5,
    vehicleID: 1,
    action: 'Parked',
    time: new Date('2023-06-02T09:10:00'),
    parkingSpotID: 401,
  },
  {
    historyID: 6,
    vehicleID: 1,
    action: 'Exited',
    time: new Date('2023-06-02T18:00:00'),
    parkingSpotID: 401,
  },
];




export default function MyVehiclePage() {
  const { vehicle } = useParams();
  const { history } = useParams();
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Room Details</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="My Vehicle"
          links={[
            {
              name: 'Dashboard',
              href: PATH_USER.root,
            },
            {
              name: 'User',
              href: PATH_USER.profile,
            },
            {
              name: 'Vehicle',
              href: PATH_USER.vehicle,
            },
          ]}
        />

        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <VehicleDetails vehicle={mockVehicle} />
          </Grid>

          <Grid item xs={12} md={4}>
            <HistoryPartition histories={mockHistory} />
          </Grid>
        </Grid>

        <CardHeader title={'Garages workers'} sx={{ mb: 3 }} />


        <GarageWorkers workers={mockAdmins} />

      </Container>
    </>
  );
}
