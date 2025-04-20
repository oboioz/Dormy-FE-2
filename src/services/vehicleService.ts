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

const addVehicle = async (payload: IUpdateVehicle, userId: string) => {
  try {
    const response = await privateAxios.post(API_URL.VEHICLE.ADD, {
      ...payload,
      userId: userId,
    });
    if (response.status === HttpStatusCode.Created) {
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
      API_URL.VEHICLE_HISTORY.GET_BY_VEHICLE_ID + vehicleId
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

const softDeleteVehicle = async (vehicleId: string) => {
  try {
    const response = await privateAxios.delete(
      API_URL.VEHICLE_HISTORY.DELETE.replace("{id}", vehicleId)
    );
    if (response.status === HttpStatusCode.Accepted) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateVehicleHistory = async (vehicleId: string) => {
  try {
    const response = await privateAxios.post(
      API_URL.VEHICLE_HISTORY.UPDATE_HISTORY,
      {
        vehicleId: vehicleId,
      }
    );
    if (response.status === HttpStatusCode.Ok) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const vehicleService = {
  getVehicleBatch,
  getVehicleHistoriesByVehicleId,
  updateVehicle,
  addVehicle,
  softDeleteVehicle,
  updateVehicleHistory,
};
