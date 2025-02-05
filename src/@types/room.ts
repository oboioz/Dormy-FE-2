// ----------------------------------------------------------------------

// Represents a room entity in the database
export type IRoom = {
  roomID: number;
  roomNumber: string;
  floorNumber: number;
  roomType: IRoomType;
  totalUsedBed: number;
  totalAvailableBed: number;
  status: string;
  building: IBuilding;
};

// Represents a room type entity in the database
export type IRoomType = {
  roomTypeID: number;
  roomTypeName: string;
  description: string;
  capacity: number;
  price: number; // Use number to represent decimals in TypeScript
};

// Represents a room service entity in the database
export type IRoomService = {
  roomServiceID: number;
  roomServiceName: string;
  unit: string;
  cost: number; // Use number to represent decimals in TypeScript
};

// Represents a building entity in the database
export type IBuilding = {
  buildingID: number;
  name: string;
  floorNumber: number;
  genderRestriction: string;
  roomID: number; // Foreign key referencing room
};

// ----------------------------------------------------------------------
