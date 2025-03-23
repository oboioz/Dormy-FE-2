import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import {
  IRoomService,
  IRoomServiceCreate,
  IRoomServiceUpdate,
  RoomServiceEnum,
} from "../models/responses/RoomServiceModels";
import { GetBatchRequestModel } from "../models/requests/CommonModels";
import { privateAxios } from "../libs/axios";


// Room Services
const getRoomServiceEnums = async () => {
  try {
    var response = await privateAxios.get(API_URL.ROOM_SERVICE.GET_ENUM);
    if (response.status === HttpStatusCode.Ok) {
      return response.data as RoomServiceEnum[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

const getRoomServiceBatch = async (payload: GetBatchRequestModel) => {
  try {
    var response = await privateAxios.post(API_URL.ROOM_SERVICE.GET_BATCH, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IRoomService[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

const createRoomServiceBatch = async (payload: IRoomServiceCreate[]) => {
  try {
    var response = await privateAxios.post(API_URL.ROOM_SERVICE.CREATE_BATCH, payload);
    if (response.status === HttpStatusCode.Created) {
      return response.data.result as string[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

const updateRoomServiceBatch = async (payload: IRoomServiceUpdate) => {
  try {
    var response = await privateAxios.put(API_URL.ROOM_SERVICE.UPDATE, payload);
    if (response.status === HttpStatusCode.Accepted) {
      return response.data.result;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const softDeleteRoomServiceBatch = async (payload: string[]) => {
  try {
    var response = await privateAxios.delete(API_URL.ROOM_SERVICE.SOFT_DELETE_BATCH, 
        {
            data: payload,
        }
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as string[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

export const roomServiceService = {
  getRoomServiceEnums: getRoomServiceEnums,
  getRoomServiceBatch: getRoomServiceBatch,
  createRoomServiceBatch: createRoomServiceBatch,
  softDeleteRoomServiceBatch: softDeleteRoomServiceBatch,
  updateRoomServiceBatch: updateRoomServiceBatch,
};
