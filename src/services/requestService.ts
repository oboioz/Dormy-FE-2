import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { GetBatchRequestModel } from "../models/requests/CommonModels";
import { IRequest } from "../models/responses/RequestModel";

const getRequests = async (payload: GetBatchRequestModel) => {
  try {
    const response = await privateAxios.post(
      API_URL.REQUEST.GET_BATCH,
      payload
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IRequest[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

//get single
const getRequestById = async (id: string) => {
  try {
    const response = await privateAxios.get(API_URL.REQUEST.GET_SINGLE + id);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IRequest;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

//get single
const approveRejectRequest = async (id: string, isApproved: boolean) => {
  try {
    const response = await privateAxios.put(
      API_URL.REQUEST.APPROVE_REJECT.replace("{id}", id),
      {
        id: id,
        isApproved: isApproved,
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

export const requestService = {
  getRequests,
  getRequestById,
  approveRejectRequest,
};
