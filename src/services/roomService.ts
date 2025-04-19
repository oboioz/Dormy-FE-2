import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import {
  ICreateRoomBatch,
  IRoom,
  IRoomUpdate,
} from "../models/responses/RoomModel";
import { RoomStatusEnum } from "../models/enums/RoomStatusEnum";

const getRoomById = async (id: string) => {
  try {
    var response = await privateAxios.get(API_URL.ROOM.GET_SINGLE + id);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IRoom;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const activeRoom = async (id: string) => {
  try {
    var response = await privateAxios.put(API_URL.ROOM.UPDATE_STATUS, {
      id: id,
      status: RoomStatusEnum.AVAILABLE,
    });
    return response.status;
  } catch (err) {
    console.log(err);
    return HttpStatusCode.InternalServerError;
  }
};

const deactivateRoom = async (id: string) => {
  try {
    var response = await privateAxios.put(API_URL.ROOM.UPDATE_STATUS, {
      id: id,
      status: RoomStatusEnum.UNDER_MAINTENANCE,
    });

    return response.status;
  } catch (err) {
    console.log(err);
    return HttpStatusCode.InternalServerError;
  }
};

const createRoomBatch = async (
  buildingId: string,
  payload: ICreateRoomBatch[]
) => {
  try {
    var response = await privateAxios.post(
      API_URL.ROOM.CREATE_BATCH.replace("{buildingId}", buildingId),
      payload
    );

    return response.status;
  } catch (err) {
    console.log(err);
    return HttpStatusCode.InternalServerError;
  }
};

const updateRoom = async (payload: IRoomUpdate) => {
  try {
    var response = await privateAxios.put(API_URL.ROOM.UPDATE, payload);

    return response.status;
  } catch (err) {
    console.log(err);
    return HttpStatusCode.InternalServerError;
  }
};

export const roomService = {
  getRoomById,
  activeRoom,
  deactivateRoom,
  createRoomBatch,
  updateRoom,
};
