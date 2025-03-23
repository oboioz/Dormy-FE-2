export interface RoomServiceEnum {
  enumValue: string;
  vietnameseEnumDescription: string;
  englishEnumDescription: string;
}

export interface IRoomService {
  id: string;
  roomServiceName: string;
  unit: string;
  cost: number;
  roomServiceType: string;
  isServiceIndicatorUsed: boolean;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}

export interface IRoomServiceCreate {
  roomServiceName: string;
  unit: string;
  cost: number;
  roomServiceType: string;
  isServiceIndicatorUsed: boolean;
}
