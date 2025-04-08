export interface OvernightAbsenceResponseModel {
  id: string;
  startDateTime: string;
  endDateTime: string;
  reason: string;
  status: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  approverId: string;
  approverFullName: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}
