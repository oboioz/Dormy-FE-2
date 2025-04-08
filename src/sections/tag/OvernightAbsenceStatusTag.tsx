import Label from "../../components/label";
import { OvernightAbsenceStatusDescriptions, OvernightAbsenceStatusEnum } from "../../models/enums/OvernightAbsenceStatusEnum";
import { EnumUtils } from "../../utils/EnumUtils";

type OvernightAbsenceStatusTagProps = {
  status: string;
};

export default function OvernightAbsenceStatusTag({ status }: OvernightAbsenceStatusTagProps) {
  const getColor = (status: string) => {
    switch (status) {
      case OvernightAbsenceStatusEnum.APPROVED:
        return "success";
      case OvernightAbsenceStatusEnum.SUBMITTED:
        return "warning";
      case OvernightAbsenceStatusEnum.REJECTED:
        return "error";
      case OvernightAbsenceStatusEnum.CANCELLED:
        return "default";
      default:
        return "default";
    }
  };

  const enumValue = EnumUtils.convertToEnum(OvernightAbsenceStatusEnum, status);

  return (
    <Label variant="soft" color={getColor(enumValue)}>
      {EnumUtils.getEnumDescription(OvernightAbsenceStatusDescriptions, enumValue)}
    </Label>
  );
}
