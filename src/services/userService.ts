import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { Profile, UserProfileResponseModel } from "../models/responses/UserModel";
import { privateAxios } from "../libs/axios";

const userGetProfile = async (id: string) => {
  try {
    var response = await privateAxios.get(API_URL.USER.GET_PROFILE + id);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as UserProfileResponseModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getAllUsersForAdmin = async () => {
  try {
    var response = await privateAxios.post(API_URL.USER.GET_BATCH, {});
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as Profile[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getUserProfileByUseridForAdmin = async (userId: string) => {
  try {
    var response = await privateAxios.get(API_URL.ADMIN.GET_USER_PROFILE + userId);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as UserProfileResponseModel;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const userService = {
  userGetProfile: userGetProfile,
  getAllUsersForAdmin: getAllUsersForAdmin,
  getUserProfileByUseridForAdmin: getUserProfileByUseridForAdmin,
};
