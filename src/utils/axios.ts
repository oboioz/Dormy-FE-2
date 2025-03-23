import axios, { HttpStatusCode } from "axios";
import { SignInModel } from "../models/requests/SignInModel";
import { API_URL } from "../consts/APIConstants";
import {
  AdminSignInResponse,
  Profile,
  UserSignInResponse,
} from "../models/responses/UserModel";
import { DormyLocalStorage } from "../consts/DormyConstants";
import { WorkplaceModel } from "../models/responses/WorkplaceModels";
import { GuardianModel } from "../models/responses/GuardianModels";
import {
  IRoomService,
  IRoomServiceCreate,
  RoomServiceEnum,
} from "../models/responses/RoomServiceModels";
import { GetBatchRequestModel } from "../models/requests/CommonModels";

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

// Workplace
const getUserWorkplace = async () => {
  try {
    const token = localStorage.getItem(DormyLocalStorage.dormyToken);
    var response = await axiosInstance.get(API_URL.WORKPLACE.GET, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result[0] as WorkplaceModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

// Guardian
const getUserGuardian = async () => {
  try {
    const token = localStorage.getItem(DormyLocalStorage.dormyToken);
    var response = await axiosInstance.get(API_URL.GUARDIAN.GET, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result[0] as GuardianModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

// Room Services
const getRoomServiceEnums = async () => {
  try {
    const token = localStorage.getItem(DormyLocalStorage.dormyToken);
    var response = await axiosInstance.get(API_URL.ROOM_SERVICE.GET_ENUM, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === HttpStatusCode.Ok) {
      return response.data as RoomServiceEnum[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

const getRoomServiceBatch = async (payload: GetBatchRequestModel) => {
  try {
    const token = localStorage.getItem(DormyLocalStorage.dormyToken);
    var response = await axiosInstance.post(
      API_URL.ROOM_SERVICE.GET_BATCH,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as IRoomService[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

const createRoomServiceBatch = async (payload: IRoomServiceCreate[]) => {
  try {
    const token = localStorage.getItem(DormyLocalStorage.dormyToken);
    var response = await axiosInstance.post(
      API_URL.ROOM_SERVICE.CREATE_BATCH,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === HttpStatusCode.Created) {
      return response.data.result as string[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

export const httpClient = {
  adminSignIn: adminSignIn,
  userSignIn: userSignIn,
  userGetProfile: userGetProfile,
  getUserWorkplace: getUserWorkplace,
  getUserGuardian: getUserGuardian,
  getRoomServiceEnums: getRoomServiceEnums,
  getRoomServiceBatch: getRoomServiceBatch,
  createRoomServiceBatch: createRoomServiceBatch,
};
