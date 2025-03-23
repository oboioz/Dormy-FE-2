
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  TableHeadCustom,
  useTable,
} from '../../components/table';
import { PATH_REGISTER, PATH_USER } from '../../routes/paths';
import { useAuthGuard } from '../../auth/AuthGuard';
import { UserRole } from '../../models/enums/DormyEnums';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'contractID', label: 'ID', align: 'left' },
  { id: 'createdAt', label: 'Created At', align: 'left' },
  { id: 'room', label: 'Room', align: 'left' },
  { id: 'roomType', label: 'Room Type', align: 'center' },
  { id: 'roomID', label: 'room ID', align: 'left' },
  { id: 'semester', label: 'Semester', align: 'left' },
  { id: 'startDate', label: 'Start Date', align: 'left' },
  { id: 'endDate', label: 'End Date', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
];


const MOCK_DATA = [
  {
    contractID: 'C001',
    createdAt: '2025-01-01',
    room: 'A101',
    roomType: 'Single',
    roomID: 'R101',
    semester: 'Spring 2025',
    startDate: '2025-01-10',
    endDate: '2025-05-15',
    status: 'Active',
  },
  {
    contractID: 'C002',
    createdAt: '2025-01-05',
    room: 'B202',
    roomType: 'Double',
    roomID: 'R202',
    semester: 'Spring 2025',
    startDate: '2025-01-12',
    endDate: '2025-05-20',
    status: 'Pending',
  },
  {
    contractID: 'C003',
    createdAt: '2025-01-08',
    room: 'C303',
    roomType: 'Triple',
    roomID: 'R303',
    semester: 'Fall 2024',
    startDate: '2024-09-01',
    endDate: '2024-12-20',
    status: 'Completed',
  },
  {
    contractID: 'C004',
    createdAt: '2025-01-10',
    room: 'D404',
    roomType: 'Single',
    roomID: 'R404',
    semester: 'Spring 2025',
    startDate: '2025-01-15',
    endDate: '2025-06-01',
    status: 'Cancelled',
  },
  {
    contractID: 'C005',
    createdAt: '2025-01-12',
    room: 'E505',
    roomType: 'Quad',
    roomID: 'R505',
    semester: 'Spring 2025',
    startDate: '2025-01-20',
    endDate: '2025-05-25',
    status: 'Active',
  },
  {
    contractID: 'C006',
    createdAt: '2025-01-15',
    room: 'F606',
    roomType: 'Double',
    roomID: 'R606',
    semester: 'Summer 2025',
    startDate: '2025-06-15',
    endDate: '2025-08-20',
    status: 'Pending',
  },
  {
    contractID: 'C007',
    createdAt: '2025-01-20',
    room: 'G707',
    roomType: 'Triple',
    roomID: 'R707',
    semester: 'Fall 2025',
    startDate: '2025-09-01',
    endDate: '2025-12-15',
    status: 'Active',
  },
  {
    contractID: 'C008',
    createdAt: '2025-01-25',
    room: 'H808',
    roomType: 'Single',
    roomID: 'R808',
    semester: 'Spring 2025',
    startDate: '2025-01-30',
    endDate: '2025-06-05',
    status: 'Completed',
  },
  {
    contractID: 'C009',
    createdAt: '2025-01-30',
    room: 'I909',
    roomType: 'Quad',
    roomID: 'R909',
    semester: 'Spring 2025',
    startDate: '2025-02-05',
    endDate: '2025-06-10',
    status: 'Cancelled',
  },
  {
    contractID: 'C010',
    createdAt: '2025-02-01',
    room: 'J1010',
    roomType: 'Double',
    roomID: 'R1010',
    semester: 'Summer 2025',
    startDate: '2025-06-01',
    endDate: '2025-08-15',
    status: 'Pending',
  },
];

// ----------------------------------------------------------------------

export default function ContractListPage() {
  useAuthGuard(UserRole.CUSTOMER);
  const {
    page,
  } = useTable();

  const { themeStretch } = useSettingsContext();



  return (
    <>
      {/* <Helmet>
        <title>Contract List</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Contract List"
          links={[
            { name: 'Dashboard', href: PATH_USER.root },
            { name: 'User', href: PATH_USER.profile },
            { name: 'Contract' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_REGISTER.policy}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Extend Contract
            </Button>
          }
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
                  {MOCK_DATA.map((row, index) => (
                    <TableRow hover key={row.contractID}>
                      <TableCell align="left">{row.contractID}</TableCell>
                      <TableCell align="left">{row.createdAt}</TableCell>
                      <TableCell align="left">{row.room}</TableCell>
                      <TableCell align="center">{row.roomType}</TableCell>
                      <TableCell align="left">{row.roomID}</TableCell>
                      <TableCell align="left">{row.semester}</TableCell>
                      <TableCell align="left">{row.startDate}</TableCell>
                      <TableCell align="left">{row.endDate}</TableCell>
                      <TableCell align="left">
                        <Label
                          variant="soft"
                          color={(row.status === 'Active' && 'success') || 'error'}
                          sx={{ textTransform: 'capitalize' }}
                        >
                          {row.status}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

        </Card>
      </Container>

    </>
  );
}

// ----------------------------------------------------------------------