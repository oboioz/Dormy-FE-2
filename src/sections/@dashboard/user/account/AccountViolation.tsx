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
import { Link } from 'react-router-dom';
import Scrollbar from '../../../../components/scrollbar';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'order', label: '#', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
];

// ----------------------------------------------------------------------


const rows = [
  { order: 1, description: 'Description for item 1' },
  { order: 2, description: 'Description for item 2' },
  { order: 3, description: 'Description for item 3' },
];

export default function AccountViolation() {
  const {
    page,
    onChangePage,
    rowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState(rows);


  return (
    <>
      <Helmet>
        <title> Account Violation</title>
      </Helmet>

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
                    <TableRow hover>
                      <TableCell>{row.order}</TableCell>
                      <TableCell>
                        <Link to={`/violation-details/${row.order}`} style={{ textDecoration: 'none', color: 'blue' }}>
                          {row.description}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            page={page}
            onPageChange={onChangePage}
            count={tableData.length}
            rowsPerPage={rowsPerPage}
          />
        </Card>
      </Container>

    </>
  );
}

// ----------------------------------------------------------------------
