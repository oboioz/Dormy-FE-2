export enum UserStatusEnum {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    INACTIVE = "INACTIVE",
}
  
export const UserStatusDescriptions: Record<UserStatusEnum, string> = {
    [UserStatusEnum.ACTIVE]: "Active",
    [UserStatusEnum.SUSPENDED]: "Suspended",
    [UserStatusEnum.INACTIVE]: "Inactive",
};