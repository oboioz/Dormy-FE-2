import { RoomTypeOptionModel } from "./RoomTypeModels";

export interface ContractExtensionExtendContractResponseModel {
  contractExtensionId: string;
  orderNo: number;
  submissionDate: string; // ISO format date string
  startDate: string;
  endDate: string;
  status: string;
  invoiceId?: string | null;
  invoiceStatus?: string | null;
  approverId?: string | null;
  approverFullName: string;
  roomId?: string | null;
  roomNumber?: number | null;
  roomTypeId?: string | null;
  roomTypeName?: string | null;
  buildingId?: string | null;
  buildingName?: string | null;
}

export interface ContractResponseModel {
  id: string;
  submissionDate: string;
  startDate: string;
  endDate: string;
  status: string;
  numberExtension: number;
  userId: string;
  userFullname: string;
  roomId: string;
  roomNumber: number;
  roomTypeId: string;
  roomTypeName: string;
  price: number;
  buildingId: string;
  buildingName: string;
  workplaceId?: string | null;
  workplaceName: string;
  insuranceCardNumber: string;
  registeredHospital: string;
  expirationDate: string;
  contractExtensions: ContractExtensionExtendContractResponseModel[];
}

export interface ContractBatchResponseModel {
  id: string;
  submissionDate: string;
  startDate: string;
  endDate: string;
  status: string;
  numberExtension: number;
  userId: string;
  userFullname: string;
  roomId: string;
  roomNumber: number;
  roomTypeId: string;
  roomTypeName: string;
  price: number;
  buildingId: string;
  buildingName: string;
}

export interface InformationOfTheLatestContract {
  contractId: string;
  startDate: string;          
  endDate: string;             
  status: string;
  numberExtension: number;
  roomId: string;
  roomNumber: number;
  buildingId: string;
  buildingName: string;
  roomTypeId: string;
  roomTypeName: string;
  price: number;
}

export interface UserInformation {
  gender: string;
}

export interface InitialCreateEntendContractDataResponseModel {
  userInformation: UserInformation;
  contractInformation?: InformationOfTheLatestContract; // nullable
  listRoomTypes?: RoomTypeOptionModel[];   // nullable
}
