import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
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
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
import { OvernightAbsenceResponseModel } from "../../models/responses/OvernightAbsenceResponseModels";
import { httpClient } from "../../services";
import { toast } from "react-toastify";
import { GetBatchOvernightAbsenceRequestModel } from "../../models/requests/OvernightAbsenceRequestModels";
import OvernightAbsenceRow from "../../sections/@dashboard/admin/request/OvernightAbsenceRow";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "startDate", label: "Start date", align: "left" },
  { id: "endDate", label: "End date", align: "left" },
  { id: "reason", label: "Reason", align: "left" },
  { id: "fullName", label: "Requester", align: "left" },
  { id: "phoneNumber", label: "Phone number", align: "left" },
  { id: "approverFullName", label: "Approver", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "action", label: "", align: "left" },
];

// ----------------------------------------------------------------------

export default function OvernightrequestPage() {
  useAuthGuard(UserRole.ADMIN);
  const {
    page,
    selected,
    rowsPerPage,
    setPage,
    setSelected,
    onSelectRow,
    setRowsPerPage,
    onSelectAllRows,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<OvernightAbsenceResponseModel[]>([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !tableData.length;
  const dataInPage = tableData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchOvernightAbsencesData = async () => {
      const payload: GetBatchOvernightAbsenceRequestModel = {
        ids: [],
      };
      const response = await httpClient.overnightAbsenceService.getBatchOvernightAbsences(
        payload
      );
  
      if (response) {
        console.log("response", response);
        setTableData(response);
      } else {
        setTableData([]);
        toast.error("Failed to fetch data");
      }
    };
  
    useEffect(() => {
      fetchOvernightAbsencesData();
    }, []);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleApproveReject = (id: string, isApprove: boolean) => {
    approveReject(id, isApprove);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter(
      (row) => row.id !== id
    );
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
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

  const approveReject = async (id: string, isApprove: boolean) => {
    var response = await httpClient.overnightAbsenceService.approveOrRejectOvernightAbsence(
      id,
      { isApproved: isApprove }
    );

    if (response) {
      toast.success("Success");
      window.location.reload();
    } else {
      toast.error("Failed");
    }
  };

  const fetchOvernightAbsents = async () => {
    var response =
      await httpClient.overnightAbsenceService.getAllUserOvernightAbsences();

    response.sort((a, b) => {
      if (a.status === b.status) {
        return (
          new Date(b.createdDateUtc).getTime() -
          new Date(a.createdDateUtc).getTime()
        );
      }
      return a.status === "SUBMITTED" ? -1 : b.status === "SUBMITTED" ? 1 : 0;
    });
    setTableData(response);
  };

  useEffect(() => {
    fetchOvernightAbsents();
  }, []);

  return (
    <>
      <Helmet>
        <title>Overnight Request List</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Overnight Request List"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "Overnight Request" },
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
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <OvernightAbsenceRow
                        key={row.id}
                        overnightAbsence={row}
                        setOvernightAbsences={setTableData}
                        selected={selected.includes(row.id)}
                        onSelectRow={() =>
                          onSelectRow(row.id)
                        }
                        // onEditRow={() =>
                        //   handleEditRow(row.absenceID.toString())
                        // }
                        onDeleteRow={() =>
                          handleDeleteRow(row.id)
                        }
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
