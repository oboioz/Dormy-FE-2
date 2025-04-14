import Label from "../../components/label";
import { ParkingSpotStatusDescriptions, ParkingSpotStatusEnum } from "../../models/enums/ParkingSpotStatusEnum";
import { EnumUtils } from "../../utils/EnumUtils";

type ParkingSpotStatusTagProps = {
    status: string;
};

export default function ParkingSpotStatusTag({ status }: ParkingSpotStatusTagProps) {
    const getColor = (status: string) => {
        switch (status) {
            case ParkingSpotStatusEnum.AVAILABLE:
                return "success";
            case ParkingSpotStatusEnum.UNDER_MAINTENANCE:
                return "warning";
            case ParkingSpotStatusEnum.FULL:
                return "error";
            default:
                return "default";
        }
    };

    const enumValue = EnumUtils.convertToEnum(ParkingSpotStatusEnum, status);

    return (
        <Label variant="soft" color={getColor(enumValue)}>
            {EnumUtils.getEnumDescription(ParkingSpotStatusDescriptions, enumValue)}
        </Label>
    );
}
