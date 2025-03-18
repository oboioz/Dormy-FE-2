import { useState } from 'react';
// @mui
import {
  Dialog,
  InputAdornment,
  ListItemButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { IInvoiceRecipient } from '../../../../../@types/invoice';
import Iconify from '../../../../../components/iconify';
import Scrollbar from '../../../../../components/scrollbar';
import SearchNotFound from '../../../../../components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  selected: (selectedId: string) => boolean;
  onClose: VoidFunction;
  onSelect: (recipient: IInvoiceRecipient | null) => void;
  recipientOptions: IInvoiceRecipient[];
};

export default function InvoiceRecipientListDialog({
  open,
  selected,
  onClose,
  onSelect,
  recipientOptions,
}: Props) {
  const [searchRecipient, setSearchRecipient] = useState('');

  const dataFiltered = applyFilter(recipientOptions, searchRecipient);

  const isNotFound = !dataFiltered.length && !!searchRecipient;

  const handleSearchRecipient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRecipient(event.target.value);
  };

  const handleSelectRecipient = (recipient: IInvoiceRecipient | null) => {
    onSelect(recipient);
    setSearchRecipient('');
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
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
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {isNotFound ? (
        <SearchNotFound query={searchRecipient} sx={{ px: 3, pt: 5, pb: 10 }} />
      ) : (
        <Scrollbar sx={{ p: 1.5, pt: 0, maxHeight: 80 * 8 }}>
          {dataFiltered.map((recipient) => (
            <ListItemButton
              key={recipient.id}
              selected={selected(recipient.id)}
              onClick={() => handleSelectRecipient(recipient)}
              sx={{
                p: 1.5,
                borderRadius: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                },
              }}
            >
              <Typography variant="subtitle2">{recipient.name}</Typography>

              <Typography
                variant="caption"
                component="div"
                sx={{
                  my: 0.5,
                  color: 'info.main',
                  fontWeight: 'fontWeightMedium',
                }}
              >
                {recipient.email}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {recipient.phone}
              </Typography>
            </ListItemButton>
          ))}
        </Scrollbar>
      )}
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function applyFilter(array: IInvoiceRecipient[], query: string) {
  if (query) {
    return array.filter(
      (recipient) =>
        recipient.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        recipient.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        recipient.phone.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
