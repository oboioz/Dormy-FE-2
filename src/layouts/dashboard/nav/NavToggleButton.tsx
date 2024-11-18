import { IconButton, IconButtonProps } from "@mui/material";
import { NAV } from "../../../config-global";
import Iconify from "../../../components/iconify";

export default function NavToggleButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton
      size="small"
      sx={{
        p: 0.5,
        top: 32,
        position: "fixed",
        left: NAV.W_DASHBOARD - 12,
        bgcolor: "background.default",
        zIndex: (theme) => theme.zIndex.appBar + 1,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        "&:hover": {
          bgcolor: "background.default",
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify width={16} icon={"eva:arrow-ios-back-fill"} />
    </IconButton>
  );
}
