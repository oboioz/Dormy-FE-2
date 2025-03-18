import { IUser } from "../../@types/user";
import { IHistory, IParkingSpot, IVehicle } from "../../@types/vehicle";


// Mock Users
const mockUsers: IUser[] = [
  {
    userID: 1,
    password: "securepass123",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    gender: "Male",
    dateOfBirth: new Date("2000-05-15"),
    nationalIDNumber: "A123456789",
    status: "Active",
  },
  {
    userID: 2,
    password: "anotherpass456",
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    phoneNumber: "555-987-6543",
    gender: "Female",
    dateOfBirth: new Date("1999-11-20"),
    nationalIDNumber: "B987654321",
    status: "Inactive",
  },
];

// Mock Parking Spots
const mockParkingSpots: IParkingSpot[] = [
  {
    parkingSpotID: 1,
    spotNumber: "A101",
    status: "Occupied",
    adminID: 1,
  },
  {
    parkingSpotID: 2,
    spotNumber: "B202",
    status: "Available",
    adminID: 2,
  },
];

// Mock Vehicles
const mockVehicles: IVehicle[] = [
  {
    vehicleID: 1,
    licensePlate: "ABC-1234",
    type: "Car",
    registrationDate: new Date("2023-06-15"),
    userID: mockUsers[0],
    parkingSpot: mockParkingSpots[0],
    status: "Parked",
  },
  {
    vehicleID: 2,
    licensePlate: "XYZ-5678",
    type: "Motorbike",
    registrationDate: new Date("2024-02-10"),
    userID: mockUsers[1],
    parkingSpot: mockParkingSpots[1],
    status: "Exited",
  },
];

// Mock History
const mockHistory: IHistory[] = [
  {
    historyID: 1,
    vehicleID: mockVehicles[0].vehicleID,
    action: "Parked",
    time: new Date("2024-07-10T09:30:00"),
    parkingSpotID: mockVehicles[0].parkingSpot.parkingSpotID,
  },
  {
    historyID: 2,
    vehicleID: mockVehicles[1].vehicleID,
    action: "Exited",
    time: new Date("2024-07-11T15:45:00"),
    parkingSpotID: mockVehicles[1].parkingSpot.parkingSpotID,
  },
];

export { mockHistory, mockParkingSpots, mockUsers, mockVehicles };

