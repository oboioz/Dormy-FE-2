import { useState } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Button, Divider, Stack, Typography } from '@mui/material';


//
import { _invoiceAddressTo } from '../../../../../_mock/arrays';
import Iconify from '../../../../../components/iconify';
import useResponsive from '../../../../../hooks/useResponsive';
import InvoiceRecipientListDialog from './InvoiceRecipientListDialog';

// ----------------------------------------------------------------------

export default function InvoiceNewEditAddress() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { invoiceTo } = values;

  const [openTo, setOpenTo] = useState(false);

  const handleOpenTo = () => {
    setOpenTo(true);
  };

  const handleCloseTo = () => {
    setOpenTo(false);
  };

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          flexItem
          orientation={upMd ? 'vertical' : 'horizontal'}
          sx={{ borderStyle: 'dashed' }}
        />
      }
      sx={{ p: 3 }}
    >

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            To:
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon={'eva:edit-fill'} />}
            onClick={handleOpenTo}
          >
            Change
          </Button>

          <InvoiceRecipientListDialog
            open={openTo}
            onClose={handleCloseTo}
            selected={(selectedId: string) => invoiceTo?.id === selectedId}
            onSelect={(address) => setValue('invoiceTo', address)}
            recipientOptions={_invoiceAddressTo}
          />
        </Stack>

        {invoiceTo ? (
          <AddressInfo name={invoiceTo.name} email={invoiceTo.email} phone={invoiceTo.phoneNumber} />
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {(errors.invoiceTo as any)?.message}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type AddressInfoProps = {
  name: string;
  email: string;
  phone: string;
};

function AddressInfo({ name, email, phone }: AddressInfoProps) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        {email}
      </Typography>
      <Typography variant="body2">Phone: {phone}</Typography>
    </>
  );
}
