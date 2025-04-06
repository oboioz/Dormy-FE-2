export interface IHealthInsuranceCreationModel {
    insuranceCardNumber: string;
    registeredHospital: string;
    expirationDate: string;
}

export interface HealthInsuranceResponseModel {
    id: string;
    insuranceCardNumber: string;
    registeredHospital: string;
    expirationDate: string;
    createdByCreator: string;
    lastUpdatedByUpdater: string;
    createdDateUtc: string;
    lastUpdatedDateUtc: string;
    createdBy: string;
    lastUpdatedBy: string;
    isDeleted: boolean;
  }