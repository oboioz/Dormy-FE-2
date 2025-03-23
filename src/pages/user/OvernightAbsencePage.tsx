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
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Label from "../../components/label";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import {
  TableHeadCustom,
  TablePaginationCustom,
  useTable,
} from "../../components/table";
import { PATH_USER } from "../../routes/paths";
import { fDate, fDateTime } from "../../utils/formatTime";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const TABLE_HEAD = [
  { id: "absenceDate", label: "Absence Date", align: "left" },
  { id: "sendAt", label: "Send At", align: "left" },
  { id: "reason", label: "Reason", align: "center" },
  { id: "status", label: "Status", align: "left" },
];

const mockAbsences = [
  {
    absenceDate: new Date("2024-10-01"),
    sendAt: new Date("2024-09-30T14:00:00"),
    reason: "Medical Leave",
    status: "Approved",
  },
  {
    absenceDate: new Date("2024-10-05"),
    sendAt: new Date("2024-10-04T09:30:00"),
    reason: "Family Emergency",
    status: "Pending",
  },
  {
    absenceDate: new Date("2024-10-10"),
    sendAt: new Date("2024-10-09T16:45:00"),
    reason: "Personal Leave",
    status: "Rejected",
  },
  {
    absenceDate: new Date("2024-10-15"),
    sendAt: new Date("2024-10-14T08:15:00"),
    reason: "Vacation",
    status: "Approved",
  },
  {
    absenceDate: new Date("2024-10-20"),
    sendAt: new Date("2024-10-19T12:00:00"),
    reason: "Work from Home",
    status: "Pending",
  },
];

// ----------------------------------------------------------------------

export default function OvernightAbsencePage() {
  useAuthGuard(UserRole.CUSTOMER);
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();

  const { themeStretch } = useSettingsContext();

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
              component={RouterLink}
              to={PATH_USER.overnightRequest}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Request
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
            <Stack direction="row">
              <StyledIcon icon="ic:round-circle" />
              <Typography variant="body2">
                Attention: You must submit before 6:00 PM
              </Typography>
            </Stack>

            <Stack direction="row">
              <StyledIcon icon="ic:round-circle" />
              <Typography variant="body2">
                Every request will be processed within 24 hours
              </Typography>
            </Stack>

            <Stack direction="row">
              <StyledIcon icon="ic:round-circle" />
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
                  {mockAbsences.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        {fDate(row.absenceDate)}
                      </TableCell>
                      <TableCell align="left">
                        {fDateTime(row.sendAt)}
                      </TableCell>
                      <TableCell align="left">{row.reason}</TableCell>
                      <TableCell align="left">
                        <Label
                          variant="soft"
                          color={
                            (row.status === "Active" && "success") || "error"
                          }
                          sx={{ textTransform: "capitalize" }}
                        >
                          {row.status}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={mockAbsences.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
