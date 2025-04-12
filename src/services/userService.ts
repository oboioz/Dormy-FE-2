import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { Profile } from "../models/responses/UserModel";
import { privateAxios } from "../libs/axios";

const userGetProfile = async (id: string) => {
  try {
    var response = await privateAxios.get(API_URL.USER.GET_PROFILE + id);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as Profile;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const userService = {
  userGetProfile,
};
