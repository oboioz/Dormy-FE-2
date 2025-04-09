export interface IVehicleCreationModel {
  licensePlate: string;
  vehicleType: string;
}

export interface IUpdateVehicle extends IVehicleCreationModel {
  id: string;
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

export interface VehicleHistoryModel {
  id: string;
  action: string;
  vehicleId: string;
  licensePlate: string;
  vehicleType: string;
  parkingSpotId: string;
  parkingSpotName: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}
