
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
import { Helmet } from 'react-helmet-async';
import { IParkingSpot } from '../../@types/vehicle';
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
import GarageListRow from '../../sections/@dashboard/admin/garage/GarageListRow';
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


// Mock Parking Spots
const mockParkingSpots: IParkingSpot[] = [
  {
    parkingSpotID: 1,
    spotNumber: "A101",
    status: "Occupied",
    adminID: 1,
    capacity: 5,
    usedSpot: 4, // 4 out of 5 spots occupied
  },
  {
    parkingSpotID: 2,
    spotNumber: "B202",
    status: "Available",
    adminID: 2,
    capacity: 10,
    usedSpot: 3, // 3 out of 10 spots occupied
  },
  {
    parkingSpotID: 3,
    spotNumber: "C303",
    status: "Full",
    adminID: 3,
    capacity: 8,
    usedSpot: 8, // Fully occupied
  },
  {
    parkingSpotID: 4,
    spotNumber: "D404",
    status: "Available",
    adminID: 4,
    capacity: 6,
    usedSpot: 0, // Completely empty
  },
];



// ----------------------------------------------------------------------

export default function VehicleGaragePage() {
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

  const dataInPage = mockParkingSpots.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();


  const [tableData, setTableData] = useState(mockParkingSpots);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = (!mockParkingSpots.length);


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
    const deleteRow = tableData.filter((row) => row.parkingSpotID.toString() !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.parkingSpotID.toString()));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === mockParkingSpots.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };




  return (
    <>
      <Helmet>
        <title>Garage List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Garage List"
          links={[
            { name: 'Dashboard', href: PATH_ADMIN.root },
            { name: 'User', href: PATH_ADMIN.profile },
            { name: 'Garage List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_ADMIN.garage.form}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add new Garage
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
                  tableData.map((row) => row.parkingSpotID.toString())
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
                      tableData.map((row) => row.parkingSpotID.toString())
                    )
                  }

                // rowCount={tableData.length}
                />

                <TableBody>
                  {mockParkingSpots
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <GarageListRow
                        key={row.parkingSpotID}
                        row={row}
                        selected={selected.includes(row.parkingSpotID.toString())}
                        onSelectRow={() => onSelectRow(row.parkingSpotID.toString())}
                        onEditRow={() => handleEditRow(row.parkingSpotID.toString())}
                        onDeleteRow={() => handleDeleteRow(row.parkingSpotID.toString())}
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