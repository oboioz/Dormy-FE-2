export interface IRequest {
  id: string;
  description: string;
  status: string;
  requestType: string;
  approverId: any;
  approverName: string;
  userId: string;
  userName: string;
  roomId: string;
  roomNumber: number;
  buildingId: string;
  buildingName: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: any;
  createdBy: string;
  lastUpdatedBy: any;
  isDeleted: boolean;
}
