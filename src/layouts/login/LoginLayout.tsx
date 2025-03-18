import { Stack, Typography } from "@mui/material";
import Image from "../../components/image";
import Logo from "../../components/logo";
import {
  StyledContent,
  StyledRoot,
  StyledSection,
  StyledSectionBg,
} from "./styles";

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: "absolute",
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection>
        <Typography
          variant="h3"
          sx={{ mb: 2, maxWidth: 480, textAlign: "center" }}
        >
          {title || "Hi, Welcome back"}
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={
            illustration || "/assets/illustrations/DormLogin.svg"
          }
          sx={
            { width: "40%", maxWidth: 720 }
          }
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
