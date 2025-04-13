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
import { ContractStatusEnum } from "../../../../models/enums/ContractStatusEnum";

type ContractModalProps = {
    open: boolean;
    onClose: () => void;
    contract: ContractResponseModel;
};

export default function ContractModal({
    open,
    onClose,
    contract,
    onStatusChange,
}: ContractModalProps & { onStatusChange: (newStatus: string) => void }) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmAction, setConfirmAction] = useState<ContractStatusEnum | null>(null);

    const handleOpenConfirm = (action: ContractStatusEnum) => {
        setConfirmAction(action);
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setConfirmAction(null);
    };

    const handleConfirmAction = async () => {
        if (!confirmAction) return;

        try {
            let response;
            switch (confirmAction) {
                case ContractStatusEnum.WAITING_PAYMENT:
                    response = await httpClient.contractService.approveOrRejectContract(contract.id, { isAccepted: true });
                    break;
                case ContractStatusEnum.REJECTED:
                    response = await httpClient.contractService.approveOrRejectContract(contract.id, { isAccepted: false });
                    break;
                case ContractStatusEnum.ACTIVE:
                    response = await httpClient.contractService.activeContract(contract.id);
                    break;
                case ContractStatusEnum.TERMINATED:
                    response = await httpClient.contractService.terminateContract(contract.id);
                    break;
            }
            // const payload = { isAccepted: confirmAction === "APPROVE" ? true : false };
            // const success = await httpClient.contractService.approveOrRejectContract(contract.id, payload);

            if (response) {
                const newStatus = confirmAction.toString();
                toast.success(`Contract ${confirmAction.toLowerCase()}d successfully.`);
                onStatusChange(newStatus);
                onClose();
            } else {
                toast.error(`Failed to ${confirmAction.toLowerCase()} the contract.`);
            }
        } catch (error) {
            toast.error(`Error during ${confirmAction.toLowerCase()} action:` + error);
        } finally {
            handleCloseConfirm();
        }
    };

    const buildTitleForConfirmDialog = (action: ContractStatusEnum) => {
        switch (action) {
            case ContractStatusEnum.WAITING_PAYMENT:
                return "Approve contract";
            case ContractStatusEnum.ACTIVE:
                return "Payment confirmation";
            case ContractStatusEnum.EXTENDED:
                return "Extend contract";
            case ContractStatusEnum.REJECTED:
                return "Reject contract";
            case ContractStatusEnum.TERMINATED:
                return "Terminate contract";
            default:
                return "Contract confirmation";
        }
    };

    const buildContentForConfirmDialog = (action: ContractStatusEnum) => {
        switch (action) {
            case ContractStatusEnum.WAITING_PAYMENT:
                return "Are you sure you want to APPROVE this contract?";
            case ContractStatusEnum.ACTIVE:
                return "Are you sure you PAY for this contract?";
            case ContractStatusEnum.EXTENDED:
                return "Are you sure you want to EXTEND this contract?";
            case ContractStatusEnum.REJECTED:
                return "Are you sure you want to REJECT this contract?";
            case ContractStatusEnum.TERMINATED:
                return "Are you sure you want to TERMINATE this contract?";
            default:
                return "Are you sure you want to perform this operation for contract?";
        }
    };

    const buildColorForConfirmButtonConfirmDialog = (
        action: ContractStatusEnum
    ) => {
        switch (action) {
            case ContractStatusEnum.WAITING_PAYMENT:
                return "warning";
            case ContractStatusEnum.ACTIVE:
                return "success";
            case ContractStatusEnum.EXTENDED:
                return "info";
            case ContractStatusEnum.REJECTED:
                return "error";
            case ContractStatusEnum.TERMINATED:
                return "error";
            default:
                return "secondary";
        }
    };

    const buildActionForConfirmDialog = (action: ContractStatusEnum) => {
        switch (action) {
            case ContractStatusEnum.WAITING_PAYMENT:
                return "Approve contract";
            case ContractStatusEnum.ACTIVE:
                return "Payment confirmation";
            case ContractStatusEnum.EXTENDED:
                return "Extend contract";
            case ContractStatusEnum.REJECTED:
                return "Reject contract";
            case ContractStatusEnum.TERMINATED:
                return "Terminate contract";
            default:
                return "Contract";
        }
    };

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
                {contract.status === ContractStatusEnum.PENDING.toString() ? (
                    <>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.WAITING_PAYMENT)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.WAITING_PAYMENT)}
                        >
                            {buildActionForConfirmDialog(ContractStatusEnum.WAITING_PAYMENT)}
                        </Button>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.REJECTED)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.REJECTED)}
                        >
                            {buildActionForConfirmDialog(ContractStatusEnum.REJECTED)}
                        </Button>
                    </>
                ) : contract.status === ContractStatusEnum.WAITING_PAYMENT.toString() ? (
                    <>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.ACTIVE)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.ACTIVE)}
                        >
                            {buildActionForConfirmDialog(ContractStatusEnum.ACTIVE)}
                        </Button>
                    </>
                ) : contract.status === ContractStatusEnum.ACTIVE.toString() ? (
                    <>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.EXTENDED)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.EXTENDED)}
                        >
                            {buildActionForConfirmDialog(ContractStatusEnum.EXTENDED)}
                        </Button>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.TERMINATED)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.TERMINATED)}
                        >
                            {buildActionForConfirmDialog(ContractStatusEnum.TERMINATED)}
                        </Button>
                    </>
                ) : null}
                    <Button onClick={onClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirm Dialog */}
            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title={buildTitleForConfirmDialog(confirmAction)}
                content={buildContentForConfirmDialog(confirmAction)}
                action={
                    <Button
                        variant="contained"
                        color={buildColorForConfirmButtonConfirmDialog(confirmAction)}
                        onClick={handleConfirmAction}
                    >
                        {buildActionForConfirmDialog(confirmAction)}
                    </Button>
                }
            />
        </>
    );
}