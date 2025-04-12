// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { RHFTextField } from '../../../../../components/hook-form';
// components


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  const { control, watch } = useFormContext();

  const values = watch();

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <RHFTextField
        disabled
        name="invoiceNumber"
        label="Invoice number"
        value={`INV-${values.invoiceNumber}`}
      />

      <Controller
        name="dueDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Due date"
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            // renderInput={(params) => (
            //   <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            // )}
          />
        )}
      />
    </Stack>
  );
}
