import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { privateAxios } from "../libs/axios";
import { GetBatchInvoiceRequestModel } from "../models/requests/InvoiceRequestModels";
import { InvoiceResponseModel } from "../models/responses/InvoiceResponseModels";

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

export const invoiceService = {
    getBatchInvoices: getBatchInvoices,
};
