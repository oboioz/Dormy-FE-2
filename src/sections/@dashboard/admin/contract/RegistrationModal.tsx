import { useState } from "react";
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
import { httpClient } from "../../../../services";
import ConfirmDialog from "../../../../components/confirm-dialog";
import { toast } from "react-toastify";
import ContractStatusTag from "../../../tag/ContractStatusTag";
import { ContractStatusEnum } from "../../../../models/enums/ContractStatusEnum";
import { RegistrationAccommodationResponseModel } from "../../../../models/responses/RegistrationModels";

type RegistrationModalProps = {
    open: boolean;
    onClose: () => void;
    registration: RegistrationAccommodationResponseModel;
};

export default function RegistrationModal({
    open,
    onClose,
    registration,
    // onStatusChange,
}: RegistrationModalProps/* & { onStatusChange: (newStatus: string) => void }*/) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmAction, setConfirmAction] = useState<ContractStatusEnum | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

        try {
            let response;
            switch (confirmAction) {
                case ContractStatusEnum.WAITING_PAYMENT:
                    response = await httpClient.contractService.approveOrRejectContract(registration.contractInformation.contractId, { isAccepted: true });
                    break;
                case ContractStatusEnum.REJECTED:
                    response = await httpClient.contractService.approveOrRejectContract(registration.contractInformation.contractId, { isAccepted: false });
                    break;
                case ContractStatusEnum.ACTIVE:
                    response = await httpClient.contractService.activeContract(registration.contractInformation.contractId);
                    break;
                case ContractStatusEnum.TERMINATED:
                    response = await httpClient.contractService.terminateContract(registration.contractInformation.contractId);
                    break;
            }

            if (response) {
                // const newStatus = confirmAction.toString();
                toast.success(`Contract ${confirmAction.toLowerCase()}d successfully.`);
                onClose();
                window.location.reload();
            } else {
                toast.error(`Failed to ${confirmAction.toLowerCase()} the contract.`);
            }
            setIsLoading(false);
        } catch (error) {
            toast.error(`Error during ${confirmAction.toLowerCase()} action:` + error);
            setIsLoading(false);
        } finally {
            handleCloseConfirm();
            setIsLoading(false);
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
                    {registration.orderNo === 0 ? "Contract Details" : "Contract Extension Details"}
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2}>
                        <Typography variant="body2">
                            <strong>Tenant:</strong> {registration.userFullname}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Submission Date:</strong> {fDate(registration.submissionDate, "dd/MM/yyyy")}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Contract period: </strong>
                            {fDate(registration.startDate, "dd/MM/yyyy")}
                            {" - "}
                            {fDate(registration.endDate, "dd/MM/yyyy")}
                        </Typography>

                        <Typography variant="body2">
                            <strong>Workplace:</strong> {registration.workplaceName}
                        </Typography>

                        <Typography variant="body2">
                            <strong>Insurance Card Number:</strong> {registration.insuranceCardNumber}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Registered Hospital:</strong> {registration.registeredHospital}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Expiration Date:</strong> {fDate(registration.expirationDate)}
                        </Typography>

                        <Typography variant="body2">
                            <strong>Room Number: </strong> {registration.roomNumber}
                            {"  -  "} 
                            <strong>Building: </strong> {registration.buildingName}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Room Type:</strong> {registration.roomTypeName}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Status:</strong>{" "}
                            <ContractStatusTag status={registration.status}/>
                        </Typography>
                        

                        {registration.orderNo !== 0 && (
                            <>
                                <Typography variant="body2">
                                    <strong>BE EXTENDED FROM THE CONTRACT: </strong>
                                    {/* {registration.contractInformation.contractId.slice(0, 8)} */}
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 8 }}>
                                    <strong>Submission Date: </strong> 
                                    {fDate(registration.contractInformation.submissionDate, "dd/MM/yyyy")}
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 8 }}>
                                    <strong>Contract period: </strong>
                                    {fDate(registration.contractInformation.startDate, "dd/MM/yyyy")}
                                    {" - "}
                                    {fDate(registration.contractInformation.endDate, "dd/MM/yyyy")}
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 8 }}>
                                    <strong>Status:</strong>{" "}
                                    <ContractStatusTag status={registration.contractInformation.status}/>
                                </Typography>
                            </>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                {registration.status === ContractStatusEnum.PENDING.toString() ? (
                    <>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.WAITING_PAYMENT)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.WAITING_PAYMENT)}
                            disabled={isLoading}
                        >
                            {buildActionForConfirmDialog(ContractStatusEnum.WAITING_PAYMENT)}
                        </Button>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.REJECTED)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.REJECTED)}
                            disabled={isLoading}
                        >
                            {buildActionForConfirmDialog(ContractStatusEnum.REJECTED)}
                        </Button>
                    </>
                ) : registration.status === ContractStatusEnum.WAITING_PAYMENT.toString() ? (
                    <>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.ACTIVE)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.ACTIVE)}
                            disabled={isLoading}
                        >
                            {buildActionForConfirmDialog(ContractStatusEnum.ACTIVE)}
                        </Button>
                    </>
                ) : registration.status === ContractStatusEnum.ACTIVE.toString() ? (
                    <>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.EXTENDED)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.EXTENDED)}
                            disabled={isLoading}
                        >
                            {buildActionForConfirmDialog(ContractStatusEnum.EXTENDED)}
                        </Button>
                        <Button
                            onClick={() => handleOpenConfirm(ContractStatusEnum.TERMINATED)}
                            variant="contained"
                            color={buildColorForConfirmButtonConfirmDialog(ContractStatusEnum.TERMINATED)}
                            disabled={isLoading}
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
                        disabled={isLoading}
                    >
                        {buildActionForConfirmDialog(confirmAction)}
                    </Button>
                }
            />
        </>
    );
}