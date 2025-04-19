import { Button, Stack, Typography } from "@mui/material";
import Iconify from "../../components/iconify";
import { VehicleHistoryModel } from "../../models/responses/VehicleModels";
import { useState } from "react";
import { fDate } from "../../utils/formatTime";

type Props = {
  histories: VehicleHistoryModel[]; // Correctly typed as an array of IHistory
};

export default function HistoryPartition({ histories }: Props) {
  const [isViewAll, setIsViewAll] = useState<boolean>(false);
  var historiesView = isViewAll ? histories : histories.slice(0, 2);

  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="overline" sx={{ width: 1, color: "text.secondary" }}>
        History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {historiesView.map((history) => (
          <Stack
            key={history.id}
            direction="row"
            justifyContent="space-between"
            sx={{ width: 1 }}
          >
            <Typography variant="body2" sx={{ minWidth: 120 }}>
              {history.createdDateUtc
                ? fDate(history.createdDateUtc, "dd/MM/yyyy hh:mm:ss")
                : "--/--/--"}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              {history.action === "IN" ? (
                <Iconify
                  icon="eva:arrow-circle-down-outline" // Icon for "IN"
                  color="success.main" // Green color for "IN"
                  width={20}
                  height={20}
                />
              ) : history.action === "OUT" ? (
                <Iconify
                  icon="eva:arrow-circle-up-outline" // Icon for "OUT"
                  color="error.main" // Red color for "OUT"
                  width={20}
                  height={20}
                />
              ) : null}
              <Typography
                variant="body2"
                color={history.action === "IN" ? "success.main" : "error.main"}
              >
                {history.action}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Button
        size="small"
        color="inherit"
        onClick={() => setIsViewAll((prev) => !prev)}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      >
        {isViewAll ? "Less" : "Full History"}
      </Button>
    </Stack>
  );
}
