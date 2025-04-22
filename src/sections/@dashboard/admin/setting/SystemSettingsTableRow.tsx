import { useState } from "react";
// @mui
import {
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Switch,
} from "@mui/material";
// components
import Iconify from "../../../../components/iconify";
import { SettingResponseModel } from "../../../../models/responses/SettingResponseModels";
import SettingCreateEditModal from "./SettingCreateEditModal";

// ----------------------------------------------------------------------

type Props = {
  setting: SettingResponseModel;
  onEditRow: (updatedSetting: SettingResponseModel) => void;
  onToggleApplied: (keyName: string, isApplied: boolean) => void;
};

export default function SystemSettingsTableRow({
  setting,
  onEditRow,
  onToggleApplied,
}: Props) {
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditSetting = (updatedSetting: SettingResponseModel) => {
    onEditRow(updatedSetting);
    handleCloseEditModal();
  };

  const handleToggleApplied = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleApplied(setting.keyName, event.target.checked);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {setting.keyName}
          </Typography>
        </TableCell>

        <TableCell align="center">{setting.value}</TableCell>

        <TableCell align="center">{setting.dataType}</TableCell>

        {/* Toggle for isApplied */}
        <TableCell align="center">
          <Switch
            checked={setting.isApplied}
            onChange={handleToggleApplied}
            color="primary"
          />
        </TableCell>

        <TableCell align="right">
          <IconButton color={"inherit"} onClick={handleOpenEditModal}>
            <Iconify icon="eva:edit-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <SettingCreateEditModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        onSubmit={handleEditSetting}
        initialData={setting}
      />
    </>
  );
}