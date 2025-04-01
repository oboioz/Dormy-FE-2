import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import {
  WorkplaceCreateModel,
  WorkplaceModel,
} from "../models/responses/WorkplaceModels";
import { privateAxios } from "../libs/axios";

// Workplace
const getUserWorkplace = async () => {
  try {
    var response = await privateAxios.get(API_URL.WORKPLACE.GET);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result[0] as WorkplaceModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const getAllWorkplace = async () => {
  try {
    var response = await privateAxios.get(API_URL.WORKPLACE.GET);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as WorkplaceModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const createWorkplace = async (payload: WorkplaceCreateModel) => {
  try {
    var response = await privateAxios.post(API_URL.WORKPLACE.CREATE, payload);
    if (response.status === HttpStatusCode.Created) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const workplaceService = {
  getUserWorkplace: getUserWorkplace,
  getAllWorkplace: getAllWorkplace,
  createWorkplace: createWorkplace,
};
