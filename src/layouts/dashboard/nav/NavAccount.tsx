import { Box, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { CustomAvatar } from "../../../components/custom-avatar";

const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

export default function NavAccount() {
  const name = "Guest";
  const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&size=128`;
  return (
    <StyledRoot>


      <CustomAvatar src={avatarURL} />

      <Box sx={{ ml: 2, minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap>
          Username
        </Typography>

        <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
          Role
        </Typography>
      </Box>
    </StyledRoot>
  );
}
