import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import {
  IViolation,
  IViolationCreate,
  IViolationUpdate,
} from "../models/responses/ViolationModels";
import { GetBatchRequestModel } from "../models/requests/CommonModels";

const getViolationBatch = async (payload: GetBatchRequestModel) => {
  try {
    var response = await privateAxios.post(
      API_URL.VIOLATION.GET_BATCH,
      payload
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IViolation[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const createViolation = async (payload: IViolationCreate) => {
  try {
    var response = await privateAxios.post(API_URL.VIOLATION.CREATE, payload);
    if (response.status === HttpStatusCode.Ok) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateViolation = async (payload: IViolationUpdate) => {
  try {
    var response = await privateAxios.put(API_URL.VIOLATION.UPDATE, payload);
    if (response.status === HttpStatusCode.Ok) {
      return true;
    } else {
      return response.data.errorMessage as string;
    }
  } catch (err: any) {
    return err.response.data.errorMessage as string;
  }
};

const softDeleteViolation = async (id: string) => {
  try {
    var response = await privateAxios.delete(
      API_URL.VIOLATION.SOFT_DELETE.replace("{id}", id)
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

export const violationService = {
  getViolationBatch,
  createViolation,
  updateViolation,
  softDeleteViolation,
};
