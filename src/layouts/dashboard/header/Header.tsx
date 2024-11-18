import { useTheme } from "@mui/material/styles";
import { Stack, AppBar, Toolbar, IconButton } from "@mui/material";
import { bgBlur } from "../../../utils/cssStyles";
import { HEADER, NAV } from "../../../config-global";
import Logo from "../../../components/logo";
import Iconify from "../../../components/iconify";

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const renderContent = (
    <>
      <Logo sx={{ mr: 2.5 }} />

      {!true && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: "text.primary" }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        {/* <LanguagePopover />

        <NotificationsPopover />

        <ContactsPopover />

        <AccountPopover /> */}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(true && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          ...(true && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
