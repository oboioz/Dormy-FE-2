export enum RequestStatusEnum {
    SUBMITTED = "SUBMITTED",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
}
  
export const RequestStatusDescriptions: Record<RequestStatusEnum, string> = {
    [RequestStatusEnum.SUBMITTED]: "Submitted",
    [RequestStatusEnum.APPROVED]: "Approved",
    [RequestStatusEnum.REJECTED]: "Rejected",
    [RequestStatusEnum.CANCELLED]: "Cancelled",
};