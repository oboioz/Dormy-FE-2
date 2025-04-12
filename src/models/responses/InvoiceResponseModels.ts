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
  roomId: string;
  roomName: string;
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

export interface DetailInvoiceResponseModel extends InvoiceResponseModel {
  invoiceItems: InvoiceItemResponseModel[];
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
  roomServices: GetInitialInvoiceItemCreationResponseModel[];
}

export interface GetInitialInvoiceItemCreationResponseModel {
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