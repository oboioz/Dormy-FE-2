export enum GenderEnum {
    OTHER = "OTHER",
    MALE = "MALE",
    FEMALE = "FEMALE",
}
  
export const GenderDescriptions: Record<GenderEnum, string> = {
    [GenderEnum.OTHER]: "Other",
    [GenderEnum.MALE]: "Male",
    [GenderEnum.FEMALE]: "Female",
};