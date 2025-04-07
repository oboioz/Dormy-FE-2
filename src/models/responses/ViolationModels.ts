export interface IViolation {
  id: string;
  description: string;
  violationDate: string;
  penalty: number;
  userId: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}

export interface IViolationCreate {
  description: string;
  violationDate: Date;
  penalty: number;
  userId: string;
}

export interface IViolationUpdate extends IViolationCreate {
  id: string;
}
