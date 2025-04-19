import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IRoom } from "../../models/responses/RoomModel";
import { fCurrency } from "../../utils/formatNumber";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[6],
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  "&:last-child": {
    paddingBottom: theme.spacing(3),
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  "&:last-child": {
    marginBottom: 0,
  },
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
          <StyledCardContent>
            <Typography
              variant="overline"
              sx={{ color: "text.disabled", mb: 2, fontWeight: "bold" }}
            >
              General Information
            </Typography>
            <StyledTypography variant="body2">
              <b>Block:</b> {buildingName}
            </StyledTypography>
            <StyledTypography variant="body2">
              <b>Room:</b> {floorNumber}.{roomNumber}
            </StyledTypography>
            <StyledTypography variant="body2">
              <b>Bed:</b> {totalUsedBed}/{totalAvailableBed}
            </StyledTypography>
            <StyledTypography variant="body2">
              <b>Price:</b> {fCurrency(price)} VND/person/month
            </StyledTypography>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      {/* Room Type and Equipment */}
      <Grid item xs={12} md={6}>
        <StyledCard>
          <StyledCardContent>
            <Typography
              variant="overline"
              sx={{ color: "text.disabled", mb: 2, fontWeight: "bold" }}
            >
              Room Type and Equipment
            </Typography>
            <StyledTypography variant="body2">
              <b>Room Type:</b> {roomTypeName}
            </StyledTypography>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      {/* Room Services */}
      <Grid item xs={12}>
        <StyledCard>
          <StyledCardContent>
            <Typography
              variant="overline"
              sx={{ color: "text.disabled", mb: 2, fontWeight: "bold" }}
            >
              Room Services
            </Typography>
            {roomServices && roomServices.length > 0 ? (
              roomServices.map((service) => (
                <StyledTypography key={service.id} variant="body2">
                  - <b>{service.roomServiceName}:</b> {fCurrency(service.cost)}{" "}
                  VND/{service.unit}
                </StyledTypography>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No services available.
              </Typography>
            )}
          </StyledCardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
}