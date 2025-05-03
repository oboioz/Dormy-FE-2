import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { Stack, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// @types
import { IUserAccountChangePassword } from "../../../../@types/user";
// components
import Iconify from "../../../../components/iconify";
import { useSnackbar } from "../../../../components/snackbar";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";
import { useAuthContext } from "../../../../auth/JwtContext";
import { useEffect, useState } from "react";
import {
  IChangePassword,
  Profile,
} from "../../../../models/responses/UserModel";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";
import { fDate } from "../../../../utils/formatTime";
import { UserStatusEnum } from "../../../../models/enums/UserStatusEnum";

// ----------------------------------------------------------------------

type FormValuesProps = IUserAccountChangePassword;
export interface IChangePasswordProps {
  isAdmin?: boolean;
}

export default function AccountChangePassword(props: IChangePasswordProps) {
  const { isAdmin } = props;
  const { user } = useAuthContext();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema) as any,
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleChangePassword = async (
    id: string,
    newPwd: string,
    oldPwd: string
  ) => {
    if (isAdmin) {
      var response = await httpClient.authService.changeAdminPassword({
        id: id,
        newPassword: newPwd,
        oldPassword: oldPwd,
      });
      if (response === true) {
        toast.success("Updated");
        window.location.reload();
      } else {
        toast.error(response);
      }
    } else {
      var response = await httpClient.authService.changeUserPassword({
        id: id,
        newPassword: newPwd,
        oldPassword: oldPwd,
      });
      if (response === true) {
        toast.success("Updated");
        window.location.reload();
      } else {
        toast.error(response);
      }
    }
  };

  const onSubmit = async (data: FormValuesProps) => {
    handleChangePassword(user?.id, data.newPassword, data.oldPassword);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
          <RHFTextField
            name="oldPassword"
            type="password"
            label="Old Password"
          />

          <RHFTextField
            name="newPassword"
            type="password"
            label="New Password"
            helperText={
              <Stack component="span" direction="row" alignItems="center">
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} />{" "}
                Password must be minimum 4+
              </Stack>
            }
          />

          <RHFTextField
            name="confirmNewPassword"
            type="password"
            label="Confirm New Password"
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
