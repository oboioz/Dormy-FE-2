import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios, publicAxios } from "../libs/axios";
import { IGetInitialRegistrationDataModel, IRegistrationInformationCreationModel, RegistrationAccommodationResponseModel } from "../models/responses/RegistrationModels";
import { ISearchBuildingAndRoomRequestModel } from "../models/requests/RegistrationRequestModels";
import { RoomSummaryResponseModel } from "../models/responses/RoomModel";

const registerAccommodation = async (payload: IRegistrationInformationCreationModel) => {
  try {
    var response = await publicAxios.post(API_URL.REGISTRATION.BASE, payload);
    return response;
    // if (response.status === HttpStatusCode.Created) {
    //   return response.data.result;
    // }
    // return undefined;
  } catch (err) {
    console.log(err);
  }
};

const getInitialRegistrationData = async () => {
  try {
    var response = await publicAxios.get(API_URL.REGISTRATION.GET_INITIAL_DATA);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IGetInitialRegistrationDataModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const searchBuildingsAndRoomsByGenderAndRoomType = async (payload: ISearchBuildingAndRoomRequestModel) => {
  try {
    var response = await publicAxios.post(API_URL.REGISTRATION.SEARCH_BUILDING_AND_ROOM, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const getRegistrationAccommodationBatch = async () => {
  try {
    var response = await privateAxios.get(API_URL.REGISTRATION.GET_BATCH);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as RegistrationAccommodationResponseModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getRoomSumaryById = async (roomId: string) => {
  try {
    var response = await publicAxios.get(API_URL.REGISTRATION.GET_ROOM_SUMARY + roomId);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as RoomSummaryResponseModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const registrationService = {
    registerAccommodation: registerAccommodation,
    getInitialRegistrationData: getInitialRegistrationData,
    searchBuildingsAndRoomsByGenderAndRoomType: searchBuildingsAndRoomsByGenderAndRoomType,
    getRegistrationAccommodationBatch: getRegistrationAccommodationBatch,
    getRoomSumaryById: getRoomSumaryById,
};
