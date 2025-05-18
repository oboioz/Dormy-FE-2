export interface InvoiceResponseModel {
  id: string;
  invoiceName: string;
  dueDate: Date;
  amountBeforePromotion: number;
  amountAfterPromotion: number;
  month?: number;
  year?: number;
  type: string;
  status: string;
  contractId: string;
  contractExtensionId: string;
  roomId: string;
  roomName: string;
  userFullname: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}

export interface InvoiceItemResponseModel {
  id: string;
  roomServiceName: string;
  roomServiceId: string;
  cost: number;
  quantity: number;
  unit: string;
  oldIndicator: number;
  newIndicator: number;
}

export interface InvoiceUserResponseModel {
  userId: string;
  userName: string;
}

export interface DetailInvoiceResponseModel extends InvoiceResponseModel {
  invoiceItems: InvoiceItemResponseModel[];
  invoiceUsers: InvoiceUserResponseModel[];
}

export interface RoomRecipients {
  roomId: string;
  roomNumber: number;
  floorNumber: number;
  buildingName: string;
}

export interface GetInitialInvoiceCreationResponseModel {
  month: number;
  year: number;
  roomId: string;
  invoiceId?: string;
  invoiceName?: string;
  dueDate?: Date;
  type?: string;
  status?: string;
  roomServices: GetInitialInvoiceItemCreationResponseModel[];
  invoiceItems: GetInitialInvoiceItemCreationResponseModel[];
}

export interface GetInitialInvoiceItemCreationResponseModel {
  invoiceItemId: string;
  roomServiceId: string;
  roomServiceName: string;
  roomServiceType: string;
  cost: number;
  unit: string;
  isServiceIndicatorUsed: boolean;
  currentIndicator: number;
  oldIndicator: number;
  newIndicator: number;
  quantity: number;
  total: number;
}