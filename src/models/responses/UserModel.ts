import { UserRole } from "../enums/DormyEnums";

export interface ApiResponse {
  statusCode: number;
  isSuccess: boolean;
  errorMessage: any;
  result: AdminSignInResponse;
}

export interface UserInformation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  dateOfBirth: string;
  phoneNumber: string;
  jobTitle: string;
  gender: string;
}

export interface AdminSignInResponse {
  adminInformation: UserInformation;
  accessToken: string;
}

export interface UserSignInResponse {
  userInformation: Profile;
  accessToken: string;
}

export interface UserModel {
  id: string;
  name: string;
  token: string;
  role: UserRole;
}

export interface UserSignUpModel {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  nationalIdNumber: string;
  gender: string;
}

export interface Profile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  dateOfBirth: string;
  phoneNumber: string;
  nationalIdNumber: string;
  status: string;
  gender: string;
  contractId?: string;
  contractStartDate?: Date;
  contractEndDate?: Date;
  contractStatus?: string;
  roomId?: string;
}

export interface IChangePassword {
  id: string;
  oldPassword: string;
  newPassword: string;
}

export interface UserProfileResponseModel {
  user: UserProfileDetailInformationResponseModel,
  guardians: UserProfileGuardianResponseModel[],
  workplace: UserProfileWorkplaceResponseModel,
  healthInsurance: UserProfileHealthInsuranceResponseModel,
  contract: UserProfileContractResponseModel
}

export interface UserProfileDetailInformationResponseModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  nationalIdNumber: string;
  status: string;
  gender: string;
}

export interface UserProfileGuardianResponseModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  relationshipToUser: string;
}

export interface UserProfileWorkplaceResponseModel {
  id: string;
  name: string;
  address: string;
  abbrevation: string;
}

export interface UserProfileHealthInsuranceResponseModel {
  id: string;
  insuranceCardNumber: string;
  registeredHospital: string;
  expirationDate: string;
}

export interface UserProfileContractResponseModel {
  id: string;
  submissionDate: string;
  startDate: string;
  endDate: string;
  status: string;
  numberExtension: number;
  approverId: string | null;
  approverFullName: string;
  roomId: string;
  roomNumber: number;
  roomTypeId: string;
  roomTypeName: string;
  price: number;
  buildingId: string;
  buildingName: string;
}