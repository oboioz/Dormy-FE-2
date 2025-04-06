// @mui
import {
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
// components

// assets
import { useNavigate } from "react-router-dom";
import { UploadIllustration } from "../../assets/illustrations";
import { DialogAnimate } from "../../components/animate";
import Iconify from "../../components/iconify";
import { PATH_AUTH } from "../../routes/paths";

// ----------------------------------------------------------------------

type RegistrationCompleteProps = {
  phoneNumber: string; // User's phone number
  dateOfBirth: Date | null; // User's date of birth
  open: boolean; // Dialog visibility
  onClose: () => void; // Function to close the dialog
};

export default function RegistrationComplete({
  phoneNumber,
  dateOfBirth,
  open,
  onClose,
}: RegistrationCompleteProps) {
  const navigate = useNavigate();

  return (
    <DialogAnimate
      fullScreen
      open={open}
      PaperProps={{
        sx: {
          maxWidth: { md: "calc(100% - 48px)" },
          maxHeight: { md: "calc(100% - 48px)" },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "grey.500",
        }}
      >
        <Iconify icon="eva:close-fill" />
      </IconButton>

      <Stack
        spacing={5}
        sx={{
          m: "auto",
          maxWidth: 560,
          textAlign: "center",
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4">Registration Completed!</Typography>

        <UploadIllustration sx={{ height: 260 }} />

        <Typography>
          Your registration was sent successfully.
          <br />
          <br />
          <strong>Username:</strong> {phoneNumber || "N/A"}
          <br />
          <strong>Password:</strong>{" "}
          {dateOfBirth
            ? (() => {
                const date = new Date(dateOfBirth);
                const day = String(date.getDate()).padStart(2, "0");
                const month = date.toLocaleString("en-US", { month: "short" });
                const year = date.getFullYear();
                return `${day}${month}${year}`;
              })()
            : "N/A"}
          <br />
          <br />
          We will send you a notification within 5 days when the registration
          process is completed.
          <br />
          If you have any questions or queries, feel free to get in contact with
          us.
          <br />
          <br />
          All the best,
        </Typography>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack
          spacing={2}
          justifyContent="space-between"
          direction={{ xs: "column-reverse", sm: "row" }}
        >
          <Button variant="outlined" onClick={onClose} size="large">
            Close
          </Button>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={() => navigate(PATH_AUTH.login)}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Back to Login page
          </Button>
        </Stack>
      </Stack>
    </DialogAnimate>
  );
}
