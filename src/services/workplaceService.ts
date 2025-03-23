import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { WorkplaceModel } from "../models/responses/WorkplaceModels";
import { privateAxios } from "../libs/axios";

// Workplace
const getUserWorkplace = async () => {
  try {
    var response = await privateAxios.get(API_URL.WORKPLACE.GET);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result[0] as WorkplaceModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

export const workplaceService = {
  getUserWorkplace: getUserWorkplace,
};
