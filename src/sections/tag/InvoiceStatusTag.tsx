import Label from "../../components/label";
import { InvoiceStatusDescriptions, InvoiceStatusEnum } from "../../models/enums/InvoiceStatusEnum";
import { EnumUtils } from "../../utils/EnumUtils";

type InvoiceStatusTagProps = {
  status: string;
};

export default function InvoiceStatusTag({ status }: InvoiceStatusTagProps) {
  const getColor = (status: string) => {
    switch (status) {
        case InvoiceStatusEnum.PAID:
            return "success";
        case InvoiceStatusEnum.UNPAID:
            return "warning";
        case InvoiceStatusEnum.OVERDUE:
            return "secondary";
        case InvoiceStatusEnum.CANCELLED:
            return "error";
        case InvoiceStatusEnum.DRAFT:
            return "default";
        default:
            return "default";
    }
  };

  const enumValue = EnumUtils.convertToEnum(InvoiceStatusEnum, status);

  return (
    <Label variant="soft" color={getColor(enumValue)}>
      {EnumUtils.getEnumDescription(InvoiceStatusDescriptions, enumValue)}
    </Label>
  );
}
