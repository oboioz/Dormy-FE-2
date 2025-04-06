import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";

type RHFDatePickerProps = TextFieldProps & {
  name: string;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  rules?: object;
};

export function RHFDatePicker({ name, label, minDate, maxDate, rules, helperText, ...other }: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          label={label}
          minDate={minDate ? minDate : new Date("1900-01-01")}
          maxDate={maxDate ? maxDate : null}
          slots={{
            textField: TextField,
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error ? error.message : helperText,
              ...other,
            },
          }}
        />
      )}
    />
  );
}