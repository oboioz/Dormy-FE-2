export interface GetBatchInvoiceRequestModel {
    roomId: string | null;
    invoiceType: string | null;
    ids: string[];
}

export interface CreateInvoiceRequestModel {
    dueDate: string | null;
    month: number | null;
    year: number | null;
    type: string;
    roomId: string;
    invoiceItems: CreateInvoiceItemRequestModel[];
}

export interface EditInvoiceRequestModel extends CreateInvoiceRequestModel {
    id: string;
}

export interface CreateInvoiceItemRequestModel {
    roomServiceId: string | null;
    roomServiceName: string | null;
    cost: number | null;
    unit: string | null;
    quantity: number;
    oldIndicator: number | null;
    newIndicator: number | null;
}

export interface GetInitialInvoiceCreationRequestModel {
    month: number;
    year: number;
    roomId: string;
}

export interface UpdateInvoiceStatusRequestModel {
    id: string;
    status: string;
}