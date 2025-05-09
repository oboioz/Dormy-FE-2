import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, FormProvider, Controller, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { SettingCreateUpdateRequestModel } from "../../../../models/requests/SettingRequestModels";
import { IEnumModel } from "../../../../models/responses/EnumModels";
import { httpClient } from "../../../../services";

type SettingCreateEditModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SettingCreateUpdateRequestModel) => void;
  initialData?: SettingCreateUpdateRequestModel;
};

export default function SettingCreateEditModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: SettingCreateEditModalProps) {
  const methods = useForm<SettingCreateUpdateRequestModel>({
    defaultValues: {
      keyName: "",
      value: "",
      dataType: "text", // Default data type
    },
  });

  const [dataTypeEnums, setDataTypeEnums] = useState<IEnumModel[]>([]);
  const [isValueEnabled, setIsValueEnabled] = useState(true);

  const { handleSubmit, reset, control } = methods;

  // Watch the value of dataType
  const dataType = useWatch({
    control,
    name: "dataType",
  });


  const fetchAllSettingDataTypes = async () => {
    const response = await httpClient.settingService.getAllDataTypeEnums();
    setDataTypeEnums(response);
  };

  // Reset form values when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setIsValueEnabled(initialData.dataType !== "BOOL");
    }
  }, [initialData, reset]);

  useEffect(() => {
    if (dataType === "BOOL") {
      setIsValueEnabled(false);
    } else {
      setIsValueEnabled(true);
    }
  }, [dataType]);

  useEffect(() => {
    fetchAllSettingDataTypes();
  }, []);

  const handleFormSubmit = (data: SettingCreateUpdateRequestModel) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Edit Setting" : "Create Setting"}
      </DialogTitle>
      <DialogContent dividers>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              {/* Key Name */}
              <Controller
                name="keyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Key Name"
                    fullWidth
                    variant="outlined"
                    // size="small"
                    required
                    disabled={initialData ? true : false}
                  />
                )}
              />

              {/* Data Type */}
              <Controller
                name="dataType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Data Type"
                    select
                    fullWidth
                    variant="outlined"
                    // size="small"
                    required
                  >
                    {dataTypeEnums?.map((dataType) => (
                      <MenuItem value={dataType.enumValue}>
                        {dataType.englishEnumDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              {/* Value */}
              {isValueEnabled && (
                <Controller
                  name="value"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Value"
                      fullWidth
                      variant="outlined"
                      // size="small"
                      required={dataType !== "BOOL"}
                    />
                  )}
                />
              )}
            </Stack>
            <DialogActions sx={{ mt: 3 }}>
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {initialData ? "Save Changes" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
