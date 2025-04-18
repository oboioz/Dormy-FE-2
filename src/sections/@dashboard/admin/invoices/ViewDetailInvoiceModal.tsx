import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { DetailInvoiceResponseModel } from "../../../../models/responses/InvoiceResponseModels";
import { fDate } from "../../../../utils/formatTime";
import { httpClient } from "../../../../services";
import { toast } from "react-toastify";
import { fCurrency, fShortenNumber } from "../../../../utils/formatNumber";
import InvoiceStatusTag from "../../../tag/InvoiceStatusTag";
import ConfirmDialog from "../../../../components/confirm-dialog";
import { InvoiceStatusEnum } from "../../../../models/enums/InvoiceStatusEnum";
import { UpdateInvoiceStatusRequestModel } from "../../../../models/requests/InvoiceRequestModels";

type ViewDetailInvoiceModalProps = {
    open: boolean;
    onClose: () => void;
    invoiceId: string;
};

export default function ViewDetailInvoiceModal({
    open,
    onClose,
    invoiceId,
    onStatusChange,
}: ViewDetailInvoiceModalProps & {
    onStatusChange: (newStatus: string) => void;
}) {
    const [invoice, setInvoice] = useState<DetailInvoiceResponseModel>();
    const fetchInvoiceData = async () => {
        const response = await httpClient.invoiceService.getInvoiceById(invoiceId);

        if (response) {
        console.log("response", response);
        setInvoice(response);
        } else {
        toast.error("Failed to fetch data");
        }
    };

    useEffect(() => {
        fetchInvoiceData();
    }, []);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmAction, setConfirmAction] = useState<InvoiceStatusEnum | null>(
        null
    );

    const handleOpenConfirm = (action: InvoiceStatusEnum) => {
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
            const payload: UpdateInvoiceStatusRequestModel = {
                id: invoice.id,
                status: confirmAction.toString(),
            };
            const response = await httpClient.invoiceService.updateInvoiceStatus(payload);

            if (response) {
                const newStatus = confirmAction.toString();
                toast.success(
                `Invoice ${confirmAction.toLowerCase()}d successfully.`
                );
                onStatusChange(newStatus);
                onClose();
            } else {
                toast.error(
                `Failed to ${confirmAction.toLowerCase()} the invoice.`
                );
            }
        } catch (error) {
            toast.error(
                `Error during ${confirmAction.toLowerCase()} action:` + error
            );
        } finally {
            handleCloseConfirm();
        }
    };

    const buildTitleForConfirmDialog = (action: InvoiceStatusEnum) => {
        switch (action) {
            case InvoiceStatusEnum.UNPAID:
                return "Export invoice";
            case InvoiceStatusEnum.PAID:
                return "Payment confirmation";
            case InvoiceStatusEnum.CANCELLED:
                return "Cancel invoice";
            default:
                return "Invoice";
        }
    };

    const buildContentForConfirmDialog = (action: InvoiceStatusEnum) => {
        switch (action) {
            case InvoiceStatusEnum.UNPAID:
                return "Are you sure you want to EXPORT this invoice?";
            case InvoiceStatusEnum.PAID:
                return "Are you sure you PAY for this invoice?";
            case InvoiceStatusEnum.CANCELLED:
                return "Are you sure you want to CANCEL this invoice?";
            default:
                return "Are you sure you want to perform this operation for invoice?";
        }
    };

    const buildColorForConfirmButtonConfirmDialog = (
        action: InvoiceStatusEnum
    ) => {
        switch (action) {
            case InvoiceStatusEnum.UNPAID:
                return "warning";
            case InvoiceStatusEnum.PAID:
                return "success";
            case InvoiceStatusEnum.CANCELLED:
                return "error";
            default:
                return "secondary";
        }
    };

    const buildActionForConfirmDialog = (action: InvoiceStatusEnum) => {
        switch (action) {
            case InvoiceStatusEnum.UNPAID:
                return "Export invoice";
            case InvoiceStatusEnum.PAID:
                return "Pay invoice";
            case InvoiceStatusEnum.CANCELLED:
                return "Cancel invoice";
            default:
                return "Invoice";
        }
    };

    return (
        <>
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={invoice?.type === "ROOM_SERVICE_MONTHLY" ? "lg" : "md"}
            fullWidth
        >
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogContent dividers>
            <Stack spacing={2}>
                {/* Invoice Information */}
                <Typography align="center" variant="h4">
                {invoice?.invoiceName}
                </Typography>
                <Stack spacing={1}>
                <Typography variant="body2">
                    <strong>Due Date: </strong>{" "}
                    {fDate(invoice?.dueDate, "dd/MM/yyyy")}
                </Typography>
                <Typography variant="body2">
                    <strong>Room: </strong> {invoice?.roomName}
                </Typography>
                <Typography variant="body2">
                    <strong>Status: </strong>
                    <InvoiceStatusTag status={invoice?.status || ""} />
                </Typography>
                
                <Typography variant="body2">
                    <strong>Created by: </strong> {invoice?.createdByCreator}
                </Typography>
                <Typography variant="body2">
                    <strong>Created at: </strong> {fDate(invoice?.createdDateUtc, "dd/MM/yyyy")}
                </Typography>
                </Stack>

                {/* Invoice Items */}
                <Typography variant="h6" align="center" sx={{ mt: 3 }}>
                    Invoice Items
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Service Name</TableCell>
                            <TableCell align="right">Cost</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell>Unit</TableCell>
                            {invoice?.type === "ROOM_SERVICE_MONTHLY" && (
                            <>
                                <TableCell align="center">Old Indicator</TableCell>
                                <TableCell align="center">New Indicator</TableCell>
                            </>
                            )}
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {invoice?.invoiceItems.map((item) => (
                            <TableRow key={item.id}>
                            <TableCell>{item.roomServiceName}</TableCell>
                            <TableCell align="right">
                                {fCurrency(item.cost)}
                            </TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            {invoice?.type === "ROOM_SERVICE_MONTHLY" && (
                                <>
                                <TableCell align="center">
                                    {item.oldIndicator}
                                </TableCell>
                                <TableCell align="center">
                                    {item.newIndicator}
                                </TableCell>
                                </>
                            )}
                            <TableCell align="right">
                                {fCurrency(item.cost * item.quantity)}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <Typography variant="body2">
                    <strong>Amount Before Promotion: </strong>
                    {fCurrency(invoice?.amountBeforePromotion)}
                </Typography> */}
                <Typography variant="h4" align="right">
                    <strong>Total payment: </strong>
                    {fCurrency(invoice?.amountAfterPromotion)}
                </Typography>
            </Stack>
            </DialogContent>
            <DialogActions>
                {invoice?.status === "DRAFT" ? (
                    <>
                        <Button
                            onClick={() => handleOpenConfirm(InvoiceStatusEnum.UNPAID)}
                            variant="contained"
                            color="success"
                        >
                            {buildActionForConfirmDialog(InvoiceStatusEnum.UNPAID)}
                        </Button>
                        <Button
                            onClick={() => handleOpenConfirm(InvoiceStatusEnum.CANCELLED)}
                            variant="contained"
                            color="error"
                        >
                            {buildActionForConfirmDialog(InvoiceStatusEnum.CANCELLED)}
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
