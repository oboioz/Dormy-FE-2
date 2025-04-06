import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { publicAxios } from "../libs/axios";
import { IGetInitialRegistrationDataModel, IRegistrationInformationCreationModel } from "../models/responses/RegistrationModels";
import { ISearchBuildingAndRoomRequestModel } from "../models/requests/RegistrationRequestModels";

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

export const registrationService = {
    registerAccommodation: registerAccommodation,
    getInitialRegistrationData: getInitialRegistrationData,
    searchBuildingsAndRoomsByGenderAndRoomType: searchBuildingsAndRoomsByGenderAndRoomType,
};
