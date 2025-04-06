import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { GuardianModel } from "../models/responses/GuardianModels";
import { privateAxios } from "../libs/axios";

// Guardian
const getUserGuardian = async () => {
  try {
    var response = await privateAxios.get(API_URL.GUARDIAN.GET);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as GuardianModel[];
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

export const guardianService = {
  getUserGuardian: getUserGuardian,
};
