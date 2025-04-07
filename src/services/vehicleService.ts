import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { GetVehicleRequestBatchModel } from "../models/requests/CommonModels";
import { IVehicle } from "../models/responses/VehicleModels";

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

export const vehicleService = {
  getVehicleBatch,
};
