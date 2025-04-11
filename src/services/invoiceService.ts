import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { GetBatchInvoiceRequestModel, GetInitialInvoiceCreationRequestModel } from "../models/requests/InvoiceRequestModels";
import { DetailInvoiceResponseModel, GetInitialInvoiceCreationResponseModel, InvoiceResponseModel, RoomRecipients } from "../models/responses/InvoiceResponseModels";

// Guardian
const getBatchInvoices = async (payload: GetBatchInvoiceRequestModel) => {
  try {
    var response = await privateAxios.post(API_URL.INVOICE.GET_BATCH, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as InvoiceResponseModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

const getInvoiceById = async (invoiceId: string) => {
  try {
    var response = await privateAxios.get(API_URL.INVOICE.GET_SINGLE + invoiceId);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as DetailInvoiceResponseModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const getRoomsForInitialInvoiceCreation = async () => {
  try {
    var response = await privateAxios.get(API_URL.INVOICE.GET_ROOMs_FOR_CREATE_INITIAL_DATA);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as RoomRecipients[];
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

const getInitialInvoiceCreation = async (payload: GetInitialInvoiceCreationRequestModel) => {
  try {
    var response = await privateAxios.post(API_URL.INVOICE.GET_CREATE_INITIAL_DATA, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as GetInitialInvoiceCreationResponseModel;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};

export const invoiceService = {
    getBatchInvoices: getBatchInvoices,
    getInvoiceById: getInvoiceById,
    getInitialInvoiceCreation: getInitialInvoiceCreation,
    getRoomsForInitialInvoiceCreation: getRoomsForInitialInvoiceCreation,
};
