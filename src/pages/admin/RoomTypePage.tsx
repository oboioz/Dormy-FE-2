
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip
} from '@mui/material';

// components
import { useState } from 'react';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedAction,
  useTable,
} from '../../components/table';
import { PATH_ADMIN } from '../../routes/paths';
import RoomTypeRow from '../../sections/@dashboard/admin/venue/RoomTypeRow';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'roomTypeID', label: 'ID', align: 'left' },
  { id: 'roomTypeName', label: 'Name', align: 'left' },
  { id: 'capacity', label: 'Capacity', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'price', label: 'Price', align: 'center' },
  { id: '' },
];


const _roomTypeList = [...Array(5)].map((_, index) => ({
  roomTypeID: index + 1,
  roomTypeName: ["Single", "Double", "Suite", "Deluxe", "Penthouse"][index],
  description: [
    "A small room for one person with basic amenities.",
    "A room for two people with a shared bed or two single beds.",
    "A luxurious room with extra space and amenities.",
    "A high-end room with premium facilities.",
    "The most luxurious option with the best view and services.",
  ][index],
  price: [50, 80, 120, 200, 500][index], // Sample pricing
  capacity: [1, 2, 4, 6, 10][index], // Adding capacity field
}));


// ----------------------------------------------------------------------

export default function RoomTypePage() {
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

  const dataInPage = _roomTypeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();


  const [tableData, setTableData] = useState(_roomTypeList);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = (!_roomTypeList.length);


  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleEditRow = (id: string) => {
    // navigate(PATH_ADMIN.user.edit(paramCase(id)));
    navigate(PATH_ADMIN.dormitory.roomtypeForm);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.roomTypeID.toString() !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.roomTypeID.toString()));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === _roomTypeList.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };




  return (
    <>
      {/* <Helmet>
        <title>Contract List</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Contract List"
          links={[
            { name: 'Dashboard', href: PATH_ADMIN.root },
            { name: 'Admin', href: PATH_ADMIN.profile },
            { name: 'Room Type' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_ADMIN.dormitory.roomtypeForm}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Room Type
            </Button>
          }
        />

        <Card>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.roomTypeID.toString())
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.roomTypeID.toString())
                    )
                  }

                // rowCount={tableData.length}
                />

                <TableBody>
                  {_roomTypeList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <RoomTypeRow
                        key={row.roomTypeID}
                        row={row}
                        selected={selected.includes(row.roomTypeID.toString())}
                        onSelectRow={() => onSelectRow(row.roomTypeID.toString())}
                        onEditRow={() => handleEditRow(row.roomTypeID.toString())}
                        onDeleteRow={() => handleDeleteRow(row.roomTypeID.toString())}
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
              handleDeleteRows(selected);
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