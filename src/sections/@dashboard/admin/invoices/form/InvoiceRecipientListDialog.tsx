import { useState } from "react";
// @mui
import {
  Dialog,
  InputAdornment,
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Iconify from "../../../../../components/iconify";
import Scrollbar from "../../../../../components/scrollbar";
import SearchNotFound from "../../../../../components/search-not-found";
import { RoomRecipients } from "../../../../../models/responses/InvoiceResponseModels";

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  selected: (selectedId: string) => boolean;
  onClose: VoidFunction;
  onSelect: (recipient: RoomRecipients | null) => void;
  recipientOptions: RoomRecipients[];
};

export default function InvoiceRecipientListDialog({
  open,
  selected,
  onClose,
  onSelect,
  recipientOptions,
}: Props) {
  const [searchRecipient, setSearchRecipient] = useState("");

  const dataFiltered = applyFilter(recipientOptions, searchRecipient);

  const isNotFound = !dataFiltered.length && !!searchRecipient;

  const handleSearchRecipient = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchRecipient(event.target.value);
  };

  const handleSelectRecipient = (recipient: RoomRecipients | null) => {
    onSelect(recipient);
    setSearchRecipient("");
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} sx={{ maxHeight: "90vh" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 2.5, px: 3 }}
      >
        <Typography variant="h6"> Select recipient </Typography>
      </Stack>

      <Stack sx={{ p: 2.5 }}>
        <TextField
          value={searchRecipient}
          onChange={handleSearchRecipient}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {isNotFound ? (
        <SearchNotFound query={searchRecipient} sx={{ px: 3, pt: 5, pb: 10 }} />
      ) : (
        <Scrollbar sx={{ maxHeight: 400, overflowY: "auto", p: 1.5, pt: 0 }}>
          {dataFiltered.map((recipient) => (
            <ListItemButton
              key={recipient.roomId}
              selected={selected(recipient.roomId)}
              onClick={() => handleSelectRecipient(recipient)}
              sx={{
                p: 1.5,
                borderRadius: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                "&.Mui-selected": {
                  bgcolor: "action.selected",
                  "&:hover": {
                    bgcolor: "action.selected",
                  },
                },
              }}
            >
              <Typography variant="subtitle2">
                {`Room: ${recipient.roomNumber} - Floor: ${recipient.floorNumber} - Building: ${recipient.buildingName}`}
              </Typography>
            </ListItemButton>
          ))}
        </Scrollbar>
      )}
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function applyFilter(array: RoomRecipients[], query: string) {
  if (!query) {
    return array;
  }

  const lowerCaseQuery = query.toLowerCase();

  return array.filter((recipient) => {
    const roomNumber = recipient.roomNumber?.toString().toLowerCase() || "";
    const floorNumber = recipient.floorNumber?.toString().toLowerCase() || "";
    const buildingName = recipient.buildingName?.toLowerCase() || "";

    return (
      roomNumber.includes(lowerCaseQuery) ||
      floorNumber.includes(lowerCaseQuery) ||
      buildingName.includes(lowerCaseQuery)
    );
  });
}
