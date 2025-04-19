import { Button, Stack, Typography, Card, Grid } from "@mui/material";
import Iconify from "../../components/iconify";
import { useEffect, useState } from "react";
import { httpClient } from "../../services";
import { IParkingRequest } from "../../models/responses/ParkingRequestModels";
import { fDate } from "../../utils/formatTime";
import RequestStatusTag from "../tag/RequestStatusTag";

export default function MyParkingRequests() {
  const [parkingRequests, setParkingRequests] = useState<IParkingRequest[]>([]);
  const parkingRequestsView = parkingRequests.slice(0, 1);

  const fetchRequests = async () => {
    const request = await httpClient.parkingRequestService.getRequests({
      ids: [],
    });
    request.sort(
      (a, b) =>
        new Date(b.createdDateUtc).getTime() -
        new Date(a.createdDateUtc).getTime()
    );
    setParkingRequests(request.slice(0, 1));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="overline" sx={{ width: 1, color: "text.secondary" }}>
        My Parking Request
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {parkingRequestsView.map((request) => (
          <Card key={request.id} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {/* Created Date */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Created Date
                </Typography>
                <Typography variant="subtitle2">
                  {request.createdDateUtc
                    ? fDate(request.createdDateUtc, "dd/MM/yyyy hh:mm:ss")
                    : "--/--/--"}
                </Typography>
              </Grid>

              {/* Parking Spot Name */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Parking Spot Name
                </Typography>
                <Typography variant="subtitle2">
                  {request.parkingSpotName || "--"}
                </Typography>
              </Grid>

              {/* Parking Spot Status */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Parking Spot Status
                </Typography>
                <Typography variant="subtitle2">
                  {request.parkingSpotStatus || "--"}
                </Typography>
              </Grid>

              {/* License Plate */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  License Plate
                </Typography>
                <Typography variant="subtitle2">
                  {request.licensePlate || "--"}
                </Typography>
              </Grid>

              {/* Vehicle Type */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Vehicle Type
                </Typography>
                <Typography variant="subtitle2">
                  {request.vehicleType || "--"}
                </Typography>
              </Grid>

              {/* Description */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Description
                </Typography>
                <Typography variant="subtitle2">
                  {request.description || "--"}
                </Typography>
              </Grid>

              {/* Status */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Status
                </Typography>
                <Typography variant="subtitle2">
                  <RequestStatusTag status={request.status} />
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
