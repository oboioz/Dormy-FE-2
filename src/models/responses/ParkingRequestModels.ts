export interface IParkingRequest {
  id: string;
  description: string;
  status: string;
  userId: string;
  userFullName: string;
  parkingSpotId: string;
  parkingSpotName: string;
  parkingSpotStatus: string;
  vehicleId: string;
  licensePlate: string;
  vehicleType: string;
  approverId: any;
  approverUserFullName: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}
