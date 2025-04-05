import { Grid, Typography, Card, Stack, Divider } from "@mui/material";
import { IRoom } from "../../models/responses/RoomModel";
import { ro } from "date-fns/locale";
import Iconify from "../../components/iconify";

type Props = {
  room?: IRoom;
};

export default function RoomDetail({ room }: Props) {
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

  room.users.push(room.users[0]);

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
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify
                          icon="eva:person-outline"
                          sx={{ color: "primary.main" }}
                        />
                        <Typography variant="subtitle1">
                          {user.firstName} {user.lastName} ({user.gender})
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify
                          icon="eva:email-outline"
                          sx={{ color: "primary.main" }}
                        />
                        <Typography variant="body2">
                          Email: {user.email}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify
                          icon="eva:phone-outline"
                          sx={{ color: "primary.main" }}
                        />
                        <Typography variant="body2">
                          Phone: {user.phoneNumber}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify
                          icon="eva:checkmark-circle-outline"
                          sx={{ color: "success.light" }}
                        />
                        <Typography variant="body2">
                          Status: {user.status}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No users in this room.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
