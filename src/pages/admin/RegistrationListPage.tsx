
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer
} from '@mui/material';
// routes

// components
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import mockRegistrationForm from '../../_mock/assets/form';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  useTable
} from '../../components/table';
import { PATH_ADMIN } from '../../routes/paths';
import RoomTypeRow from '../../sections/@dashboard/admin/venue/RoomTypeRow';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'contractID', label: 'ID', align: 'left' },
  { id: 'timestamp', label: 'Timestamp', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'phoneNumber', label: 'Phone Number', align: 'left' },
  { id: 'gender', label: 'Gender', align: 'center' },
  { id: 'room', label: 'Room', align: 'center' },
  { id: 'roomType', label: 'Room Type', align: 'center' },
  { id: '' },
];

const _mockData = mockRegistrationForm

// ----------------------------------------------------------------------

export default function RegistrationListPage() {
  const {
    page,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
  } = useTable();

  const dataInPage = _mockData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();


  const [tableData, setTableData] = useState(_mockData);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = (!_mockData.length);


  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleEditRow = (id: string) => {
    // navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.registrationInformation.generalInformation.contract.contractID.toString() !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };



  return (
    <>
      <Helmet>
        <title>Registration List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Registration List"
          links={[
            { name: 'Dashboard', href: PATH_ADMIN.root },
            { name: 'Admin', href: PATH_ADMIN.profile },
            { name: 'Registration' },
          ]}
        // action={
        //   <Button
        //     component={RouterLink}
        //     to={PATH_DASHBOARD.user.new}
        //     variant="contained"
        //     startIcon={<Iconify icon="eva:plus-fill" />}
        //   >
        //     Add new contract
        //   </Button>
        // }
        />

        <Card>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

            <Scrollbar>
              <Table size={'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.registrationInformation.generalInformation.contract.contractID.toString())
                    )
                  }

                // rowCount={tableData.length}
                />

                <TableBody>
                  {_mockData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <RoomTypeRow
                        key={row.registrationInformation.generalInformation.contract.contractID}
                        row={row}
                        selected={selected.includes(row.registrationInformation.generalInformation.contract.contractID.toString())}
                        onSelectRow={() => onSelectRow(row.registrationInformation.generalInformation.contract.contractID.toString())}
                        onEditRow={() => handleEditRow(row.registrationInformation.generalInformation.contract.contractID.toString())}
                        onDeleteRow={() => handleDeleteRow(row.registrationInformation.generalInformation.contract.contractID.toString())}
                      />
                    ))}

                  <TableEmptyRows
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />

    </>
  );
}

// ----------------------------------------------------------------------