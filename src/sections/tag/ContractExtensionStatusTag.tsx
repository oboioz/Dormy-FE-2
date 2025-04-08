import Label from "../../components/label";
import { ContractExtensionStatusDescriptions, ContractExtensionStatusEnum } from "../../models/enums/ContractExtensionStatusEnum";
import { EnumUtils } from "../../utils/EnumUtils";

type ContractExtensionStatusTagProps = {
  status: string;
};

export default function ContractExtensionStatusTag({ status }: ContractExtensionStatusTagProps) {
    const getColor = (status: string) => {
        switch (status) {
            case ContractExtensionStatusEnum.PENDING:
                return "default";
            case ContractExtensionStatusEnum.WAITING_PAYMENT:
                return "warning";
            case ContractExtensionStatusEnum.ACTIVE:
                return "success";
            case ContractExtensionStatusEnum.TERMINATED:
                return "secondary";
            case ContractExtensionStatusEnum.EXPIRED:
                return "primary";
            case ContractExtensionStatusEnum.REJECTED:
                return "error";
            default:
                return "default";
        }
    };

    const enumValue = EnumUtils.convertToEnum(ContractExtensionStatusEnum, status);

    return (
        <Label variant="soft" color={getColor(enumValue)}>
            {EnumUtils.getEnumDescription(ContractExtensionStatusDescriptions, enumValue)}
        </Label>
    );
}
