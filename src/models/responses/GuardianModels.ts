export interface GuardianModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  relationshipToUser: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}

export interface IGuardianCreationModel {
  name: string;
  email?: string;
  phoneNumber: string;
  address: string;
  relationshipToUser: string;
}
