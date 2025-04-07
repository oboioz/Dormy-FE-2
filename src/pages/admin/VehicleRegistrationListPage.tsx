import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ConfirmDialog from "../../components/confirm-dialog";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  useTable,
} from "../../components/table";
import { PATH_ADMIN } from "../../routes/paths";
import VehicleRegistrationRow from "../../sections/@dashboard/admin/garage/VehicleRegistrationRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { httpClient } from "../../services";
import { IParkingRequest } from "../../models/responses/ParkingRequestModels";
import { toast } from "react-toastify";

const TABLE_HEAD = [
  { id: "parkingSpotName", label: "Spot", align: "left" },
  { id: "parkingSpotStatus", label: "Spot Status", align: "left" },
  { id: "createdDateUtc", label: "Timestamp", align: "left" },
  { id: "userFullName", label: "Requester", align: "left" },
  { id: "license", label: "License", align: "left" },
  { id: "vehicleType", label: "Vehicle Type", align: "left" },
  { id: "description", label: "Note", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "" },
];

export default function VehicleRegistrationListPage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
  } = useTable({ defaultRowsPerPage: 10 });

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<IParkingRequest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query
  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !tableData.length;

  const filteredData = tableData.filter((row) => {
    const matchesStatus =
      selectedStatus === "ALL" || row.status === selectedStatus;

    const matchesSearchQuery =
      row.parkingSpotName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.vehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.userFullName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearchQuery;
  });

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleApprove = (id: string) => {
    approveRejectRequest(id, true);
  };

  const handleReject = (id: string) => {
    approveRejectRequest(id, false);
  };

  const fetchRequests = async () => {
    var request = await httpClient.parkingRequestService.getRequests({
      ids: [],
    });
    request.sort(
      (a, b) =>
        new Date(b.createdDateUtc).getTime() -
        new Date(a.createdDateUtc).getTime()
    );
    console.log(request);
    setTableData(request);
  };

  const approveRejectRequest = async (id: string, isApprove: boolean) => {
    var response = await httpClient.parkingRequestService.approveRejectRequest(
      id,
      isApprove
    );
    if (response) {
      toast.success(isApprove ? "Approved" : "Rejected");
      window.location.reload();
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [selectedStatus, searchQuery]);

  useEffect(() => {
    if (page > 0 && page >= Math.ceil(filteredData.length / rowsPerPage)) {
      setPage(0); // Reset to the first page if the current page is out of range
    }
  }, [filteredData.length, page, rowsPerPage]);

  return (
    <>
      <Helmet>
        <title>Vehicle Registration List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Vehicle Registration List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Vehicle Registration List" },
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
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          {/* Status Filter */}
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            displayEmpty
            sx={{ width: 200 }}
          >
            <MenuItem value="ALL">All Statuses</MenuItem>
            <MenuItem value="SUBMITTED">Submitted</MenuItem>
            <MenuItem value="APPROVED">Approved</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
            <MenuItem value="CANCELED">Canceled</MenuItem>
          </Select>

          {/* Search Input */}
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Parking Spot Name, Vehicle Type or Username"
            fullWidth
          />
        </Stack>
        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  // numSelected={selected.length}
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     tableData.map((row) => row.registrationInformation.generalInformation.contract.contractID.toString())
                  //   )
                  // }

                  // rowCount={tableData.length}
                />

                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <VehicleRegistrationRow
                        key={row.id}
                        row={row}
                        onRejectRow={() => handleReject(row.id)}
                        onApproveRow={() => handleApprove(row.id)}
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong>{" "}
            items?
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
