import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { GetVehicleRequestBatchModel } from "../models/requests/CommonModels";
import {
  IUpdateVehicle,
  IVehicle,
  VehicleHistoryModel,
} from "../models/responses/VehicleModels";

const getVehicleBatch = async (payload: GetVehicleRequestBatchModel) => {
  try {
    const response = await privateAxios.post(
      API_URL.VEHICLE.GET_BATCH,
      payload
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IVehicle[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const updateVehicle = async (payload: IUpdateVehicle) => {
  try {
    const response = await privateAxios.put(API_URL.VEHICLE.UPDATE, payload);
    if (response.status === HttpStatusCode.Accepted) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getVehicleHistoriesByVehicleId = async (vehicleId: string) => {
  try {
    const response = await privateAxios.get(
      API_URL.VEHICLE_HISTORY.GET_BY_vEHICLE_ID + vehicleId
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as VehicleHistoryModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const vehicleService = {
  getVehicleBatch,
  getVehicleHistoriesByVehicleId,
  updateVehicle,
};
