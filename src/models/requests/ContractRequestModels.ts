export interface GetBatchContractRequestModel {
    ids: string[];
}

export interface ApproveOrRejectContractRequestModel {
    isAccepted: boolean;
}

export interface ContractExtensionCreateRequestModel {
    startDate: string;
    endDate: string;
}