import { IRoomService } from "./RoomServiceModels";

export interface IRoomType {
  id: string;
  roomTypeName: string;
  description: string;
  capacity: number;
  price: number;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
  roomServices: IRoomService[];
}

export interface IRoomTypeCreate {
  roomTypeName: string;
  description: string;
  capacity: number;
  price: number;
  roomServiceIds: string[];
}

export interface IRoomTypeUpdate extends IRoomTypeCreate {
  id: string;
}
