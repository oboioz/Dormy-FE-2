import { IRoom } from "./room";
import { IUser } from "./user";

export type IContract = {
    contractID: number;
    submissionDate: Date;
    startDate: Date;
    endDate: Date;
    status: string;
    numberExtensions: number;
    invoiceId: number;
    userID: IUser;
    approverId: number;
    bedId: number;
    roomID: IRoom;
};

export type IContractExtension = {
    contractExtensionId: number;
    submissionDate: Date;
    startDate: Date;
    endDate: Date;
    status: string;
    invoiceId: number;
    contractId: number;
    approverId: number;
};
