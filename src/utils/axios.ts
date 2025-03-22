import axios, { HttpStatusCode } from "axios";
import { SignInModel } from "../models/requests/SignInModel";
import { API_URL } from "../consts/APIConstants";
import {
  AdminSignInResponse,
  Profile,
  UserSignInResponse,
} from "../models/responses/UserModel";
import { DormyLocalStorage } from "../consts/DormyConstants";

const axiosInstance = axios.create({ baseURL: API_URL.BASE_URL });

const adminSignIn = async (
  payload: SignInModel
): Promise<AdminSignInResponse | undefined> => {
  try {
    var response = await axiosInstance.post(API_URL.ADMIN.SIGN_IN, payload);
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
    var response = await axiosInstance.post(API_URL.USER.SIGN_IN, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as UserSignInResponse;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const userGetProfile = async (id: string) => {
  try {
    const token = localStorage.getItem(DormyLocalStorage.dormyToken);
    var response = await axiosInstance.get(API_URL.USER.GET_PROFILE + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as Profile;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

export const httpClient = {
  adminSignIn: adminSignIn,
  userSignIn: userSignIn,
  userGetProfile: userGetProfile,
};
