import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
} from "@mui/material";
import { fDate } from "../../../../utils/formatTime";
import { ContractResponseModel } from "../../../../models/responses/ContractResponseModels";
import { httpClient } from "../../../../services";
import ConfirmDialog from "../../../../components/confirm-dialog";
import { toast } from "react-toastify";
import ContractExtensionStatusTag from "../../../tag/ContractExtensionStatusTag";
import ContractStatusTag from "../../../tag/ContractStatusTag";

type UserContractModalProps = {
    open: boolean;
    onClose: () => void;
    contract: ContractResponseModel;
};

export default function UserContractModal({
    open,
    onClose,
    contract,
    // onStatusChange,
}: UserContractModalProps) {
    // const [openConfirm, setOpenConfirm] = useState(false);
    // const [confirmAction, setConfirmAction] = useState<"APPROVE" | "REJECT" | null>(null);

    // const handleOpenConfirm = (action: "APPROVE" | "REJECT") => {
    //     setConfirmAction(action);
    //     setOpenConfirm(true);
    // };

    // const handleCloseConfirm = () => {
    //     setOpenConfirm(false);
    //     setConfirmAction(null);
    // };

    // const handleConfirmAction = async () => {
    //     if (!confirmAction) return;

    //     try {
    //         const payload = { isAccepted: confirmAction === "APPROVE" ? true : false };
    //         const success = await httpClient.contractService.approveOrRejectContract(contract.id, payload);

    //         if (success) {
    //             const newStatus = confirmAction === "APPROVE" ? "WAITING_PAYMENT" : "REJECTED";
    //             toast.success(`Contract ${confirmAction.toLowerCase()}d successfully.`);
    //             onClose();
    //         } else {
    //             toast.error(`Failed to ${confirmAction.toLowerCase()} the contract.`);
    //         }
    //     } catch (error) {
    //         toast.error(`Error during ${confirmAction.toLowerCase()} action:` + error);
    //     } finally {
    //         handleCloseConfirm();
    //     }
    // };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle
                    sx={{
                        textAlign: "center", // Center-align the title
                    }}
                >
                    Contract Details
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2}>
                        <Typography variant="body2">
                            <strong>Tenant:</strong> {contract.userFullname}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Submission Date:</strong> {fDate(contract.submissionDate, "dd/MM/yyyy")}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Start Date:</strong> {fDate(contract.startDate, "dd/MM/yyyy")}
                        </Typography>
                        <Typography variant="body2">
                            <strong>End Date:</strong> {fDate(contract.endDate, "dd/MM/yyyy")}
                        </Typography>

                        <Typography variant="body2">
                            <strong>Workplace:</strong> {contract.workplaceName}
                        </Typography>

                        <Typography variant="body2">
                            <strong>Insurance Card Number:</strong> {contract.insuranceCardNumber}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Registered Hospital:</strong> {contract.registeredHospital}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Expiration Date:</strong> {fDate(contract.expirationDate)}
                        </Typography>

                        <Typography variant="body2">
                            <strong>Room Number:</strong> {contract.roomNumber}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Room Type:</strong> {contract.roomTypeName}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Building:</strong> {contract.buildingName}
                        </Typography>

                        <Typography variant="body2">
                            <strong>Approver:</strong> {contract.approverFullName || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Status:</strong>{" "}
                            <ContractStatusTag status={contract.status}/>
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    {/* {contract.status === "PENDING" ? (
                        <>
                            <Button
                                onClick={() => handleOpenConfirm("APPROVE")}
                                variant="contained"
                                color="success"
                            >
                                Approve
                            </Button>
                            <Button
                                onClick={() => handleOpenConfirm("REJECT")}
                                variant="contained"
                                color="error"
                            >
                                Reject
                            </Button>
                        </>
                    ) : null} */}
                    <Button onClick={onClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirm Dialog */}
            {/* <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title={confirmAction === "APPROVE" ? "Approve Contract" : "Reject Contract"}
                content={`Are you sure you want to ${
                    confirmAction === "APPROVE" ? "approve" : "reject"
                } this contract?`}
                action={
                    <Button
                        variant="contained"
                        color={confirmAction === "APPROVE" ? "success" : "error"}
                        onClick={handleConfirmAction}
                    >
                        {confirmAction === "APPROVE" ? "Approve" : "Reject"}
                    </Button>
                }
            /> */}
        </>
    );
}