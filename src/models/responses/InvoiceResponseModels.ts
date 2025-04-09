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