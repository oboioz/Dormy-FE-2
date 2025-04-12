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

type ViewDetailInvoiceModalProps = {
    open: boolean;
    onClose: () => void;
    invoiceId: string;
};

export default function ViewDetailInvoiceModal({
    open,
    onClose,
    invoiceId,
}: ViewDetailInvoiceModalProps) {

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

    return (
        <Dialog open={open} onClose={onClose} maxWidth={invoice?.type === "ROOM_SERVICE_MONTHLY" ? "lg" : "md"} fullWidth>
        <DialogTitle>Invoice Details</DialogTitle>
        <DialogContent dividers>
            <Stack spacing={2}>
            {/* Invoice Information */}
            <Typography align="center" variant="h4">{invoice?.invoiceName}</Typography>
            <Stack spacing={1}>
                {/* <Typography variant="body2">
                <strong>Invoice Name:</strong> {invoice?.invoiceName}
                </Typography> */}
                <Typography variant="body2">
                    <strong>Due Date: </strong> {fDate(invoice?.dueDate, "dd/MM/yyyy")}
                </Typography>
                <Typography variant="body2">
                    <strong>Amount Before Promotion: </strong>
                    {fCurrency(invoice?.amountBeforePromotion)}
                </Typography>
                <Typography variant="body2">
                    <strong>Amount After Promotion: </strong>
                    {fCurrency(invoice?.amountAfterPromotion)}
                </Typography>
                <Typography variant="body2">
                    <strong>Status: </strong> 
                    <InvoiceStatusTag status={invoice?.status || ""} />
                </Typography>
                <Typography variant="body2">
                    <strong>Room: </strong> {invoice?.roomName}
                </Typography>
                <Typography variant="body2">
                    <strong>Created By: </strong> {invoice?.createdBy}
                </Typography>
                <Typography variant="body2">
                    <strong>Last Updated By: </strong> {invoice?.lastUpdatedBy}
                </Typography>
            </Stack>

            {/* Invoice Items */}
            <Typography variant="h6" sx={{ mt: 3 }}>
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
                        <TableCell align="right">{fCurrency(item.cost)}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        {invoice?.type === "ROOM_SERVICE_MONTHLY" && (
                            <>
                                <TableCell align="center">{item.oldIndicator}</TableCell>
                                <TableCell align="center">{item.newIndicator}</TableCell>
                            </>
                        )}
                        <TableCell align="right">{fCurrency(item.cost * item.quantity)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} variant="contained">
                Close
            </Button>
        </DialogActions>
        </Dialog>
    );
}
