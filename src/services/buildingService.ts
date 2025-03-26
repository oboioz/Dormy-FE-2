import { HttpStatusCode } from "axios";
import { privateAxios } from "../libs/axios";
import { BuildingModel } from "../models/responses/BuildingModels";
import { API_URL } from "../consts/APIConstants";
import { GetBatchRequestModel } from "../models/requests/CommonModels";

const getBuildingBatch = async (
  payload: GetBatchRequestModel
): Promise<BuildingModel[]> => {
  try {
    var response = await privateAxios.post(API_URL.BUILDING.GET_BATCH, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as BuildingModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getBuildingById = async (id: string) => {
  try {
    var response = await privateAxios.get(API_URL.BUILDING.GET_SINGLE + id);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as BuildingModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

export const buildingService = {
  getBuildingBatch: getBuildingBatch,
  getBuildingById: getBuildingById,
};
