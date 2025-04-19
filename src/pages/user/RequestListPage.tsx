import { Link, useNavigate } from "react-router-dom";
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
import { _mockRequests } from "../../_mock/assets/request";
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
import { PATH_ADMIN, PATH_USER } from "../../routes/paths";
import RequestRow from "../../sections/@dashboard/admin/request/RequestRow";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { IRequest } from "../../models/responses/RequestModel";
import { httpClient } from "../../services";
import { toast } from "react-toastify";
import Iconify from "../../components/iconify";
import MyRequestRow from "../../sections/@dashboard/user/request/MyRequestRow";
import { useAuthContext } from "../../auth/JwtContext";
import { id } from "date-fns/locale";

const TABLE_HEAD = [
  { id: "requestType", label: "Request Type", align: "left" },
  { id: "createdDateUtc", label: "Submit Time", align: "left" },
  { id: "buildingName", label: "Building", align: "left" },
  { id: "roomNumber", label: "Room", align: "left" },
  { id: "description", label: "Description", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "" },
];

export default function RequestListPage() {
  const { user } = useAuthContext();
  useAuthGuard(UserRole.CUSTOMER);
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

  const [tableData, setTableData] = useState<IRequest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query
  const [openConfirm, setOpenConfirm] = useState(false);
  const isNotFound = !tableData.length;

  const [selectedRequest, setSelectedRequest] = useState<string>("");
  const [requestType, setRequestType] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const fetchRequests = async () => {
    var request = await httpClient.requestService.getRequests({ ids: [] });
    request.sort(
      (a, b) =>
        new Date(b.createdDateUtc).getTime() -
        new Date(a.createdDateUtc).getTime()
    );
    setTableData(request);
  };

  const filteredData = tableData.filter((row) => {
    const matchesStatus =
      selectedStatus === "ALL" || row.status === selectedStatus;

    const matchesSearchQuery =
      row.roomNumber?.toString()?.includes(searchQuery) ||
      row.requestType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearchQuery;
  });

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedRequest("");
    setRequestType("");
    setDescription("");
  };

  const cancelRequest = async (id: string) => {
    var response = await httpClient.requestService.cancelRequest(id);
    if (response) {
      toast.success("Canceled");
      fetchRequests();
    } else {
      toast.error("An error has occurred, please try again later");
    }
  };

  const createRequest = async (payload: {
    requestType: string;
    description: string;
  }) => {
    try {
      const response = await httpClient.requestService.createRequest({
        description: payload.description,
        requestType: payload.requestType,
        roomId: tableData[0]?.roomId,
      });
      if (response) {
        toast.success("Request created successfully!");
        fetchRequests();
      } else {
        toast.error("Failed to create request. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const updateRequest = async (payload: {
    requestType: string;
    description: string;
  }) => {
    try {
      const response = await httpClient.requestService.updateRequest({
        id: selectedRequest,
        description: payload.description,
        requestType: payload.requestType,
        roomId: tableData.find((x) => x.id === selectedRequest)?.roomId || null,
      });
      if (response) {
        toast.success("Request updated successfully!");
        fetchRequests(); // Refresh the request list
      } else {
        toast.error("Failed to updated request. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (selectedRequest) {
      updateRequest({
        description: description,
        requestType: requestType,
      });
    } else {
      createRequest({
        description: description,
        requestType: requestType,
      });
    }
    handleCloseConfirm();
  };

  const handleOpenEditRow = (request: IRequest) => {
    setSelectedRequest(request.id);
    setDescription(request.description);
    if (
      !["Other", "Vehicle Issue", "Water Issue", "Electric Issue"].includes(
        request.requestType
      )
    ) {
      setRequestType("Other");
    } else {
      setRequestType(request.requestType);
    }
    handleOpenConfirm();
  };

  const handleCancelRow = (id: string) => {
    cancelRequest(id);
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
        <title>My Request List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Request List"
          links={[
            { name: "Dashboard", href: PATH_USER.root },
            { name: "User", href: PATH_USER.profile },
            { name: "Request List" },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => handleOpenConfirm()}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add new request
            </Button>
          }
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
            placeholder="Search by Room or Request Type"
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
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id.toString())
                    )
                  }
                />

                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <MyRequestRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        onEditRow={() => handleOpenEditRow(row)}
                        onCancelRow={() => handleCancelRow(row.id.toString())}
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
        title={selectedRequest ? "Edit Request" : "Create Request"}
        content={
          <Stack spacing={3}>
            {/* Select Room Type */}
            <Select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Request Type
              </MenuItem>
              <MenuItem value="Electric Issue">Electric Issue</MenuItem>
              <MenuItem value="Water Issue">Water Issue</MenuItem>
              <MenuItem value="Vehicle Issue">Vehicle Issue</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>

            {/* Description Field */}
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        }
        action={
          <Button
            variant="contained"
            disabled={!requestType || !description}
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </Button>
        }
      />
    </>
  );
}
