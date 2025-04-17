import { extend } from "lodash";
import { IVehicle } from "./VehicleModels";

export interface IParkingSpot {
  id: string;
  parkingSpotName: string;
  capacitySpots: number;
  currentQuantity: number;
  status: string;
  createdByCreator?: string;
  lastUpdatedByUpdater?: string;
  createdDateUtc?: string;
  lastUpdatedDateUtc?: string;
  createdBy?: string;
  lastUpdatedBy?: string;
  isDeleted?: boolean;
  vehicles: IVehicle[]
}

export interface IParkingSpotCreateModel {
  parkingSpotName: string;
  capacitySpots: number;
}

export interface IParkingSpotUpdateModel extends IParkingSpotCreateModel {
  id: string;
}
