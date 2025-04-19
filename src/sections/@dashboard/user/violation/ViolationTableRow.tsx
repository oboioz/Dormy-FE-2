import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { fDate, fDateTime } from "../../../../utils/formatTime";
import { IViolation } from "../../../../models/responses/ViolationModels";
import { DateTimeUtils } from "../../../../utils/DateTimeUtils";
import { fCurrency } from "../../../../utils/formatNumber";

type Props = {
  row: IViolation;
  selected: boolean;
  onSelectRow: VoidFunction;
};

export default function ViolationTableRow({
  row,
  selected,
  onSelectRow,
}: Props) {
  const {
    id,
    userId,
    fullName,
    description,
    penalty,
    violationDate,
    createdDateUtc,
    dateOfBirth,
    email,
    phoneNumber,
    isDeleted,
  } = row;

  return (
    <>
      <TableRow hover selected={selected} sx={{ opacity: isDeleted ? 0.5 : 1 }}>
        <TableCell padding="checkbox">
          <Checkbox
            disabled={isDeleted}
            checked={selected}
            onClick={onSelectRow}
          />
        </TableCell>
        <TableCell align="left">{fDate(violationDate, "dd/MM/yyyy hh:mm:ss")}</TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="left">
          {fCurrency(penalty)}
        </TableCell>
      </TableRow>
    </>
  );
}
