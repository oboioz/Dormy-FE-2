import { Stack, Button, Typography, Box } from "@mui/material";

export default function NavDocs() {
  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        display: "block",
        textAlign: "center",
      }}
    >
      <Box component="img" src="/assets/illustrations/illustration_docs.svg" />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Tan Le
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
        >
          Tan Le
        </Typography>
      </div>

      <Button variant="contained">Tan Le</Button>
    </Stack>
  );
}
