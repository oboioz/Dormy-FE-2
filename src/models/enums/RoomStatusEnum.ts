export enum RoomStatusEnum {
    AVAILABLE = "AVAILABLE",
    UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
    FULL = "FULL",
}

export const RoomStatusDescriptions: Record<RoomStatusEnum, string> = {
    [RoomStatusEnum.AVAILABLE]: "Available",
    [RoomStatusEnum.UNDER_MAINTENANCE]: "Under maintance",
    [RoomStatusEnum.FULL]: "Full",
};