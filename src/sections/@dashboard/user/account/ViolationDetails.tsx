import { useState } from 'react';
// @mui
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
// components
import { useSettingsContext } from '../../../../components/settings';
import {
  TableHeadCustom,
  TablePaginationCustom,
  useTable
} from '../../../../components/table';
// sections
import Scrollbar from '../../../../components/scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'order', label: '#', align: 'left' },
  { id: 'updateAt', label: 'Update Date', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'minus', label: 'Minus Point', align: 'left' },
];

// ----------------------------------------------------------------------


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

export default function ViolationDetails() {
  const {
    page,
    onChangePage,
  } = useTable();

  const totalPoints = 100 - rows.reduce((sum, row) => sum + row.minus, 0);

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState(rows);


  return (
    <>
      {/* <Helmet>
        <title> Account Violation</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>


            <Scrollbar>
              <Table size={'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
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

          <TablePaginationCustom
            page={page}
            onPageChange={onChangePage}
            count={tableData.length}
            rowsPerPage={10}
          />
        </Card>
      </Container>

    </>
  );
}

// ----------------------------------------------------------------------
