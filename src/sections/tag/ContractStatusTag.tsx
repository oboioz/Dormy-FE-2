import Label from "../../components/label";
import { ContractStatusDescriptions, ContractStatusEnum } from "../../models/enums/ContractStatusEnum";
import { EnumUtils } from "../../utils/EnumUtils";

type ContractStatusTagProps = {
  status: string;
};

export default function ContractStatusTag({ status }: ContractStatusTagProps) {
    const getColor = (status: string) => {
        switch (status) {
            case ContractStatusEnum.PENDING:
                return "default";
            case ContractStatusEnum.WAITING_PAYMENT:
                return "warning";
            case ContractStatusEnum.ACTIVE:
                return "success";
            case ContractStatusEnum.EXTENDED:
                return "info";
            case ContractStatusEnum.TERMINATED:
                return "secondary";
            case ContractStatusEnum.EXPIRED:
                return "primary";
            case ContractStatusEnum.REJECTED:
                return "error";
            default:
                return "default";
        }
    };

    const enumValue = EnumUtils.convertToEnum(ContractStatusEnum, status);

    return (
        <Label variant="soft" color={getColor(enumValue)}>
            {EnumUtils.getEnumDescription(ContractStatusDescriptions, enumValue)}
        </Label>
    );
}
