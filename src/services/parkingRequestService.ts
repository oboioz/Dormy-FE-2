import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { GetBatchRequestModel } from "../models/requests/CommonModels";
import {
  ICreateParkingRequest,
  IParkingRequest,
} from "../models/responses/ParkingRequestModels";

const getRequests = async (payload: GetBatchRequestModel) => {
  try {
    const response = await privateAxios.post(
      API_URL.PARKING_REQUEST.GET_BATCH,
      payload
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IParkingRequest[];
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
    const response = await privateAxios.get(
      API_URL.PARKING_REQUEST.GET_SINGLE + id
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IParkingRequest;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

//approve - reject
const approveRejectRequest = async (id: string, isAccepted: boolean) => {
  try {
    const response = await privateAxios.put(
      API_URL.PARKING_REQUEST.APPROVE_REJECT.replace("{id}", id),
      {
        isAccepted: isAccepted,
      }
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

const createParkingRequest = async (payload: ICreateParkingRequest) => {
  try {
    const response = await privateAxios.post(
      API_URL.PARKING_REQUEST.CREATE,
      payload
    );
    if (response.status === HttpStatusCode.Created) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const parkingRequestService = {
  getRequests,
  getRequestById,
  approveRejectRequest,
  createParkingRequest,
};
