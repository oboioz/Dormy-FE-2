// ----------------------------------------------------------------------

import { IContract } from "./contract";

export type IUserProfileFollowers = {
  follower: number;
  following: number;
};

export type IUserProfileCover = {
  name: string;
  cover: string;
  role: string;
};

export type IUserProfileAbout = {
  quote: string;
  country: string;
  email: string;
  role: string;
  company: string;
  school: string;
};

// ----------------------------------------------------------------------

export type IUserCard = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPosts: number;
  role: string;
};

// ----------------------------------------------------------------------

export type IUserAccountGeneral = {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

// ----------------------------------------------------------------------
// New User Types

export enum UserPriorityOption {
  NO_FATHER = "No Father",
  NO_MOTHER = "No Mother",
  CHILDREN_OF_WAR_INVALIDS = "Children of War Invalids",
  DISABLED = "Disabled",
  POOR_HOUSEHOLD = "Poor Household",
  ORPHAN = "Orphan",
  ECONOMICALLY_DISADVANTAGED = "Economically Disadvantaged Area",
  SERIOUS_ILLNESS = "Student with Serious Illness",
  ETHNIC_MINORITIES = "Ethnic Minority",
  NOT_INCLUDED = "Not Included in the Above Categories",
}

export type IUserPriority = {
  options: UserPriorityOption[]; // Multiple priority options
};

export type IUserHealthInsurance = {
  insuranceCardNumber: string;
  expirationDate: Date | null;
  registeredHospital: string;
};

export type IUserWorkplace = {
  workplaceID: number;
  name: string;
  address: string;
  createdAt: Date | null;
  createdBy: string;
  abbreviation: string;
};

export type IUserGuardian = {
  guardianID: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  relationshipToUser: string;
};

export type IUser = {
  userID: number;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date | null;
  nationalIDNumber: string;
  status: string;
  contract: IContract;
  priorities: string[]; // User can select multiple priority conditions
  guardian: IUserGuardian; // One guardian per user
  workplace: IUserWorkplace | null; // One workplace per user, nullable
  healthInsurance: IUserHealthInsurance | null; // One health insurance per user, nullable
};

export type IRegistrationForm = {
  isLoading: boolean;
  error: Error | string | null;
  activeStep: number;

  registrationInformation: {
    generalInformation: IRegistrationFormState,
    documents: IDocuments,
  }
};

export type IDocuments = {
  portraitPhoto: File | null;
  educationPhoto: File | null;
  nationalIDPhotosFront: File | null;
  nationalIDPhotosBack: File | null;
};

export type IRegistrationFormState = {
  userState: IUserRegistrationState;
  healthInsuranceState: IHealthInsuranceRegistration;
  guardianState: IGuardianRegistration[];
  roomState: IRoomRegistrationState
  workplaceId: string;
  startDate: Date | null;
  endDate: Date | null;
}

export type IUserRegistrationState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date | null;
  nationalIdNumber: string;
}

export type IHealthInsuranceRegistration = {
  insuranceCardNumber: string;
  expirationDate: Date | null;
  registeredHospital: string;
}

export type IGuardianRegistration = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  relationshipToUser: string;
}

export type IRoomRegistrationState = {
  roomId: string;
  buildingId: string;
  roomTypeId: string;
  gender: string;
}
