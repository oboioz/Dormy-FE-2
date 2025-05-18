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
  Grid,
  Link,
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
import Iconify from "../../../../components/iconify";

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
      const response = await httpClient.invoiceService.updateInvoiceStatus(
        payload
      );

      if (response) {
        const newStatus = confirmAction.toString();
        toast.success(`Invoice ${confirmAction.toLowerCase()}d successfully.`);
        onStatusChange(newStatus);
        onClose();
      } else {
        toast.error(`Failed to ${confirmAction.toLowerCase()} the invoice.`);
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
        return "Confirm to pay invoice";
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
              <Grid container spacing={3}>
                {/* First Column */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Due Date: </strong>{" "}
                    {fDate(invoice?.dueDate, "dd/MM/yyyy")}
                  </Typography>
                  {invoice?.type === "ROOM_SERVICE_MONTHLY" && (
                    <Typography variant="body2">
                      <strong>Month/Year: </strong>{" "}
                      {invoice?.month + "/" + invoice?.year}
                    </Typography>
                  )}
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end", // Aligns the content to the right
                      alignItems: "center", // Vertically aligns the content
                      fontSize: "1rem",
                    }}
                  >
                    {/* <strong>Status: </strong> */}
                    <InvoiceStatusTag
                      status={invoice?.status || ""}
                      sx={{ fontSize: "1.5rem", alignItems: "right" }}
                    />
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <strong>Send to: </strong>
                {invoice?.invoiceUsers.map((x, index) => (
                  <Typography
                    key={x.userName}
                    variant="body2"
                    sx={{
                      backgroundColor: "background.paper",
                      padding: "2px 8px",
                      borderRadius: 1,
                      boxShadow: 1,
                      display: "inline-block",
                    }}
                  >
                    {x.userName}
                    {index < invoice.invoiceUsers.length - 1 && ","}
                  </Typography>
                ))}
              </Typography>

              <Grid container>
                {/* First Column */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">
                    <strong>Created by: </strong>{" "}
                    {invoice?.lastUpdatedByUpdater}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Created at: </strong>{" "}
                    {fDate(invoice?.lastUpdatedDateUtc, "dd/MM/yyyy")}
                  </Typography>
                </Grid>

                {/* Second Column */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  {invoice?.type === "PAYMENT_CONTRACT" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify
                        icon="eva:file-text-outline"
                        sx={{ color: "primary.main", fontSize: 22 }}
                      />
                      <Link
                        variant="body2"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          window.open(
                            `/admin/contract/${invoice?.contractId}`,
                            "_blank"
                          )
                        }
                        sx={{
                          color: "primary.main",
                          textDecoration: "underline",
                          fontWeight: 600,
                          fontSize: 16,
                          transition: "color 0.2s",
                          "&:hover": { color: "primary.dark" },
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        View Contract
                      </Link>
                    </Stack>
                  )}
                </Grid>
              </Grid>
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
          ) : invoice?.status === "UNPAID" ? (
            <Button
              onClick={() => handleOpenConfirm(InvoiceStatusEnum.PAID)}
              variant="contained"
              color="success"
            >
              {buildActionForConfirmDialog(InvoiceStatusEnum.PAID)}
            </Button>
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
