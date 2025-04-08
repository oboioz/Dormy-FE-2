export enum ParkingSpotStatusEnum {
    AVAILABLE = "AVAILABLE",
    UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
    FULL = "FULL",
}
  
export const ParkingSpotStatusDescriptions: Record<ParkingSpotStatusEnum, string> = {
    [ParkingSpotStatusEnum.AVAILABLE]: "Available",
    [ParkingSpotStatusEnum.UNDER_MAINTENANCE]: "Under maintance",
    [ParkingSpotStatusEnum.FULL]: "Full",
};