// Represents a vehicle entity in the database
export type IVehicle = {
  vehicleID: number; // Primary key
  licensePlate: string; // Unique license plate
  type: string; // Type of the vehicle (e.g., car, bike, etc.)
  registrationDate: Date; // Date of vehicle registration
  userID: number; // Foreign key referencing a user
  parkingSpot: IParkingSpot; // Foreign key referencing a parking spot
};

// Represents a parking spot entity in the database
export type IParkingSpot = {
  parkingSpotID: number; // Primary key
  spotNumber: string; // Identifier for the parking spot
  status: string; // Status of the spot (e.g., available, occupied, etc.)
  adminID: number; // Foreign key referencing an admin
};

// Represents a history entity in the database
export type IHistory = {
  historyID: number; // Primary key
  vehicleID: number; // Foreign key referencing a vehicle
  action: string; // Description of the action (e.g., "parked", "exited")
  time: Date; // Timestamp of the action
  parkingSpotID: number; // Foreign key referencing a parking spot
};
