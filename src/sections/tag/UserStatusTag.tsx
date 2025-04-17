import Label from "../../components/label";
import { UserStatusDescriptions, UserStatusEnum } from "../../models/enums/UserStatusEnum";
import { EnumUtils } from "../../utils/EnumUtils";

type UserStatusTagProps = {
    status: string;
};

export default function UserStatusTag({ status }: UserStatusTagProps) {
    const getColor = (status: string) => {
        switch (status) {
            case UserStatusEnum.ACTIVE:
                return "success";
            case UserStatusEnum.SUSPENDED:
                return "warning";
            case UserStatusEnum.INACTIVE:
                return "error";
            default:
                return "default";
        }
    };

    const enumValue = EnumUtils.convertToEnum(UserStatusEnum, status);

    return (
        <Label variant="soft" color={getColor(enumValue)}>
            {EnumUtils.getEnumDescription(UserStatusDescriptions, enumValue)}
        </Label>
    );
}
