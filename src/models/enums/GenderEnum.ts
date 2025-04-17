import { EnumUtils } from "../../utils/EnumUtils";

export enum GenderEnum {
    OTHER = "OTHER",
    MALE = "MALE",
    FEMALE = "FEMALE",
}
  
export const GenderEnglishDescriptions: Record<GenderEnum, string> = {
    [GenderEnum.OTHER]: "Other",
    [GenderEnum.MALE]: "Male",
    [GenderEnum.FEMALE]: "Female",
};

export const GenderVietnameseDescriptions: Record<GenderEnum, string> = {
    [GenderEnum.OTHER]: "Khác",
    [GenderEnum.MALE]: "Nam",
    [GenderEnum.FEMALE]: "Nữ",
};

export const getGenderDescription = (gender: string, language: string = "en") => {
    const enumValue = EnumUtils.convertToEnum(GenderEnum, gender);
    if (language == "en") {
        return GenderEnglishDescriptions[enumValue];
    } else if (language == "vi") {
        return GenderVietnameseDescriptions[enumValue];
    } else {
        return gender.toLowerCase();
    }
}