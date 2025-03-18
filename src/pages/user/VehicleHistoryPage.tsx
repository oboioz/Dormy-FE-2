
// @mui
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
// components
import { Helmet } from 'react-helmet-async';
import { IHistory } from '../../@types/vehicle';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  TableHeadCustom,
  TablePaginationCustom,
  useTable,
} from '../../components/table';
import { PATH_USER } from '../../routes/paths';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'vehicleID', label: 'Vehicle ID', align: 'left' },
  { id: 'vehicleBrand', label: 'Vehicle Brand', align: 'left' },
  { id: 'licensePlate', label: 'License Plate', align: 'center' },
  { id: 'garage', label: 'Garage', align: 'left' },
  { id: 'date', label: 'Date', align: 'left' },
  { id: 'activity', label: 'Activity', align: 'left' },
];


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

// ----------------------------------------------------------------------

export default function ContractListPage() {
  const {
    page,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();



  return (
    <>
      <Helmet>
        <title>History | Vehicle</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Entrance/Depart History"
          links={[
            { name: 'Dashboard', href: PATH_USER.root },
            { name: 'User', href: PATH_USER.profile },
            { name: 'Vehicle', href: PATH_USER.vehicle },
            { name: 'History' },
          ]}
        />

        <Card>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

            <Scrollbar>
              <Table size={'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                // rowCount={tableData.length}
                />

                <TableBody>
                  {mockHistory.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell align="left">{row.vehicleID}</TableCell>
                      <TableCell align="left">{"Honda"}</TableCell>
                      <TableCell align="left">{"67AB-12345"}</TableCell>
                      <TableCell align="center">{row.parkingSpotID}</TableCell>
                      <TableCell align="left">row.time</TableCell>
                      <TableCell align="left">
                        <Label
                          variant="soft"
                          color={(row.action === 'Active' && 'success') || 'error'}
                          sx={{ textTransform: 'capitalize' }}
                        >
                          {row.action}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={mockHistory.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />

        </Card>
      </Container>

    </>
  );
}

// ----------------------------------------------------------------------