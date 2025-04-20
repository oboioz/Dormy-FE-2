export interface ContractResponseModel {
  id: string;
  submissionDate: Date;
  startDate: Date;
  endDate: Date;
  status: string;
  invoiceId: string;
  numberExtension: number;
  userId: string;
  userFullname: string;
  approverId: string;
  approverFullName: string;
  roomId: string;
  roomNumber: number;
  roomTypeId: string;
  roomTypeName: string;
  price: number;
  buildingId: string;
  buildingName: string;
  workplaceId: string;
  workplaceName: string;
  insuranceCardNumber: string;
  registeredHospital: string;
  expirationDate: Date;
  contractExtensions: ContractExtensionExtendContractResponseModel[];
//   createdByCreator: string;
//   lastUpdatedByUpdater: string;
//   createdDateUtc: string;
//   lastUpdatedDateUtc: string;
//   createdBy: string;
//   lastUpdatedBy: string;
//   isDeleted: boolean;
}

export interface ContractExtensionExtendContractResponseModel {
  contractExtensionId: string;
  submissionDate: Date;
  startDate: Date;
  endDate: Date;
  status: string;
}
