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
import ContractModal from "../contract/ContractModal";
import { ContractResponseModel } from "../../../../models/responses/ContractResponseModels";
import { useAuthContext } from "../../../../auth/JwtContext";
import ContractStatusTag from "../../../tag/ContractStatusTag";

type ContractRowProps = {
  row: ContractResponseModel;
  setContracts: React.Dispatch<React.SetStateAction<ContractResponseModel[]>>;
  selected: boolean;
  onSelectRow: () => void;
};

export default function ContractRow({ row, setContracts, selected, onSelectRow }: ContractRowProps) {
  const {
    startDate,
    endDate,
    userFullname,
    roomNumber,
    buildingName,
    roomTypeName,
    approverFullName,
    status,
  } = row;

  const { user } = useAuthContext();
  const [openDetails, setOpenDetails] = useState(false);
  const handleStatusChange = (contractId: string, newStatus: string) => {
    setContracts((prevContracts) =>
        prevContracts.map((contract) =>
            contract.id === contractId ? { ...contract, status: newStatus, approverFullName: user?.name || "--" } : contract
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

        <TableCell align="left">{fDate(startDate, "dd/MM/yyyy")}</TableCell>
        <TableCell align="left">{fDate(endDate, "dd/MM/yyyy")}</TableCell>
        <TableCell align="left">{userFullname}</TableCell>
        <TableCell align="center">{roomNumber}</TableCell>
        <TableCell align="center">{buildingName}</TableCell>
        <TableCell align="left">{roomTypeName}</TableCell>
        <TableCell align="left">{approverFullName || "N/A"}</TableCell>
        <TableCell align="left">
          <ContractStatusTag status={status}/>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenDetails}>
            <Iconify icon="eva:eye-outline" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Contract Details Modal */}
      <ContractModal
        open={openDetails}
        onClose={handleCloseDetails}
        contract={row}
        onStatusChange={(newStatus) => handleStatusChange(row.id, newStatus)}
      />
    </>
  );
}