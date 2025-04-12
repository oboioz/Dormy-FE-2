import { IAdmin } from "../../@types/admin";
import { IRequest } from "../../@types/request";
import { IRoom } from "../../@types/room";
import { IUser } from "../../@types/user";
import _mock from "../_mock";
import { randomInArray } from "../utils";

const _users: any[] = [...Array(10)].map((_, index) => ({
  userId: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  phone: _mock.phoneNumber(index),
}));

const _admins: any[] = [...Array(5)].map((_, index) => ({
  adminId: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  phone: _mock.phoneNumber(index),
}));

const _rooms: any[] = [...Array(15)].map((_, index) => ({
  roomID: _mock.id(index),
  roomNumber: `Room ${100 + index}`,
  building: `Building ${randomInArray(["A", "B", "C", "D"])}`,
  capacity: randomInArray([1, 2, 3, 4]),
  currentOccupants: randomInArray([0, 1, 2, 3, 4]),
}));

export const _mockRequests: any[] = [
  {
    requestID: 1,
    description: "Leaky faucet in the bathroom",
    requestType: "Maintenance",
    submissionDate: new Date("2024-02-10"),
    status: "Pending",
    userID: {
      userID: 101,
      password: "hashedpassword123",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phoneNumber: "123-456-7890",
      gender: "Male",
      dateOfBirth: new Date("2000-05-15"),
      nationalIDNumber: "ID123456789",
      status: "Active",
      contract: {
        contractID: 1,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
        status: "Active",
        roomID: {
          building: {
            name: "NAME",
          },
          floorNumber: 1,
          roomNumber: 1,
        },
      },
      priorities: ["Near elevator", "Lower floor"],
      guardian: {
        guardianID: 1,
        name: "Jane Doe",
        relationship: "Mother",
        phoneNumber: "987-654-3210",
      },
      workplace: {
        workplaceID: 1,
        name: "Tech Corp",
        address: "123 Main Street, City",
      },
      healthInsurance: {
        insuranceID: 1,
        provider: "HealthCare Inc.",
        policyNumber: "HC123456",
      },
    },
    adminID: {
      adminID: 201,
      password: "hashedadminpassword",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@admin.com",
      dateOfBirth: new Date("1985-08-20"),
      gender: "Female",
      phoneNumber: "456-789-0123",
      jobTitle: "Facility Manager",
      workplaceID: 1,
      absenceID: 0,
      notificationID: 5,
      parkingSpotID: 12,
      imageURL: "https://example.com/admin/alice.jpg",
    },
    roomID: {
      roomID: 301,
      roomNumber: "A302",
      floorNumber: 3,
      roomType: {
        typeID: 1,
        name: "Single",
        capacity: 1,
      },
      totalUsedBed: 1,
      totalAvailableBed: 0,
      status: "Occupied",
      building: {
        buildingID: 1,
        name: "Dormitory A",
        address: "123 University Road",
      },
    },
  },
  {
    requestID: 2,
    description: "WiFi not working in room",
    requestType: "Technical Support",
    submissionDate: new Date("2024-02-12"),
    status: "In Progress",
    userID: {
      userID: 102,
      password: "hashedpassword456",
      firstName: "Emma",
      lastName: "Brown",
      email: "emma.brown@example.com",
      phoneNumber: "234-567-8901",
      gender: "Female",
      dateOfBirth: new Date("2001-10-22"),
      nationalIDNumber: "ID987654321",
      status: "Active",
      contract: {
        contractID: 2,
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-12-31"),
        status: "Active",
        roomID: {
          building: {
            name: "NAME",
          },
          floorNumber: 1,
          roomNumber: 1,
        },
      },
      priorities: ["Quiet area", "Higher floor"],
      guardian: {
        guardianID: 2,
        name: "Robert Brown",
        relationship: "Father",
        phoneNumber: "789-012-3456",
      },
      workplace: null,
      healthInsurance: {
        insuranceID: 2,
        provider: "SafeHealth",
        policyNumber: "SH789101",
      },
    },
    adminID: {
      adminID: 202,
      password: "hashedadminpassword2",
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.johnson@admin.com",
      dateOfBirth: new Date("1980-12-05"),
      gender: "Male",
      phoneNumber: "567-890-1234",
      jobTitle: "IT Support",
      workplaceID: 2,
      absenceID: 0,
      notificationID: 3,
      parkingSpotID: 15,
      imageURL: "https://example.com/admin/michael.jpg",
    },
    roomID: {
      roomID: 302,
      roomNumber: "B205",
      floorNumber: 2,
      roomType: {
        typeID: 2,
        name: "Double",
        capacity: 2,
      },
      totalUsedBed: 1,
      totalAvailableBed: 1,
      status: "Available",
      building: {
        buildingID: 2,
        name: "Dormitory B",
        // address: "456 Campus Avenue",
      },
    },
  },
];
