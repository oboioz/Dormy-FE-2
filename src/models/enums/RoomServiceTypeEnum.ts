import { EnumUtils } from "../../utils/EnumUtils";

export enum RoomServiceTypeEnum {
    ELECTRICITY = "ELECTRICITY",
    WATER = "WATER",
    PARKING_FEE = "PARKING_FEE",
    REFRIGERATOR = "REFRIGERATOR",
    WARDROBE = "WARDROBE",
    WIFI_FEE = "WIFI_FEE",
    AIR_CONDITIONING = "AIR_CONDITIONING",
    GARBAGE_FEE = "GARBAGE_FEE",
    WASHING_MACHINE = "WASHING_MACHINE",
    RENTAL_PAYMENT = "RENTAL_PAYMENT",
    OTHER_SERVICES = "OTHER_SERVICES",
}

export const RoomServiceTypeEnglishDescriptions: Record<RoomServiceTypeEnum, string> = {
    [RoomServiceTypeEnum.ELECTRICITY]: "Electricity",
    [RoomServiceTypeEnum.WATER]: "Water",
    [RoomServiceTypeEnum.PARKING_FEE]: "Parking fee",
    [RoomServiceTypeEnum.REFRIGERATOR]: "Refrigerator",
    [RoomServiceTypeEnum.WARDROBE]: "Wardrobe",
    [RoomServiceTypeEnum.WIFI_FEE]: "Wifi fee",
    [RoomServiceTypeEnum.AIR_CONDITIONING]: "Air conditioning",
    [RoomServiceTypeEnum.GARBAGE_FEE]: "Garbage fee",
    [RoomServiceTypeEnum.WASHING_MACHINE]: "Washing machine",
    [RoomServiceTypeEnum.RENTAL_PAYMENT]: "Rental payment",
    [RoomServiceTypeEnum.OTHER_SERVICES]: "Other services",
};

export const RoomServiceTypeVietnameseDescriptions: Record<RoomServiceTypeEnum, string> = {
    [RoomServiceTypeEnum.ELECTRICITY]: "Điện",
    [RoomServiceTypeEnum.WATER]: "Nước",
    [RoomServiceTypeEnum.PARKING_FEE]: "Phí đỗ xe",
    [RoomServiceTypeEnum.REFRIGERATOR]: "Tủ lạnh",
    [RoomServiceTypeEnum.WARDROBE]: "Tủ quần áo",
    [RoomServiceTypeEnum.WIFI_FEE]: "Phí wifi",
    [RoomServiceTypeEnum.AIR_CONDITIONING]: "Điều hòa",
    [RoomServiceTypeEnum.GARBAGE_FEE]: "Phí rác",
    [RoomServiceTypeEnum.WASHING_MACHINE]: "Máy giặt",
    [RoomServiceTypeEnum.RENTAL_PAYMENT]: "Tiền thuê phòng",
    [RoomServiceTypeEnum.OTHER_SERVICES]: "Dịch vụ khác",
};

export const getRoomServiceTypeDescription = (roomServiceType: string, language: string = "en") => {
    const enumValue = EnumUtils.convertToEnum(RoomServiceTypeEnum, roomServiceType);
    if (language == "en") {
        return RoomServiceTypeEnglishDescriptions[enumValue];
    } else if (language == "vi") {
        return RoomServiceTypeVietnameseDescriptions[enumValue];
    } else {
        return roomServiceType.toLowerCase();
    }
}