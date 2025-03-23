import { HttpStatusCode } from "axios";
import { SignInModel } from "../models/requests/SignInModel";
import { API_URL } from "../consts/APIConstants";
import {
  AdminSignInResponse,
  UserSignInResponse,
} from "../models/responses/UserModel";
import { publicAxios } from "../libs/axios";

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

export const authService = {
  adminSignIn: adminSignIn,
  userSignIn: userSignIn,
};
