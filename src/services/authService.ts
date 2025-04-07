import { HttpStatusCode } from "axios";
import { SignInModel } from "../models/requests/SignInModel";
import { API_URL } from "../consts/APIConstants";
import {
  AdminSignInResponse,
  Profile,
  UserSignInResponse,
} from "../models/responses/UserModel";
import { privateAxios, publicAxios } from "../libs/axios";
import { GetBatchRequestModel } from "../models/requests/CommonModels";

const adminSignIn = async (
  payload: SignInModel
): Promise<AdminSignInResponse | undefined> => {
  try {
    var response = await publicAxios.post(API_URL.ADMIN.SIGN_IN, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as AdminSignInResponse;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const userSignIn = async (payload: SignInModel) => {
  try {
    var response = await publicAxios.post(API_URL.USER.SIGN_IN, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as UserSignInResponse;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async (payload: GetBatchRequestModel) => {
  try {
    var response = await privateAxios.post(API_URL.USER.GET_BATCH, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as Profile[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const authService = {
  adminSignIn,
  userSignIn,
  getUsers,
};
