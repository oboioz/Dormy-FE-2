export interface BuildingModel {
  id: string;
  name: string;
  totalFloors: number;
  totalRooms: number;
  genderRestriction: "MALE" | "FEMALE" | "OTHER"; // Assuming possible values for gender restriction
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: Date;
  lastUpdatedDateUtc: Date; // Same as above
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
  rooms: Room[];
}

export interface Room {
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

export interface BuildingCreateModel {
  name: string;
  totalFloors: number;
  genderRestriction: string;
  rooms: RoomCreateModel[];
}

export interface BuildingEditModel {
  id: string;
  name: string;
  totalFloors: number;
  genderRestriction: string;
}

export interface RoomCreateModel {
  roomTypeId: string;
  floorNumber: number;
  totalRoomsWantToCreate: number;
}
