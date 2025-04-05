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
