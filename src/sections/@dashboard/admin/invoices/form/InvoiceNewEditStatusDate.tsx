import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { RHFTextField } from "../../../../../components/hook-form";
import { startOfMonth, subMonths } from "date-fns";

export default function InvoiceNewEditStatusDate() {
  const { control, watch } = useFormContext();

  const values = watch();
  
  // Calculate minimum month/year for invoiceMonthYear
  const minInvoiceMonthYear = subMonths(new Date(), 3);

  // Get the current date for dueDate
  const currentDate = new Date();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        sx={{ p: 3, bgcolor: "background.neutral" }}
      >
        <Controller
          name="invoiceMonthYear"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              views={["year", "month"]}
              label="Invoice Month/Year"
              minDate={startOfMonth(minInvoiceMonthYear)}
              value={field.value}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Due date"
              minDate={currentDate}
              value={field.value}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
