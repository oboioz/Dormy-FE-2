import { IRoomService } from "./RoomServiceModels";
import { Profile } from "./UserModel";

export interface IRoom {
  roomServices: IRoomService[];
  users: Profile[];
  id: string;
  roomNumber: number;
  floorNumber: number;
  totalAvailableBed: number;
  totalUsedBed: number;
  roomTypeId: string;
  roomTypeName: string;
  price: number;
  status: string;
  buildingId: string;
  buildingName: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}

export interface ICreateRoomBatch {
  roomTypeId: string;
  floorNumber: number;
  totalRoomsWantToCreate: number;
}

export interface IRoomUpdate {
  id: string;
  roomTypeId: string;
  floorNumber: number;
}

export interface RoomServiceSummaryResponseModel {
  id: string;
  roomServiceName: string;
  unit: string;
  cost: number;
  roomServiceType: string;
  isServiceIndicatorUsed: boolean;
}

export interface RoomSummaryResponseModel {
  id: string;
  roomNumber: number;
  floorNumber: number;
  roomTypeId: string;
  roomTypeName: string;
  price: number;
  buildingId: string;
  buildingName: string;
  roomServices: RoomServiceSummaryResponseModel[];
}
