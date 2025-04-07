import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { GuardianModel } from "../models/responses/GuardianModels";
import { privateAxios } from "../libs/axios";
import { ContractResponseModel } from "../models/responses/ContractResponseModels";
import {
  ApproveOrRejectContractRequestModel,
  GetBatchContractRequestModel,
} from "../models/requests/ContractRequestModels";

// Contract
const getBatchContracts = async (payload: GetBatchContractRequestModel) => {
  try {
    var response = await privateAxios.post(API_URL.CONTRACT.GET_BATCH, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as ContractResponseModel[];
    }
    return undefined;
  } catch (err) {
    console.log(err);
  }
};

const approveOrRejectContract = async (
  contractId: string,
  payload: ApproveOrRejectContractRequestModel
) => {
  try {
    const url = API_URL.CONTRACT.ACCEPT_OR_REJECT.replace("{id}", contractId);
    const response = await privateAxios.put(url, payload);
    if (response.status === HttpStatusCode.Ok) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const contractService = {
  getBatchContracts: getBatchContracts,
  approveOrRejectContract: approveOrRejectContract,
};
