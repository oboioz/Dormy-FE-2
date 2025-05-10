import { HttpStatusCode } from "axios";
import { API_URL } from "../consts/APIConstants";
import { GuardianModel } from "../models/responses/GuardianModels";
import { privateAxios } from "../libs/axios";
import { ContractResponseModel, InitialCreateEntendContractDataResponseModel } from "../models/responses/ContractResponseModels";
import {
  ApproveOrRejectContractRequestModel,
  ContractExtensionCreateRequestModel,
  ContractRequestModel,
  GetBatchContractRequestModel,
} from "../models/requests/ContractRequestModels";
import { RoomTypeOptionModel } from "../models/responses/RoomTypeModels";

// Contract
const getBatchContracts = async (payload: GetBatchContractRequestModel) => {
  try {
    var response = await privateAxios.post(API_URL.CONTRACT.GET_BATCH, payload);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as ContractResponseModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const approveOrRejectContract = async (
  contractId: string,
  payload: ApproveOrRejectContractRequestModel
) => {
  try {
    const url = API_URL.CONTRACT.ACCEPT_OR_REJECT.replace("{id}", contractId);
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

const activeContract = async (contractId: string) => {
  try {
    const url = API_URL.CONTRACT.ACTIVE.replace("{id}", contractId);
    const response = await privateAxios.put(url);
    if (response.status === HttpStatusCode.Accepted) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const terminateContract = async (contractId: string) => {
  try {
    const url = API_URL.CONTRACT.TERMINATE.replace("{id}", contractId);
    const response = await privateAxios.put(url);
    if (response.status === HttpStatusCode.Accepted) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createContractExtension = async (payload: ContractExtensionCreateRequestModel) => {
  try {
    const url = API_URL.CONTRACT_EXTENSION.CREATE;
    const response = await privateAxios.post(url, payload);
    if (response.status === HttpStatusCode.Created) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getContractById = async (contractId: string) => {
  try {
    var response = await privateAxios.get(API_URL.CONTRACT.GET_SINGLE + contractId);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as ContractResponseModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getAllRoomTypesData = async () => {
  try {
    var response = await privateAxios.get(API_URL.CONTRACT.GET_ALL_ROOMTYPES);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as RoomTypeOptionModel[];
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getInitialCreateContractData = async () => {
  try {
    var response = await privateAxios.get(API_URL.CONTRACT.GET_INITIAL_CREATE_CONTRACT);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as InitialCreateEntendContractDataResponseModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getInitialExtendContractData = async (contractId: string) => {
  try {
    const url = API_URL.CONTRACT.GET_INITIAL_EXTEND_CONTRACT.replace("{id}", contractId);
    var response = await privateAxios.get(url);
    if (response.status === HttpStatusCode.Ok) {
      return response.data.result as InitialCreateEntendContractDataResponseModel;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const createNewContract = async (payload: ContractRequestModel) => {
  try {
    var response = await privateAxios.post(API_URL.CONTRACT.CREATE, payload);
    if (response.status === HttpStatusCode.Created) {
      return response.data.result;
    }
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const contractService = {
  getBatchContracts: getBatchContracts,
  approveOrRejectContract: approveOrRejectContract,
  activeContract: activeContract,
  terminateContract: terminateContract,
  createContractExtension: createContractExtension,
  getContractById: getContractById,
  getAllRoomTypesData: getAllRoomTypesData,
  getInitialCreateContractData: getInitialCreateContractData,
  getInitialExtendContractData: getInitialExtendContractData,
  createNewContract: createNewContract,
};
