import { IAdmin } from "../../@types/admin";
import { IOvernightAbsence } from "../../@types/request";
import { IUser } from "../../@types/user";

const mockUsers: any[] = [
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
    contract: {
      contractID: 101,
      submissionDate: new Date("2024-01-01"),
      startDate: new Date("2024-01-10"),
      endDate: new Date("2025-01-10"),
      status: "Valid",
      numberExtensions: 1,
      invoiceId: 5001,
      userID: 1,
      approverId: 201,
      bedId: 301,
      roomID: {
        roomID: 10,
        roomNumber: "A101",
        floorNumber: 1,
        roomType: {
          roomTypeID: 1,
          roomTypeName: "Single Room",
          description: "A private room for one person.",
          price: 500,
          capacity: 1,
        },
        totalUsedBed: 1,
        totalAvailableBed: 0,
        status: "Occupied",
        building: {
          buildingID: 5,
          name: "Dormitory A",
          floorNumber: 3,
          genderRestriction: "Male",
          roomID: 10,
        },
      },
    },
    priorities: ["Orphan", "Disabled"],
    guardian: {
      guardianID: 1,
      name: "Jane Doe",
      email: "janedoe@example.com",
      phoneNumber: "987-654-3210",
      address: "123 Main St, City, Country",
      relationshipToUser: "Mother",
    },
    workplace: null,
    healthInsurance: {
      insuranceCardNumber: "H123456789",
      expirationDate: new Date("2026-06-30"),
      registeredHospital: "City Hospital",
    },
  },
];

const mockAdmins: any[] = [
  {
    adminID: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.admin@example.com",
    phoneNumber: "555-123-4567",
    jobTitle: "Dorm Manager",
  },
];

const mockOvernightAbsences: IOvernightAbsence[] = [
  {
    absenceID: 1,
    startDateTime: new Date("2024-07-10T22:00:00"),
    endDateTime: new Date("2024-07-11T08:00:00"),
    reason: "Family emergency",
    status: "Approved",
    userID: mockUsers[0],
    adminID: mockAdmins[0],
    submitAt: new Date("2024-07-08T10:30:00"),
  },
  {
    absenceID: 2,
    startDateTime: new Date("2024-07-15T20:00:00"),
    endDateTime: new Date("2024-07-16T07:00:00"),
    reason: "Medical appointment",
    status: "Pending",
    userID: mockUsers[0],
    adminID: mockAdmins[0],
    submitAt: new Date("2024-07-12T14:45:00"),
  },
];

export { mockOvernightAbsences };
