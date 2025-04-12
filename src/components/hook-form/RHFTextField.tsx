import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
  label: string;
  multiline?: boolean;
  rows?: number;
  rules?: object;
  disabled?: boolean;
};

export default function RHFTextField({
  name,
  label,
  multiline,
  rows,
  rules,
  disabled,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          label={label}
          multiline={multiline}
          rows={rows}
          error={!!errors[name]}
          helperText={errors[name]?.message?.toString() || ""} // Ensure helperText is a string
        />
      )}
    />
  );
}