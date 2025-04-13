import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { IDashboard } from "../models/responses/DashboardModels";

const getDashboardInformation = async () => {
  try {
    var response = await privateAxios.get(API_URL.ADMIN.GET_DASHBOARD);
    if (response.status >= 200 && response.status < 300) {
      return response.data as IDashboard;
    }
    return undefined;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
};

export const dashboardService = {
  getDashboardInformation,
};
