// @mui
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// utils
import { bgBlur } from "../../../../utils/cssStyles";

// components
import { CustomAvatar } from "../../../../components/custom-avatar";
import Image from "../../../../components/image";
import { useAuthContext } from "../../../../auth/JwtContext";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  "&:before": {
    ...bgBlur({
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const StyledInfo = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function ProfileCover() {
  const { user } = useAuthContext();

  const name = user?.name;
  const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&size=128`;

  return (
    <StyledRoot>
      <StyledInfo>
        <CustomAvatar
          src={avatarURL}
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4">{user?.name || "--"}</Typography>

          {/* <Typography sx={{ opacity: 0.72 }}>ROLE</Typography> */}
        </Box>
      </StyledInfo>

      <Image
        alt="cover"
        src="/static/mock-images/covers/cover_1.jpg"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
        }}
      />
    </StyledRoot>
  );
}
