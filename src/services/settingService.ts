import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { Profile, UserProfileResponseModel } from "../models/responses/UserModel";
import { privateAxios } from "../libs/axios";
import { SettingCreateUpdateRequestModel, SettingTurnOnOffRequestModel } from "../models/requests/SettingRequestModels";
import { SettingResponseModel } from "../models/responses/SettingResponseModels";
import { IEnumModel } from "../models/responses/EnumModels";

const createNewSetting = async (payload: SettingCreateUpdateRequestModel) => {
  try {
    var response = await privateAxios.post(API_URL.SETTING.CREATE, payload);
    if (response.status === HttpStatusCode.Created) {
      return response.data.result;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const updateSettingByKeyName = async (payload: SettingCreateUpdateRequestModel) => {
  try {
    var response = await privateAxios.put(API_URL.SETTING.UPDATE, payload);
    if (response.status === HttpStatusCode.Accepted) {
      return response.data.result;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getSettingByKeyname = async (keyname: string) => {
  try {
    var response = await privateAxios.get(API_URL.SETTING.GET_SINGLE + keyname);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as SettingResponseModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getAllSettings = async () => {
  try {
    var response = await privateAxios.get(API_URL.SETTING.GET_ALL);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as SettingResponseModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const turnOnOffSetting = async (payload: SettingTurnOnOffRequestModel) => {
  try {
    var response = await privateAxios.put(API_URL.SETTING.TURN_ON_OFF, payload);
    if (response.status === HttpStatusCode.Accepted) {
      return response.data.result;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getAllDataTypeEnums = async () => {
  try {
    var response = await privateAxios.get(API_URL.SETTING.GET_ALL_DATATYPES);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IEnumModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};


export const settingService = {
  createNewSetting: createNewSetting,
  updateSettingByKeyName: updateSettingByKeyName,
  getSettingByKeyname: getSettingByKeyname,
  getAllSettings: getAllSettings,
  turnOnOffSetting: turnOnOffSetting,
  getAllDataTypeEnums: getAllDataTypeEnums,
};
