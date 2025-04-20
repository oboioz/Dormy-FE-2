import { Stack, Button, Typography, Box } from "@mui/material";
import { useAuthContext } from "../../../auth/JwtContext";

export default function NavDocs() {
  const { user } = useAuthContext();
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
          {user.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
        >
          {user.name}
        </Typography>
      </div>

      <Button variant="contained">{user.name}</Button>
    </Stack>
  );
}
