import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import Iconify from "../../../../components/iconify";
import { fDate } from "../../../../utils/formatTime";
import ContractModal from "../contract/RegistrationModal";
import { ContractBatchResponseModel, ContractResponseModel } from "../../../../models/responses/ContractResponseModels";
import { useAuthContext } from "../../../../auth/JwtContext";
import ContractStatusTag from "../../../tag/ContractStatusTag";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../../routes/paths";

type ContractAdminRowProps = {
  contract: ContractBatchResponseModel;
  setContracts: React.Dispatch<React.SetStateAction<ContractBatchResponseModel[]>>;
  selected: boolean;
  onSelectRow: () => void;
};

export default function ContractAdminRow({ contract, setContracts, selected, onSelectRow }: ContractAdminRowProps) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [openDetails, setOpenDetails] = useState(false);
  // const handleStatusChange = (contractId: string, newStatus: string) => {
  //   setContracts((prevContracts) =>
  //       prevContracts.map((contract) =>
  //           contract.id === contractId ? { ...contract, status: newStatus, approverFullName: user?.name || "--" } : contract
  //       )
  //   );
  // };

  // const handleOpenDetails = () => {
  //   setOpenDetails(true);
  // };

  // const handleCloseDetails = () => {
  //   setOpenDetails(false);
  // };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align="left">
          {fDate(contract.startDate, "dd/MM/yyyy")}
          {" - "}
          {fDate(contract.endDate, "dd/MM/yyyy")}
        </TableCell>
        <TableCell align="left">{contract.userFullname}</TableCell>
        <TableCell align="center">{contract.roomNumber}</TableCell>
        <TableCell align="center">{contract.buildingName}</TableCell>
        <TableCell align="left">{contract.roomTypeName}</TableCell>
        <TableCell align="left">
          <ContractStatusTag status={contract.status}/>
        </TableCell>

        <TableCell align="right">
          <IconButton /*onClick={handleOpenDetails}*/ onClick={() => {
            navigate(PATH_ADMIN.contract.detail(contract.id))
          }}>
            <Iconify icon="eva:eye-outline" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Contract Details Modal
      <ContractModal
        open={openDetails}
        onClose={handleCloseDetails}
        contract={row}
        onStatusChange={(newStatus) => handleStatusChange(row.id, newStatus)}
      /> */}
    </>
  );
}