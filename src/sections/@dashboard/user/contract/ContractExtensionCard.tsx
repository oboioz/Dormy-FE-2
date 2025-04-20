import { Box, Card, Stack, Typography } from "@mui/material";
import { fDate } from "../../../../utils/formatTime";
import { ContractExtensionExtendContractResponseModel } from "../../../../models/responses/ContractResponseModels";

type ContractExtensionCardProps = {
  extensions: ContractExtensionExtendContractResponseModel[];
};

export default function ContractExtensionCard({
  extensions,
}: ContractExtensionCardProps) {
  if (!extensions || extensions.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No extensions available.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {extensions.map((extension, index) => (
        <Card key={index} sx={{ p: 2, boxShadow: 3 }}>
          <Typography variant="body2">
            <b>Start Date:</b> {fDate(extension.startDate, "dd/MM/yyyy")}
          </Typography>
          <Typography variant="body2">
            <b>End Date:</b> {fDate(extension.endDate, "dd/MM/yyyy")}
          </Typography>
        </Card>
      ))}
    </Stack>
  );
}
