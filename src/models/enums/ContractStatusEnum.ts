export enum ContractStatusEnum {
    PENDING = "PENDING",
    WAITING_PAYMENT = "WAITING_PAYMENT",
    ACTIVE = "ACTIVE",
    EXTENDED = "EXTENDED",
    EXPIRED = "EXPIRED",
    TERMINATED = "TERMINATED",
    REJECTED = "REJECTED",
}

export const ContractStatusDescriptions: Record<ContractStatusEnum, string> = {
    [ContractStatusEnum.PENDING]: "Pending",
    [ContractStatusEnum.WAITING_PAYMENT]: "Waiting payment",
    [ContractStatusEnum.ACTIVE]: "Active",
    [ContractStatusEnum.EXTENDED]: "Extended",
    [ContractStatusEnum.EXPIRED]: "Expired",
    [ContractStatusEnum.TERMINATED]: "Terminated",
    [ContractStatusEnum.REJECTED]: "Rejected",
};