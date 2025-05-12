import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { INotification } from "../models/responses/NotificationModels";
import { AnnouncementCreationRequestModel } from "../models/requests/NotificationRequestModels";

const getNotifications = async () => {
  try {
    var response = await privateAxios.get(API_URL.NOTIFICATION.GET);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as INotification[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const readNotifications = async (id: string) => {
  try {
    var response = await privateAxios.put(API_URL.NOTIFICATION.READ + id);
    if (response.status >= HttpStatusCode.Ok && response.status < 300) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const postNewAnnouncement = async (payload: AnnouncementCreationRequestModel) => {
  try {
    var response = await privateAxios.post(API_URL.NOTIFICATION.POST_ANNOUNCEMENT, payload);
    if (response.status === HttpStatusCode.Created) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const notificationService = {
  getNotifications,
  readNotifications,
  postNewAnnouncement,
};
