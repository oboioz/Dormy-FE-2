export enum ServiceIndicatorStatusEnum {
    TEMPORARY = "TEMPORARY",
    VERIFYING = "VERIFYING",
    CORRECT = "CORRECT",
}
  
export const ServiceIndicatorStatusDescriptions: Record<ServiceIndicatorStatusEnum, string> = {
    [ServiceIndicatorStatusEnum.TEMPORARY]: "Temporary",
    [ServiceIndicatorStatusEnum.VERIFYING]: "Verifying",
    [ServiceIndicatorStatusEnum.CORRECT]: "Correct",
};