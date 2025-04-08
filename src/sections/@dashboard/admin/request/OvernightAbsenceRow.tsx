import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import Iconify from "../../../../components/iconify";
import { OvernightAbsenceResponseModel } from "../../../../models/responses/OvernightAbsenceResponseModels";
import { fDate } from "../../../../utils/formatTime";
import { useState } from "react";
import OvernightAbsenceModal from "./OvernightAbsenceModal";
import { useAuthContext } from "../../../../auth/JwtContext";
import OvernightAbsenceStatusTag from "../../../tag/OvernightAbsenceStatusTag";

type OvernightAbsenceRowProps = {
  overnightAbsence: OvernightAbsenceResponseModel;
  setOvernightAbsences: React.Dispatch<React.SetStateAction<OvernightAbsenceResponseModel[]>>;
  selected: boolean;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export default function OvernightAbsenceRow({
  overnightAbsence,
  setOvernightAbsences,
  selected,
  onSelectRow,
  onDeleteRow,
}: OvernightAbsenceRowProps) {
  const { user } = useAuthContext();
  const [openDetails, setOpenDetails] = useState(false);
  const handleStatusChange = (overnightAbsenceId: string, newStatus: string) => {

    setOvernightAbsences((prevOvernightAbsences) =>
      prevOvernightAbsences.map((overnightAbsence) =>
        overnightAbsence.id === overnightAbsenceId
          ? { ...overnightAbsence, status: newStatus, approverFullName: user?.name || "N/A" }
          : overnightAbsence
      )
    );
  };

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">
          {fDate(overnightAbsence.startDateTime, "dd/MM/yyyy")}
        </TableCell>
        <TableCell align="left">
          {fDate(overnightAbsence.endDateTime, "dd/MM/yyyy")}
        </TableCell>
        <TableCell align="left">{overnightAbsence.reason}</TableCell>
        <TableCell align="left">{overnightAbsence.fullName}</TableCell>
        <TableCell align="left">{overnightAbsence.phoneNumber}</TableCell>
        <TableCell align="left">
          {overnightAbsence?.approverFullName || "N/A"}
        </TableCell>
        <TableCell align="left">
          <OvernightAbsenceStatusTag status={overnightAbsence.status} />
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenDetails}>
            <Iconify icon="eva:eye-outline" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Overnight absence Details Modal */}
      <OvernightAbsenceModal
        open={openDetails}
        onClose={handleCloseDetails}
        overnightAbsence={overnightAbsence}
        onStatusChange={(newStatus) => handleStatusChange(overnightAbsence.id, newStatus)}
      />
    </>
  );
}
