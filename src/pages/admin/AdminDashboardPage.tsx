// @mui
import { Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// _mock_
// components
import { Helmet } from "react-helmet-async";
import { useSettingsContext } from "../../components/settings";
import AnalyticsByGender from "../../sections/@dashboard/AnalyticsByGender";
import AnalyticsWidgetSummary from "../../sections/@dashboard/AnalyticsWidgetSummary";
import AppAreaInstalled from "../../sections/@dashboard/AppAreaInstalled";
import { useAuthGuard } from "../../auth/AuthGuard";
import { UserRole } from "../../models/enums/DormyEnums";
// sections

// ----------------------------------------------------------------------

export default function AdminDashboardPage() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  useAuthGuard(UserRole.ADMIN);

  return (
    <>
      <Helmet>
        <title> Dashboard Admin | Dormy</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Registration Form"
              total={714000}
              icon="ant-design:android-filled"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Empty Bed"
              total={1352831}
              color="info"
              icon="ant-design:apple-filled"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Current resident"
              total={1723315}
              color="warning"
              icon="ant-design:windows-filled"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Unresolved Request"
              total={234}
              color="error"
              icon="ant-design:bug-filled"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="Area Installed"
              subheader="(+43%) than last year"
              chart={{
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                ],
                series: [
                  {
                    year: "2019",
                    data: [
                      {
                        name: "Asia",
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                      },
                      {
                        name: "America",
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45],
                      },
                    ],
                  },
                  {
                    year: "2020",
                    data: [
                      {
                        name: "Asia",
                        data: [148, 91, 69, 62, 49, 51, 35, 41, 10],
                      },
                      {
                        name: "America",
                        data: [45, 77, 99, 88, 77, 56, 13, 34, 10],
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsByGender
              title="Sale By Gender"
              total={2324}
              chart={{
                series: [
                  { label: "Mens", value: 44 },
                  { label: "Womens", value: 75 },
                ],
              }}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <BookingDetails
              title="Booking Details"
              tableData={_bookings}
              tableLabels={[
                { id: 'booker', label: 'Booker' },
                { id: 'checkIn', label: 'Check In' },
                { id: 'checkOut', label: 'Check Out' },
                { id: 'status', label: 'Status' },
                { id: 'phone', label: 'Phone' },
                { id: 'roomType', label: 'Room Type' },
                { id: '' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
