
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
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  TableHeadCustom,
  useTable,
} from '../../components/table';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'order', label: '#', align: 'middle' },
  { id: 'fullName', label: 'Full Name', align: 'left' },
  { id: 'bed', label: 'Bed', align: 'left' },
  { id: 'dayOfBirth', label: 'Birth Year', align: 'center' },
  { id: 'workplace', label: 'Workplace', align: 'left' },
  { id: 'phoneNumber', label: 'Phone Number', align: 'left' },
];

const MOCK_DATA = [
  {
    order: 1,
    fullName: 'John Doe',
    bed: 'A1',
    dayOfBirth: 1985,
    workplace: 'TechCorp Inc.',
    phoneNumber: '123-456-7890',
  },
  {
    order: 2,
    fullName: 'Jane Smith',
    bed: 'B2',
    dayOfBirth: 1990,
    workplace: 'HealthCare Solutions',
    phoneNumber: '987-654-3210',
  },
  {
    order: 3,
    fullName: 'Alice Johnson',
    bed: 'C3',
    dayOfBirth: 1992,
    workplace: 'Global Finance Ltd.',
    phoneNumber: '555-123-4567',
  },
  {
    order: 4,
    fullName: 'Robert Brown',
    bed: 'D4',
    dayOfBirth: 1980,
    workplace: 'Innovatech',
    phoneNumber: '444-789-1234',
  },
];


// ----------------------------------------------------------------------

export default function ContractListPage(arr) {

  if (!arr) {
    return null;
  }

  arr = MOCK_DATA

  const { themeStretch } = useSettingsContext();



  return (
    <>
      {/* <Helmet>
        <title>Contract List</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : 'lg'}>

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
                    <TableRow hover key={row.order}>
                      <TableCell align="center">{row.order}</TableCell>
                      <TableCell align="left">{row.fullName}</TableCell>
                      <TableCell align="left">{row.bed}</TableCell>
                      <TableCell align="left">{row.dayOfBirth}</TableCell>
                      <TableCell align="left">{row.workplace}</TableCell>
                      <TableCell align="left">{row.phoneNumber}</TableCell>

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