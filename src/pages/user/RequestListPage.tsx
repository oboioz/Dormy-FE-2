
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
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  TableHeadCustom,
  TablePaginationCustom,
  useTable,
} from '../../components/table';
import { fDate } from '../../utils/formatTime';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Request ID', align: 'left' },
  { id: 'type', label: 'Request Type', align: 'left' },
  { id: 'createdAt', label: 'Created At', align: 'left' },
  { id: 'sender', label: 'Sender', align: 'left' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'status', label: 'Status', align: 'left' },
];

export const mockRequests = [
  {
    id: 1,
    type: 'Maintenance',
    createdAt: new Date('2024-10-01T10:30:00'),
    sender: 'John Doe',
    description: 'Air conditioner is not working.',
    status: 'Pending',
  },
  {
    id: 2,
    type: 'Room Change',
    createdAt: new Date('2024-10-02T14:15:00'),
    sender: 'Jane Smith',
    description: 'Request to change room due to noisy environment.',
    status: 'Approved',
  },
  {
    id: 3,
    type: 'Repair',
    createdAt: new Date('2024-10-03T09:00:00'),
    sender: 'Michael Johnson',
    description: 'Broken window in room 203.',
    status: 'In Progress',
  },
  {
    id: 4,
    type: 'Cleaning',
    createdAt: new Date('2024-10-04T11:45:00'),
    sender: 'Emily Davis',
    description: 'Request for deep cleaning in common area.',
    status: 'Completed',
  },
];



// ----------------------------------------------------------------------

export default function RequestListPage() {
  const {
    page,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();



  return (
    <>
      {/* <Helmet>
        <title>Contract List</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Request List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.user.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Make a request
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
                  {mockRequests.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{fDate(row.createdAt)}</TableCell>
                      <TableCell align="center">{row.sender}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
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


          <TablePaginationCustom
            count={mockRequests.length}
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