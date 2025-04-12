// import { IAdmin } from "./admin";
// import { IParkingRequest } from "./parkingRequest";
// import { IParkingSpot } from "./parkingSpot";
// import { IUser } from "./user";
// import { IVehicle } from "./vehicle";

// Mock user
const mockUser: any = {
  userID: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "123456789",
};

// Mock parking spot
const mockParkingSpot: any = {
  parkingSpotID: 101,
  spotNumber: "A1",
  status: "available",
  adminID: 2,
  capacity: 10,
  usedSpot: 5,
};

// Mock vehicle
const mockVehicle: any = {
  vehicleID: 501,
  licensePlate: "XYZ-1234",
  type: "Car",
  registrationDate: new Date("2023-05-10"),
  userID: mockUser,
  parkingSpot: mockParkingSpot,
  status: "parked",
};

// Mock admin
const mockAdmin: any = {
  adminID: 2,
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@example.com",
  password: "securepassword",
  dateOfBirth: new Date("1990-07-15"),
  gender: "Female",
  phoneNumber: "987654321",
  jobTitle: "Parking Manager",
  workplaceID: 1,
  absenceID: 0,
  notificationID: 0,
  parkingSpotID: 101,
  imageURL: "https://example.com/profile.jpg",
};

// Mock parking request
const mockParkingRequests: any[] = [
  {
    parkingRequestID: 1001,
    status: "pending",
    timestamp: new Date(),
    userID: mockUser,
    parkingSpotID: mockParkingSpot,
    vehicleID: mockVehicle,
    approverID: mockAdmin,
  },
  {
    parkingRequestID: 1002,
    status: "approved",
    timestamp: new Date(),
    userID: mockUser,
    parkingSpotID: mockParkingSpot,
    vehicleID: mockVehicle,
    approverID: mockAdmin,
  },
  {
    parkingRequestID: 1003,
    status: "rejected",
    timestamp: new Date(),
    userID: mockUser,
    parkingSpotID: mockParkingSpot,
    vehicleID: mockVehicle,
    approverID: mockAdmin,
  },
];

export { mockParkingRequests };
