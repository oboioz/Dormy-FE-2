// @mui
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer
} from "@mui/material";

// components
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useAuthGuard } from "../../auth/AuthGuard";
import { useAuthContext } from "../../auth/JwtContext";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { useSettingsContext } from "../../components/settings";
import { TableHeadCustom } from "../../components/table";
import { UserRole } from "../../models/enums/DormyEnums";
import { SettingCreateUpdateRequestModel, SettingTurnOnOffRequestModel } from "../../models/requests/SettingRequestModels";
import { SettingResponseModel } from "../../models/responses/SettingResponseModels";
import { PATH_ADMIN } from "../../routes/paths";
import SettingCreateEditModal from "../../sections/@dashboard/admin/setting/SettingCreateEditModal";
import SystemSettingsTableRow from "../../sections/@dashboard/admin/setting/SystemSettingsTableRow";
import { httpClient } from "../../services";
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "keyName", label: "Keyname", align: "left" },
  { id: "value", label: "Value", align: "center" },
  { id: "dataType", label: "Data type", align: "center" },
  { id: "isApplied", label: "isApplied", align: "center" },
  { id: "action", label: "", align: "left" },
];

// ----------------------------------------------------------------------

export default function SystemSettingsPage() {
  useAuthGuard(UserRole.ADMIN);

  const { themeStretch } = useSettingsContext();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingResponseModel[]>([]);

  const { user } = useAuthContext();

  const fetchAllSettings = async () => {
    var response = await httpClient.settingService.getAllSettings();
    setSettings(response);
  };

  useEffect(() => {
    fetchAllSettings();
  }, []);

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleEditSetting = async (updatedSetting: SettingResponseModel) => {
    try {
      const payload: SettingCreateUpdateRequestModel = {
        keyName: updatedSetting.keyName,
        dataType: updatedSetting.dataType,
        value: updatedSetting.value,
      };
      const response = await httpClient.settingService.updateSettingByKeyName(
        payload
      );
      if (response) {
        toast.success("Setting was updated successfully!");
        setSettings((prevSettings) =>
          prevSettings.map((setting) =>
            setting.keyName === updatedSetting.keyName ? updatedSetting : setting
          )
        );
        handleCloseCreateModal();
      }
    } catch (error) {
      toast.error("An error occurred while saving the setting.");
    }
  };

  const handleCreateSetting = async (
    formData: SettingCreateUpdateRequestModel
  ) => {
    try {
      const response = await httpClient.settingService.createNewSetting(
        formData
      );
      if (response) {
        toast.success("Setting was created successfully!");
        const addSetting: SettingResponseModel = {
          id: response[0],
          keyName: formData.keyName,
          dataType: formData.dataType,
          value: formData.value,
          isApplied: false,
          createdByCreator: user.name,
          createdDateUtc: new Date().toDateString(),
        };
        setSettings((prevSettings) => [...prevSettings, addSetting]);
        handleCloseCreateModal();
      }
    } catch (error) {
      toast.error("An error occurred while creating the setting.");
    }
  };

  const handleToggleAppliedSetting = async (keyName: string, isApplied: boolean) => {
    try {
      const payload: SettingTurnOnOffRequestModel = {
        keyName: keyName,
        isApplied: isApplied,
      };
      const response = await httpClient.settingService.turnOnOffSetting(payload);
      if (response) {
        toast.success("Setting was updated successfully!");
        setSettings((prev) =>
          prev.map((setting) =>
            setting.keyName === keyName ? { ...setting, isApplied } : setting
          )
        );
      }
    } catch (error) {
      toast.error("An error occurred while saving the setting.");
    }
  };

  return (
    <>
      <Helmet>
        <title>System Settings Page</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="System Settings"
          links={[
            { name: "Dashboard", href: PATH_ADMIN.root },
            { name: "Admin", href: PATH_ADMIN.profile },
            { name: "System Settings" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenCreateModal}
            >
              Add new setting
            </Button>
          }
        />

        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={"medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />
                <TableBody>
                  {settings?.map((setting) => (
                    <SystemSettingsTableRow
                      key={setting.id}
                      setting={setting}
                      onEditRow={(setting) => handleEditSetting(setting)}
                      onToggleApplied={handleToggleAppliedSetting}
                    />
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
      </Container>
      <SettingCreateEditModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateSetting}
      />
    </>
  );
}

// ----------------------------------------------------------------------
