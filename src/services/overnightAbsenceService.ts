import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { OvernightAbsenceResponseModel } from "../models/responses/OvernightAbsenceResponseModels";
import {
  ApproveOrRejectOvernightAbsenceRequestModel,
  CreateOvernightAbsenceRequestModel,
  GetBatchOvernightAbsenceRequestModel,
  UpdateOvernightAbsenceRequestModel,
} from "../models/requests/OvernightAbsenceRequestModels";

// Overnight Absence
const getAllUserOvernightAbsences = async () => {
  try {
    var response = await privateAxios.post(
      API_URL.OVERNIGHT_ABSENCE.GET_BATCH,
      {}
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as OvernightAbsenceResponseModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getBatchOvernightAbsences = async (payload: GetBatchOvernightAbsenceRequestModel) => {
  try {
    var response = await privateAxios.post(
      API_URL.OVERNIGHT_ABSENCE.GET_BATCH,
      payload
    );
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as OvernightAbsenceResponseModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const createOvernightAbsence = async (
  payload: CreateOvernightAbsenceRequestModel
) => {
  try {
    var response = await privateAxios.post(
      API_URL.OVERNIGHT_ABSENCE.CREATE,
      payload
    );
    if (response.status === HttpStatusCode.Created) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateOvernightAbsence = async (
  payload: UpdateOvernightAbsenceRequestModel
) => {
  try {
    var response = await privateAxios.put(
      API_URL.OVERNIGHT_ABSENCE.UPDATE,
      payload
    );
    if (response.status === HttpStatusCode.Accepted) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const approveOrRejectOvernightAbsence = async (
  id: string,
  payload: ApproveOrRejectOvernightAbsenceRequestModel
) => {
  try {
    const url = API_URL.OVERNIGHT_ABSENCE.APPROVE_REJECT.replace("{id}", id);
    const response = await privateAxios.put(url, payload);
    if (response.status === HttpStatusCode.Accepted) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const overnightAbsenceService = {
  getAllUserOvernightAbsences: getAllUserOvernightAbsences,
  createOvernightAbsence: createOvernightAbsence,
  updateOvernightAbsence: updateOvernightAbsence,
  getBatchOvernightAbsences: getBatchOvernightAbsences,
  approveOrRejectOvernightAbsence: approveOrRejectOvernightAbsence,
};
