import { IAdmin } from "./admin";
import { IRoom } from "./room";
import { IUser } from "./user";

export type IOvernightAbsence = {
    absenceID: number;
    startDateTime: Date;
    endDateTime: Date;
    reason: string;
    status: string;
    userID: IUser;
    adminID: IAdmin;
    submitAt: Date
}

export type IRequest = {
  requestID: number; // Primary key
  description: string;
  requestType: string;
  submissionDate: Date;
  status: string;
  userID: IUser; // Foreign key referencing User
  adminID: IAdmin; // Foreign key referencing Admin (assuming admin is also a user)
  roomID: IRoom; // Foreign key referencing Room
};

