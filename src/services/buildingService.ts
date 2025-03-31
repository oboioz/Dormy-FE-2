import { HttpStatusCode } from "axios";
import { privateAxios } from "../libs/axios";
import {
  BuildingCreateModel,
  BuildingModel,
} from "../models/responses/BuildingModels";
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

const createBuilding = async (payload: BuildingCreateModel) => {
  try {
    var response = await privateAxios.post(API_URL.BUILDING.CREATE, payload);
    if (response.status === HttpStatusCode.Created) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const softDeleteBuilding = async (id: string) => {
  try {
    var response = await privateAxios.delete(
      API_URL.BUILDING.SOFT_DELETE.replace("{id}", id)
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

export const buildingService = {
  getBuildingBatch: getBuildingBatch,
  getBuildingById: getBuildingById,
  createBuilding: createBuilding,
  softDeleteBuilding: softDeleteBuilding,
};
