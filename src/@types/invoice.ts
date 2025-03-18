import { IRoom } from "./room";
import { IUser } from "./user";

export type IInvoice = {
    invoiceID: number; // Primary key
    invoiceName: string;
    dueDate: Date;
    amountBeforePromotion: number;
    amountAfterPromotion: number;
    status: string;
    createdAt: string;
    type: string;
    month: number;
    year: number;
    roomId: IRoom;
    invoiceItems?: IInvoiceItem[];
    description: string;
};

export type IInvoiceRecipient = {
    id: string;
    name: string;
    email: string;
    phone: string;
  };

export type IInvoiceUser = {
    invoiceUserId: number; // Primary key
    invoiceId: IInvoice; // Foreign key referencing Invoice
    userId: IUser; // Foreign key referencing User
};

export type IInvoiceItem = {
    invoiceItemId: number; // Primary key
    serviceId: number;
    serviceName: string;
    cost: number;
    quantity: number;
    unit: string;
    metadata: Record<string, any>; // Object metadata
    invoiceId: IInvoice; // Foreign key referencing Invoice
};
