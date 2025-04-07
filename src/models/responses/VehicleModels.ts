export interface IVehicleCreationModel {
  licensePlate: string;
  vehicleType: string;
}

export interface IVehicle {
  id: string;
  licensePlate: string;
  vehicleType: string;
  parkingSpotId: string;
  parkingSpotName: string;
  userId: string;
  userFullname: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}
