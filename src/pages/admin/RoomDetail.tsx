import { Grid, Typography, Card, Stack, Divider, Link } from "@mui/material";
import { IRoom } from "../../models/responses/RoomModel";
import { ro } from "date-fns/locale";
import Iconify from "../../components/iconify";
import { useNavigate } from "react-router-dom";

type Props = {
  room?: IRoom;
};

export default function RoomDetail({ room }: Props) {
  const navigate = useNavigate();
  if (!room) {
    return null;
  }

  const {
    roomTypeName,
    roomNumber,
    floorNumber,
    price,
    buildingName,
    totalAvailableBed,
    totalUsedBed,
    roomServices,
    users,
  } = room;

  return (
    <>
      <Grid container spacing={3} sx={{ marginLeft: 2 }}>
        {/* General Information */}
        <Grid item xs={12} sm={6}>
          <Typography
            paragraph
            variant="overline"
            sx={{ color: "text.disabled" }}
          >
            General
          </Typography>

          <Typography variant="body2">
            <b>Block:</b> {buildingName}
          </Typography>
          <Typography variant="body2">
            <b>Floor:</b> {floorNumber}
          </Typography>
          <Typography variant="body2">
            <b>Room number:</b> {roomNumber}
          </Typography>
          <Typography variant="body2">
            <b>Bed:</b> {totalUsedBed}/{totalAvailableBed}
          </Typography>
          <Typography variant="body2">
            <b>Price:</b> {price} VND/person/month
          </Typography>
        </Grid>

        {/* Room Services */}
        <Grid item xs={12} sm={6}>
          <Typography
            paragraph
            variant="overline"
            sx={{ color: "text.disabled" }}
          >
            Room Services
          </Typography>

          {roomServices && roomServices.length > 0 ? (
            roomServices.map((service) => (
              <Typography key={service.id} variant="body2">
                - {service.roomServiceName}: {service.cost} VND/
                <b>{service.unit}</b>
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No services available.
            </Typography>
          )}
        </Grid>

        {/* Divider */}
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* List of Users */}
        <Grid item xs={12}>
          <Typography
            paragraph
            variant="overline"
            sx={{ color: "text.disabled" }}
          >
            Users in Room
          </Typography>

          <Grid container spacing={3}>
            {users && users.length > 0 ? (
              users.map((user) => (
                <Grid item xs={12} sm={6} key={user.userId}>
                  <Card sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      {/* User Info Column */}
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          {/* User Name */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:person-outline"
                              sx={{ color: "primary.main" }}
                            />
                            <Typography variant="subtitle1">
                              {user.firstName} {user.lastName} ({user.gender})
                            </Typography>
                          </Stack>

                          {/* Email */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:email-outline"
                              sx={{ color: "primary.main" }}
                            />
                            <Typography variant="body2">
                              Email: <b>{user.email}</b>
                            </Typography>
                          </Stack>

                          {/* Phone */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:phone-outline"
                              sx={{ color: "primary.main" }}
                            />
                            <Typography variant="body2">
                              Phone: <b>{user.phoneNumber}</b>
                            </Typography>
                          </Stack>
                          {/* Gender */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon={
                                user.gender === "MALE"
                                  ? "mdi:gender-male"
                                  : "mdi:gender-female"
                              }
                              sx={{
                                color: user.gender === "MALE" ? "blue" : "pink",
                              }}
                            />
                            <Typography variant="body2">
                              Gender: <b>{user.gender}</b>
                            </Typography>
                          </Stack>
                          {/* Status */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:checkmark-circle-outline"
                              sx={{
                                color:
                                  user.status === "ACTIVE" ||
                                  user.status === "EXTENDED"
                                    ? "success.main"
                                    : "error.main",
                              }}
                            />
                            <Typography variant="body2">
                              Status: <b>{user.status}</b>
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>

                      {/* Contract Info Column */}
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          {/* Contract ID */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:file-text-outline"
                              sx={{ color: "primary.main" }}
                            />
                            <Link
                              component="button"
                              variant="body2"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                navigate(`/contracts/${user.contractId}`)
                              }
                              sx={{
                                color: "primary.main",
                                textDecoration: "underline",
                              }}
                            >
                              View Contract
                            </Link>
                          </Stack>

                          {/* Contract Status */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:alert-circle-outline"
                              sx={{
                                color:
                                  user.contractStatus === "ACTIVE" ||
                                  user.contractStatus === "EXTENDED"
                                    ? "success.main"
                                    : "error.main",
                              }}
                            />
                            <Typography variant="body2">
                              Contract Status: <b>{user.contractStatus}</b>
                            </Typography>
                          </Stack>

                          {/* Contract Start Date */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:calendar-outline"
                              sx={{ color: "primary.main" }}
                            />
                            <Typography variant="body2">
                              Start Date:{" "}
                              <b>
                                {new Date(
                                  user.contractStartDate!
                                ).toLocaleDateString()}
                              </b>
                            </Typography>
                          </Stack>

                          {/* Contract End Date */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Iconify
                              icon="eva:calendar-outline"
                              sx={{ color: "primary.main" }}
                            />
                            <Typography variant="body2">
                              End Date:{" "}
                              <b>
                                {new Date(
                                  user.contractEndDate!
                                ).toLocaleDateString()}
                              </b>
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
