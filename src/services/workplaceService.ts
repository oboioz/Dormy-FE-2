import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import {
  WorkplaceCreateModel,
  WorkplaceModel,
  WorkplaceUpdateModel,
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

const getWorkplaceById = async (id: string) => {
  try {
    var response = await privateAxios.get(API_URL.WORKPLACE.GET_SINGLE + id);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as WorkplaceModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
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

const updateWorkplace = async (payload: WorkplaceUpdateModel) => {
  try {
    var response = await privateAxios.put(API_URL.WORKPLACE.UPDATE, payload);
    if (response.status === HttpStatusCode.Accepted) {
      return true;
    } else {
      return response.data.errorMessage as string;
    }
  } catch (err: any) {
    return err.response.data.errorMessage as string;
  }
};

const softDeleteWorkplace = async (id: string) => {
  try {
    var response = await privateAxios.delete(
      API_URL.WORKPLACE.SOFT_DELETE.replace("{id}", id)
    );
    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    return false;
  }
};

export const workplaceService = {
  getUserWorkplace: getUserWorkplace,
  getAllWorkplace: getAllWorkplace,
  createWorkplace: createWorkplace,
  getWorkplaceById: getWorkplaceById,
  updateWorkplace: updateWorkplace,
  softDeleteWorkplace: softDeleteWorkplace,
};
