import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { startOfMonth, subMonths } from "date-fns";

type Props = {
  isEdit: boolean;
  invoiceMonthYear?: Date | null;
  dueDate?: Date | null;
};

export default function InvoiceNewEditStatusDate({
  isEdit,
  invoiceMonthYear,
  dueDate,
}: Props) {
  const { control, setValue } = useFormContext();

  const minInvoiceMonthYear = subMonths(new Date(), 3);
  const currentDate = new Date();

  // Set initial values when isEdit = true
  useEffect(() => {
    if (isEdit) {
      if (invoiceMonthYear) {
        setValue("invoiceMonthYear", invoiceMonthYear);
      }
      if (dueDate) {
        setValue("dueDate", dueDate);
      }
    }
  }, [isEdit, invoiceMonthYear, dueDate, setValue]);

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
