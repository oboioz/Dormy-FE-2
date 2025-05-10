// @mui
import {
  Button,
  Card,
  Container,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
// components
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useAuthGuard } from "../../auth/AuthGuard";
import ConfirmDialog from "../../components/confirm-dialog";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from "../../components/table";
import { UserRole } from "../../models/enums/DormyEnums";
import {
  CreateOvernightAbsenceRequestModel,
  UpdateOvernightAbsenceRequestModel,
} from "../../models/requests/OvernightAbsenceRequestModels";
import { OvernightAbsenceResponseModel } from "../../models/responses/OvernightAbsenceResponseModels";
import { PATH_USER } from "../../routes/paths";
import CreateOvernightAbsenceModal from "../../sections/@dashboard/user/request/CreateOvernightAbsenceForm";
import EditOvernightAbsenceModal from "../../sections/@dashboard/user/request/EditOvernightAbsenceModal";
import OvernightAbsenceStatusTag from "../../sections/tag/OvernightAbsenceStatusTag";
import { httpClient } from "../../services";
import { DateTimeUtils } from "../../utils/DateTimeUtils";
import { fDate } from "../../utils/formatTime";

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const TABLE_HEAD = [
  { id: "startDateTime", label: "Start date", align: "left" },
  { id: "endDateTime", label: "End date", align: "left" },
  { id: "reason", label: "Reason", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "approver", label: "Approver", align: "center" },
  { id: "action", label: "", align: "left" },
];

// ----------------------------------------------------------------------

export default function OvernightAbsencePage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();

  const { themeStretch } = useSettingsContext();
  const [overnightAbsences, setOvernightAbsences] = useState<
    OvernightAbsenceResponseModel[]
  >([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] =
    useState<OvernightAbsenceResponseModel | null>(null);

  const fetchOvernightAbsences = async () => {
    const response =
      await httpClient.overnightAbsenceService.getAllUserOvernightAbsences();
    setOvernightAbsences(response || []);
  };
  useEffect(() => {
    fetchOvernightAbsences();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSubmit = async (formData: {
    startDateTime: Date;
    endDateTime: Date;
    reason: string;
  }) => {
    try {
      const payoad: CreateOvernightAbsenceRequestModel = {
        reason: formData.reason,
        startDateTime: DateTimeUtils.toStringWithDefaultTime(
          formData.startDateTime
        ),
        endDateTime: DateTimeUtils.toStringWithDefaultTime(
          formData.endDateTime
        ),
      };
      await httpClient.overnightAbsenceService.createOvernightAbsence(payoad);
      fetchOvernightAbsences(); // Refresh the table data
      handleCloseModal(); // Close the modal
    } catch (error) {
      toast.error("Failed to create overnight absence:" + error);
    }
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditData(null); // Clear the edit data
    setOpenModal(false);
  };

  const handleEdit = (absence: OvernightAbsenceResponseModel) => {
    setEditData(absence);
    handleOpenEditModal();
  };

  const handleEditSubmit = async (formData: {
    id: string;
    startDateTime: Date;
    endDateTime: Date;
    reason: string;
  }) => {
    try {
      const payload: UpdateOvernightAbsenceRequestModel = {
        id: editData.id,
        reason: formData.reason,
        startDateTime: DateTimeUtils.toStringWithDefaultTime(
          formData.startDateTime
        ),
        endDateTime: DateTimeUtils.toStringWithDefaultTime(
          formData.endDateTime
        ),
      };
      console.log("payload: ", payload);
      const response =
        await httpClient.overnightAbsenceService.updateOvernightAbsence(
          payload
        );
      if (response) {
        toast.success("Update overnight absence successfully");
        fetchOvernightAbsences(); // Refresh the table data
      } else {
        toast.error("Failed to update overnight absence.");
      }
      handleCloseEditModal(); // Close the modal
    } catch (error) {
      toast.error("Failed to update overnight absence:" + error);
    }
  };

  const handleCancelOvernightAbsence = async (id: string) => {
    try {
      const response = await httpClient.overnightAbsenceService.cancelOvernightAbsence(id);
      if (response) {
        toast.success("Cancel overnight absence successfully");
        fetchOvernightAbsences(); // Refresh the table data
      } else {
        toast.error("Failed to cancel overnight absence.");
      }
      handleCloseConfirm(); // Close the modal
    } catch (error) {
      toast.error("Failed to cancel overnight absence:" + error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Overnight Absence</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Overnight Absence"
          links={[
            { name: "Dashboard", href: PATH_USER.root },
            { name: "User", href: PATH_USER.profile },
            { name: "Overnight Absence" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenModal} // Open the modal on click
            >
              New overnight absence
            </Button>
          }
        />

        <Card sx={{ p: 3 }}>
          <Typography
            variant="overline"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            Activity
          </Typography>

          <Stack alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2">• </Typography>
              <Typography variant="body2">
                Attention: You must submit before 6:00 PM
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography variant="body2">• </Typography>
              <Typography variant="body2">
                Every request will be processed within 24 hours
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography variant="body2">• </Typography>
              <Typography variant="body2">
                You can only submit 3 times a month
              </Typography>
            </Stack>
          </Stack>
        </Card>

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                // rowCount={tableData.length}
                />
                <TableBody>
                  {overnightAbsences.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="left">
                        {fDate(row.startDateTime, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell align="left">
                        {fDate(row.endDateTime, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell align="left">{row.reason}</TableCell>
                      <TableCell align="left">
                        <OvernightAbsenceStatusTag status={row.status} />
                      </TableCell>
                      <TableCell align="center">{row.approverId === null ? "--" : row.approverFullName}</TableCell>
                      <TableCell align="center">
                        {row.status == "SUBMITTED" && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </Button>
                        )}
                        {(row.status == "SUBMITTED" ||
                          row.status == "APPROVED") && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={handleOpenConfirm}
                              sx={{ ml: 1 }}
                              color="error"
                            >
                              Cancel
                            </Button>
                          )}
                      </TableCell>
                      <ConfirmDialog
                        open={openConfirm}
                        onClose={handleCloseConfirm}
                        title="Delete"
                        content={
                          <>
                            Are you sure want to cancel <strong> </strong>{" "}
                            items?
                          </>
                        }
                        action={
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              handleCancelOvernightAbsence(row.id);
                              handleCloseConfirm();
                            }}
                          >
                            Confirm cancel
                          </Button>
                        }
                      />
                    </TableRow>
                  ))}
                  <TableNoData isNotFound={overnightAbsences?.length == 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={overnightAbsences.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>
      </Container>

      {/* Modal for New Overnight Absence */}
      <CreateOvernightAbsenceModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      {/* Edit Modal */}
      {editData && (
        <EditOvernightAbsenceModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          onSubmit={handleEditSubmit}
          initialData={editData}
        />
      )}
    </>
  );
}
