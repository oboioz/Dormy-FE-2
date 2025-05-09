import { useState } from "react";
// @mui
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
// utils
import { fCurrency } from "../../../../utils/formatNumber";
import { fDate } from "../../../../utils/formatTime";
// @types
// import { IInvoice } from '../../../../@types/invoice';
// components
import ConfirmDialog from "../../../../components/confirm-dialog";
import Iconify from "../../../../components/iconify";
import Label from "../../../../components/label";
import MenuPopover from "../../../../components/menu-popover";
import { InvoiceResponseModel } from "../../../../models/responses/InvoiceResponseModels";
import InvoiceStatusTag from "../../../tag/InvoiceStatusTag";
import { formatCurrency } from "../../../../utils/currencyUtils";
import ViewDetailInvoiceModal from "./ViewDetailInvoiceModal";
import { InvoiceStatusEnum } from "../../../../models/enums/InvoiceStatusEnum";

// ----------------------------------------------------------------------

type Props = {
  invoice: InvoiceResponseModel;
  setInvoices: React.Dispatch<React.SetStateAction<InvoiceResponseModel[]>>;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function InvoiceTableRow({
  invoice,
  setInvoices,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  // const { amountBeforePromotion, createdAt, dueDate, invoiceID, invoiceName, roomId, status, type, invoiceItems, description } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const [openViewDetail, setOpenViewDetail] = useState(false);

  const handleOpenViewDetail = () => {
    setOpenViewDetail(true);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
      )
    );
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {invoice.invoiceName}
          </Typography>
        </TableCell>
        {invoice.type === "ROOM_SERVICE_MONTHLY" && (
          <TableCell align="left">
            {invoice.month + "/" + invoice.year}
          </TableCell>
        )}
        <TableCell>{fDate(invoice.dueDate, "dd/MM/yyyy")}</TableCell>

        <TableCell align="right">
          {fCurrency(invoice.amountAfterPromotion)}
        </TableCell>
        {invoice.type === "PARKING_INVOICE" && (
          <TableCell align="left">{invoice.userFullname}</TableCell>
        )}
        <TableCell align="center">{invoice.roomName}</TableCell>

        <TableCell align="left">
          <InvoiceStatusTag status={invoice.status} />
        </TableCell>

        {invoice.type === "ROOM_SERVICE_MONTHLY" &&
        invoice.status === InvoiceStatusEnum.DRAFT.toString() ? (
          <TableCell align="right">
            <IconButton
              color={openPopover ? "inherit" : "default"}
              onClick={handleOpenPopover}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        ) : (
          <TableCell align="right">
            <IconButton
              onClick={() => {
                // onViewRow();
                handleOpenViewDetail();
                handleClosePopover();
              }}
            >
              <Iconify icon="eva:eye-outline" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            // onViewRow();
            handleOpenViewDetail();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />

      <ViewDetailInvoiceModal
        open={openViewDetail}
        onClose={() => setOpenViewDetail(false)}
        invoiceId={invoice.id}
        onStatusChange={(newStatus) =>
          handleStatusChange(invoice.id, newStatus)
        }
      />
    </>
  );
}
