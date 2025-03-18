
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
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  TableHeadCustom,
  useTable,
} from '../../components/table';
import { PATH_USER } from '../../routes/paths';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'order', label: 'order', align: 'left' },
  { id: 'updateAt', label: 'Updated At', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'minus', label: 'Minus Points', align: 'left' },
];

const rows = [
  {
    order: 1,
    updateAt: '2025-01-20',
    description: 'Violation of policy A',
    minus: 5
  },
  {
    order: 2,
    updateAt: '2025-01-21',
    description: 'Violation of policy B',
    minus: 3
  },
  {
    order: 3,
    updateAt: '2025-01-22',
    description: 'Violation of policy C',
    minus: 7
  },
];



// ----------------------------------------------------------------------



export default function ViolationDetailsPage() {
  const {
    page,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const totalPoints = 100 - rows.reduce((sum, row) => sum + row.minus, 0);




  return (
    <>
      <Helmet>
        <title>Violation</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Violation Details"
          links={[
            { name: 'Dashboard', href: PATH_USER.root },
            { name: 'User', href: PATH_USER.profile },
            { name: 'Violation Month', href: PATH_USER.violation },
            { name: 'Violation Details' },
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
                  {rows.map((row) => (
                    <TableRow key={row.order}>
                      <TableCell>{row.order}</TableCell>
                      <TableCell>{row.updateAt}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.minus}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={2} align="right" style={{ fontWeight: 'bold' }}>
                      Total Points
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{totalPoints}</TableCell>
                  </TableRow>

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