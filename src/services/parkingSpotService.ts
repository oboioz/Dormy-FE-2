import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { GetBatchRequestModel } from "../models/requests/CommonModels";
import {
  IParkingSpot,
  IParkingSpotCreateModel,
  IParkingSpotUpdateModel,
} from "../models/responses/ParkingSpotModels";

const getParkingSpotBatch = async (payload: GetBatchRequestModel) => {
  try {
    const response = await privateAxios.post(
      API_URL.PARKING_SPOT.GET_BATCH,
      payload
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IParkingSpot[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getParkingSpotSingle = async (id: string) => {
  try {
    const response = await privateAxios.get(
      API_URL.PARKING_SPOT.GET_SINGLE + id
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IParkingSpot;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const updateStatus = async (id: string, status: string) => {
  try {
    const response = await privateAxios.put(
      API_URL.PARKING_SPOT.UPDATE_STATUS,
      {
        id: id,
        status: status,
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

const updateParkingSpot = async (payload: IParkingSpotUpdateModel) => {
  try {
    const response = await privateAxios.put(API_URL.PARKING_SPOT.UPDATE, payload);
    if (response.status === HttpStatusCode.Accepted) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createParkingSpot = async (payload: IParkingSpotCreateModel) => {
  try {
    const response = await privateAxios.post(
      API_URL.PARKING_SPOT.CREATE,
      payload
    );
    if (response.status === HttpStatusCode.Created) {
      return response.data.result;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const softDelete = async (id: string) => {
  try {
    const response = await privateAxios.delete(
      API_URL.PARKING_SPOT.SOFT_DELETE.replace("{id}", id)
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

const createParkingSpotInvoiceForAllUsers = async (parkingSpotId: string) => {
  try {
    const response = await privateAxios.post(
      API_URL.PARKING_SPOT.CREATE_BATCH_INVOICES.replace("{id}", parkingSpotId)
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

export const parkingSpotService = {
  getParkingSpotBatch,
  getParkingSpotSingle,
  updateStatus,
  createParkingSpot,
  updateParkingSpot,
  softDelete,
  createParkingSpotInvoiceForAllUsers,
};
