import { IContract } from "../../@types/contract";
import { IRoom } from "../../@types/room";
import { IRegistrationForm, IUser, UserPriorityOption } from "../../@types/user";

const mockUsers: IUser[] = [
    {
      userID: 1,
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1234567890",
      gender: "Male",
      dateOfBirth: new Date("2000-01-15"),
      nationalIDNumber: "123456789",
      status: "Active",
      contract: {} as IContract, // Will be assigned later
      priorities: [UserPriorityOption.DISABLED, UserPriorityOption.POOR_HOUSEHOLD],
      guardian: {
        guardianID: 1,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        phoneNumber: "+1987654321",
        address: "123 Elm Street, Springfield",
        relationshipToUser: "Mother",
      },
      workplace: null,
      healthInsurance: {
        insuranceCardNumber: "HI123456789",
        expirationDate: new Date("2025-06-30"),
        registeredHospital: "Springfield General Hospital",
      },
    },
    {
      userID: 2,
      password: "securepass456",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      phoneNumber: "+1987654321",
      gender: "Female",
      dateOfBirth: new Date("1999-05-20"),
      nationalIDNumber: "987654321",
      status: "Pending",
      contract: {} as IContract,
      priorities: [UserPriorityOption.ORPHAN],
      guardian: {
        guardianID: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        phoneNumber: "+1122334455",
        address: "456 Oak Avenue, New York",
        relationshipToUser: "Uncle",
      },
      workplace: {
        workplaceID: 102,
        name: "HealthCorp",
        address: "789 Medical Road, LA",
        createdAt: new Date("2021-08-10"),
        createdBy: "HR",
        abbreviation: "HC",
      },
      healthInsurance: null,
    },
  ];
  
  const mockRooms: IRoom[] = [
    {
      roomID: 10,
      roomNumber: "A101",
      floorNumber: 1,
      roomType: {
        roomTypeID: 1,
        roomTypeName: "Single",
        description: "A small room for one person with basic amenities.",
        price: 100,
        capacity: 1,
      },
      totalUsedBed: 1,
      totalAvailableBed: 0,
      status: "Occupied",
      building: {
        buildingID: 1,
        name: "Dorm A",
        floorNumber: 5,
        genderRestriction: "Male",
        roomID: 10,
      },
    },
    {
      roomID: 11,
      roomNumber: "B202",
      floorNumber: 2,
      roomType: {
        roomTypeID: 2,
        roomTypeName: "Double",
        description: "A spacious room for two people with shared furniture.",
        price: 150,
        capacity: 2,
      },
      totalUsedBed: 1,
      totalAvailableBed: 1,
      status: "Available",
      building: {
        buildingID: 2,
        name: "Dorm B",
        floorNumber: 3,
        genderRestriction: "Female",
        roomID: 11,
      },
    },
  ];
  
  const mockContracts: IContract[] = [
    {
      contractID: 101,
      submissionDate: new Date(),
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      status: "Approved",
      numberExtensions: 0,
      invoiceId: 5001,
      userID: mockUsers[0],
      approverId: 3001,
      bedId: 201,
      roomID: mockRooms[0],
    },
    {
      contractID: 102,
      submissionDate: new Date(),
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-12-31"),
      status: "Pending",
      numberExtensions: 1,
      invoiceId: 5002,
      userID: mockUsers[1],
      approverId: 3002,
      bedId: 202,
      roomID: mockRooms[1],
    },
  ];
  
  // Assign contracts to users
  mockUsers[0].contract = mockContracts[0];
  mockUsers[1].contract = mockContracts[1];
  
  const mockRegistrationForms: IRegistrationForm[] = [
    {
      isLoading: false,
      error: null,
      activeStep: 1,
      registrationInformation: {
        generalInformation: mockUsers[0],
        documents: {
          portraitPhoto: null,
          educationPhoto: null,
          nationalIDPhotosFront: null,
          nationalIDPhotosBack: null,
        },
      },
    },
    {
      isLoading: false,
      error: null,
      activeStep: 2,
      registrationInformation: {
        generalInformation: mockUsers[1],
        documents: {
          portraitPhoto: null,
          educationPhoto: null,
          nationalIDPhotosFront: null,
          nationalIDPhotosBack: null,
        },
      },
    },
  ];
  
  export default mockRegistrationForms;
  