import { IAdmin } from "./admin";
import { IUser } from "./user";

export type IViolation = {
    violationID: number;  // Primary key
    description: string;
    violationDate: Date;
    penalty: number;
    userID: IUser;  // Foreign key reference to User
    createdAt: Date;
    adminID: IAdmin
};
