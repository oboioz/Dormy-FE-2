import { HttpStatusCode } from "axios";
import { SignInModel } from "../models/requests/SignInModel";
import { API_URL } from "../consts/APIConstants";
import {
  AdminSignInResponse,
  IChangePassword,
  Profile,
  UserInformation,
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

const getAllAdmins = async () => {
  try {
    var response = await privateAxios.get(API_URL.ADMIN.GET_ALL_ADMIN);
    if (response.status === HttpStatusCode.Ok) {
      return response.data as UserInformation[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getAdminInfo = async (id: string) => {
  try {
    var response = await privateAxios.get(API_URL.ADMIN.GET_INFO + id);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as UserInformation;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const changeAdminPassword = async (payload: IChangePassword) => {
  try {
    var response = await privateAxios.put(
      API_URL.ADMIN.CHANGE_PASSWORD,
      payload
    );
    console.log(response.data);
    if (response.status === HttpStatusCode.Ok) {
      return true;
    } else {
      return response.data.error;
    }
  } catch (err) {
    console.log(err);
    return err.response.data.error;
  }
};

const changeUserPassword = async (payload: IChangePassword) => {
  try {
    var response = await privateAxios.put(
      API_URL.USER.CHANGE_PASSWORD,
      payload
    );
    console.log(response.data);
    if (response.status === HttpStatusCode.Ok) {
      return true;
    } else {
      return response.data.error;
    }
  } catch (err) {
    console.log(err);
    return err.response.data.error;
  }
};

export const authService = {
  adminSignIn,
  userSignIn,
  getUsers,
  getAdminInfo,
  changeAdminPassword,
  changeUserPassword,
  getAllAdmins,
};
