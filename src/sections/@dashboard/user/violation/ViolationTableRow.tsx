import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { fDateTime } from "../../../../utils/formatTime";
import { IViolation } from "../../../../models/responses/ViolationModels";
import { DateTimeUtils } from "../../../../utils/DateTimeUtils";

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
        <TableCell align="left">{fDateTime(violationDate)}</TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="left">
          {new Intl.NumberFormat("vi-VN").format(penalty)} VND
        </TableCell>
      </TableRow>
    </>
  );
}
