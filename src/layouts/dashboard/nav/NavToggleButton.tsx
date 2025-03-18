import { IconButton, IconButtonProps } from "@mui/material";
import Iconify from "../../../components/iconify";

import { useSettingsContext } from "../../../components/settings";
import { NAV } from "../../../config-global";
import useResponsive from "../../../hooks/useResponsive";

export default function NavToggleButton({ sx, ...other }: IconButtonProps) {

  const { themeLayout, onToggleLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  if (!isDesktop) {
    return null;
  }

  return (
    <IconButton
      size="small"
      onClick={onToggleLayout}
      sx={{
        p: 1,
        top: 32,
        position: 'fixed',
        left: NAV.W_DASHBOARD - 12,
        bgcolor: 'background.default',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        boxShadow: (theme) => theme.shadows[3], // Add slight shadow for depth
        transition: "all 0.2s ease", // Smooth transition effect
        '&:hover': {
          bgcolor: 'background.default',
          transform: "scale(1.1)", // Slight scaling effect on hover
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={18}
        icon={themeLayout === 'vertical' ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </IconButton>
  );
}
