export enum OvernightAbsenceStatusEnum {
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export const OvernightAbsenceStatusDescriptions: Record<OvernightAbsenceStatusEnum, string> = {
  [OvernightAbsenceStatusEnum.SUBMITTED]: "Submitted",
  [OvernightAbsenceStatusEnum.APPROVED]: "Approved",
  [OvernightAbsenceStatusEnum.REJECTED]: "Rejected",
  [OvernightAbsenceStatusEnum.CANCELLED]: "Cancelled",
};