export interface ContractExtensionExtendContractResponseModel {
  contractExtensionId: string;
  orderNo: number;
  submissionDate: string; // ISO format date string
  startDate: string;
  endDate: string;
  status: string;
  invoiceId?: string | null;
  approverId?: string | null;
  approverFullName: string;
  roomId?: string | null;
  roomNumber?: number | null;
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

