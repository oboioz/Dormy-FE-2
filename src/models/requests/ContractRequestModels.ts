export interface GetBatchContractRequestModel {
    ids: string[];
}

export interface ApproveOrRejectContractRequestModel {
    isAccepted: boolean;
}

export interface ContractExtensionCreateRequestModel {
    startDate: string;
    endDate: string;
    roomId: string;
}

export interface ContractRequestModel {
    startDate: string;
    endDate: string;
    roomId: string;    
    userId: string;   
}