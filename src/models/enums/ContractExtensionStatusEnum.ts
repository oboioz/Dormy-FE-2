export enum ContractExtensionStatusEnum {
    PENDING = "PENDING",
    WAITING_PAYMENT = "WAITING_PAYMENT",
    ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    TERMINATED = "TERMINATED",
    REJECTED = "REJECTED",
}
  
export const ContractExtensionStatusDescriptions: Record<ContractExtensionStatusEnum, string> = {
    [ContractExtensionStatusEnum.PENDING]: "Pending",
    [ContractExtensionStatusEnum.WAITING_PAYMENT]: "Waiting payment",
    [ContractExtensionStatusEnum.ACTIVE]: "Active",
    [ContractExtensionStatusEnum.EXPIRED]: "Expired",
    [ContractExtensionStatusEnum.TERMINATED]: "Terminated",
    [ContractExtensionStatusEnum.REJECTED]: "Rejected",
};