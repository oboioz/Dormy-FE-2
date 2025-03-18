import { IAdmin } from "./admin";
import { IUser } from "./user";

// Represents a vehicle entity in the database
export type IVehicle = {
  vehicleID: number; // Primary key
  licensePlate: string; // Unique license plate
  type: string; // Type of the vehicle (e.g., car, bike, etc.)
  registrationDate: Date; // Date of vehicle registration
  userID: IUser; // Foreign key referencing a user
  parkingSpot: IParkingSpot; // Foreign key referencing a parking spot
  status: string; // Status of the vehicle (e.g., parked, exited, etc.)
};

// Represents a parking spot entity in the database
export type IParkingSpot = {
  parkingSpotID: number; // Primary key
  spotNumber: string; // Identifier for the parking spot
  status: string; // Status of the spot (e.g., available, occupied, etc.)
  adminID: number; // Foreign key referencing an admin
  capacity: number; // Maximum capacity of the parking spot
  usedSpot: number; // Number of spots currently in use
};


export type IHistory = {
  historyID: number; // Primary key
  vehicleID: number; // Foreign key referencing a vehicle
  action: string; // Description of the action (e.g., "parked", "exited")
  time: Date; // Timestamp of the action
  parkingSpotID: number; // Foreign key referencing a parking spot
};

export type IParkingRequest = {
  parkingRequestID: number; // Primary key
  status: "pending" | "approved" | "rejected"; // Enum for status
  timestamp: Date; // Timestamp of the request
  userID: IUser; // Reference to User
  parkingSpotID: IParkingSpot; // Reference to ParkingSpot
  vehicleID: IVehicle; // Reference to Vehicle
  approverID: IAdmin; // Reference to Admin who approves the request
};
