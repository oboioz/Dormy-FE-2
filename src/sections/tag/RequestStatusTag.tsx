import Label from "../../components/label";
import { RequestStatusDescriptions, RequestStatusEnum } from "../../models/enums/RequestStatusEnum";
import { EnumUtils } from "../../utils/EnumUtils";

type RequestStatusTagProps = {
    status: string;
};

export default function RequestStatusTag({ status }: RequestStatusTagProps) {
    const getColor = (status: string) => {
        switch (status) {
            case RequestStatusEnum.SUBMITTED:
                return "info";
            case RequestStatusEnum.APPROVED:
                return "success";
            case RequestStatusEnum.CANCELLED:
                return "warning";
            case RequestStatusEnum.REJECTED:
                return "error";
            default:
                return "default";
        }
    };

    const enumValue = EnumUtils.convertToEnum(RequestStatusEnum, status);

    return (
        <Label variant="soft" color={getColor(enumValue)}>
            {EnumUtils.getEnumDescription(RequestStatusDescriptions, enumValue)}
        </Label>
    );
}
