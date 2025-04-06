import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { HealthInsuranceResponseModel } from "../models/responses/HealthInsuranceModels";

// Health Insurance
const getUserHealthInsurance = async () => {
  try {
    var response = await privateAxios.post(API_URL.HEALTH_INSURANCE.GET_BATCH, {});
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result[0] as HealthInsuranceResponseModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

export const healthInsuranceService = {
    getUserHealthInsurance: getUserHealthInsurance,
};
