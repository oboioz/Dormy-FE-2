import { useState } from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
} from "@mui/material";
import Iconify from "../../../../components/iconify";
import { fDate } from "../../../../utils/formatTime";
import { useAuthContext } from "../../../../auth/JwtContext";
import ContractStatusTag from "../../../tag/ContractStatusTag";
import { RegistrationAccommodationResponseModel } from "../../../../models/responses/RegistrationModels";
import RegistrationModal from "../contract/RegistrationModal";

type RegistrationRowProps = {
  registration: RegistrationAccommodationResponseModel;
  // setRegistrations: React.Dispatch<React.SetStateAction<ContractResponseModel[]>>;
  selected: boolean;
  onSelectRow: () => void;
};

export default function RegistrationRow({ registration, /*setRegistrations,*/ selected, onSelectRow }: RegistrationRowProps) {

  const { user } = useAuthContext();
  const [openDetails, setOpenDetails] = useState(false);
  // const handleStatusChange = (contractId: string, newStatus: string) => {
  //   setContracts((prevContracts) =>
  //       prevContracts.map((contract) =>
  //           contract.id === contractId ? { ...contract, status: newStatus, approverFullName: user?.name || "--" } : contract
  //       )
  //   );
  // };

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
          {fDate(registration.startDate, "dd/MM/yyyy")}
          {" - "}
          {fDate(registration.endDate, "dd/MM/yyyy")}
        </TableCell>
        <TableCell align="left">{registration.userFullname}</TableCell>
        <TableCell align="center">{registration.roomNumber}</TableCell>
        <TableCell align="center">{registration.buildingName}</TableCell>
        <TableCell align="left">{registration.roomTypeName}</TableCell>
        <TableCell align="left">
          <ContractStatusTag status={registration.status}/>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenDetails}>
            <Iconify icon="eva:eye-outline" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Contract Details Modal */}
      <RegistrationModal
        open={openDetails}
        onClose={handleCloseDetails}
        registration={registration}
        // onStatusChange={(newStatus) => handleStatusChange(row.id, newStatus)}
      />
    </>
  );
}