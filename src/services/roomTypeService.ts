import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import {
  IRoomType,
  IRoomTypeCreate,
  IRoomTypeUpdate,
} from "../models/responses/RoomTypeModels";

const getRoomTypeBatch = async () => {
  try {
    var response = await privateAxios.get(API_URL.ROOM_TYPE.GET_BATCH);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IRoomType[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

const getRoomTypeById = async (id: string) => {
  try {
    var response = await privateAxios.get(API_URL.ROOM_TYPE.GET_SINGLE + id);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IRoomType;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const createRoomType = async (payload: IRoomTypeCreate) => {
  try {
    var response = await privateAxios.post(API_URL.ROOM_TYPE.BASE, payload);
    if (response.status === HttpStatusCode.Created) {
      return response.data.result;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const updateRoomType = async (payload: IRoomTypeUpdate) => {
  try {
    var response = await privateAxios.put(API_URL.ROOM_TYPE.BASE, payload);
    if (response.status === HttpStatusCode.Accepted) {
      return response.data.result;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const softDeleteRoomType = async (payload: string) => {
  try {
    var response = await privateAxios.delete(
      API_URL.ROOM_TYPE.SOFT_DELETE.replace("{id}", payload)
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as string[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

export const roomTypeService = {
  getRoomTypeBatch: getRoomTypeBatch,
  getRoomTypeById: getRoomTypeById,
  createRoomType: createRoomType,
  softDeleteRoomType: softDeleteRoomType,
  updateRoomType: updateRoomType,
};
