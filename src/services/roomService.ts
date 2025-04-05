import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { IRoom } from "../models/responses/RoomModel";

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

export const roomService = {
  getRoomById,
};