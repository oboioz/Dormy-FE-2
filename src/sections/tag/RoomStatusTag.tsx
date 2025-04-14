import Label from "../../components/label";
import { RoomStatusDescriptions, RoomStatusEnum } from "../../models/enums/RoomStatusEnum";
import { EnumUtils } from "../../utils/EnumUtils";

type RoomStatusTagProps = {
    status: string;
};

export default function RoomStatusTag({ status }: RoomStatusTagProps) {
    const getColor = (status: string) => {
        switch (status) {
            case RoomStatusEnum.AVAILABLE:
                return "success";
            case RoomStatusEnum.UNDER_MAINTENANCE:
                return "warning";
            case RoomStatusEnum.FULL:
                return "error";
            default:
                return "default";
        }
    };

    const enumValue = EnumUtils.convertToEnum(RoomStatusEnum, status);

    return (
        <Label variant="soft" color={getColor(enumValue)}>
            {EnumUtils.getEnumDescription(RoomStatusDescriptions, enumValue)}
        </Label>
    );
}
