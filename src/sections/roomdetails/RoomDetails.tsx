import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IRoom } from "../../models/responses/RoomModel";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[3],
}));

type Props = {
  room?: IRoom;
};

export default function RoomDetails({ room }: Props) {
  if (!room) {
    return null;
  }

  const {
    buildingName,
    floorNumber,
    roomNumber,
    totalUsedBed,
    totalAvailableBed,
    price,
    roomTypeName,
    roomServices,
  } = room;

  return (
    <Grid container spacing={3}>
      {/* General Information */}
      <Grid item xs={12} md={6}>
        <StyledCard>
          <CardContent>
            <Typography
              variant="overline"
              sx={{ color: "text.disabled", mb: 2 }}
            >
              General Information
            </Typography>
            <Typography variant="body2">Block: {buildingName}</Typography>
            <Typography variant="body2">
              Room: {floorNumber}.{roomNumber}
            </Typography>
            <Typography variant="body2">
              Bed: {totalUsedBed}/{totalAvailableBed}
            </Typography>
            <Typography variant="body2">
              Price: {price} VND/person/month
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Room Type and Equipment */}
      <Grid item xs={12} md={6}>
        <StyledCard>
          <CardContent>
            <Typography
              variant="overline"
              sx={{ color: "text.disabled", mb: 2 }}
            >
              Room Type and Equipment
            </Typography>
            <Typography variant="body2">Room Type: {roomTypeName}</Typography>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Room Services */}
      <Grid item xs={12}>
        <StyledCard>
          <CardContent>
            <Typography
              variant="overline"
              sx={{ color: "text.disabled", mb: 2 }}
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
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
}
