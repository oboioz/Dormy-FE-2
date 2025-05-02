import { useEffect, useState } from "react";
// form
import { useFormContext } from "react-hook-form";
// @mui
import { Button, Divider, Stack, Typography } from "@mui/material";
// import { _invoiceAddressTo } from '../../../../../_mock/arrays';
import Iconify from "../../../../../components/iconify";
import useResponsive from "../../../../../hooks/useResponsive";
import InvoiceRecipientListDialog from "./InvoiceRecipientListDialog";
import { RoomRecipients } from "../../../../../models/responses/InvoiceResponseModels";
import { toast } from "react-toastify";
import { httpClient } from "../../../../../services";

// ----------------------------------------------------------------------
type Props = {
  isEdit: boolean;
  roomId?: string;
};

export default function InvoiceNewEditAddress({isEdit, roomId}: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [roomRecipients, setRoomRecipients] = useState<RoomRecipients[]>([]);

  const upMd = useResponsive("up", "md");

  const values = watch();

  const { invoiceTo } = values;

  const [openTo, setOpenTo] = useState(false);

  const handleOpenTo = () => {
    setOpenTo(true);
  };

  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const fetchRoomsDataForCreateInvoice = async () => {
    const response =
      await httpClient.invoiceService.getRoomsForInitialInvoiceCreation();

    if (response) {
      setRoomRecipients(response);
      if (isEdit) {
        console.log("roomId:", roomId);
        const selectedRoom = response.find((room) => room.roomId === roomId);
        console.log("selectedRoom:", selectedRoom);
        if (selectedRoom) {
          setValue("invoiceTo", selectedRoom);
        } else {
          setValue("invoiceTo", null);
        }
      } else {
        setValue("invoiceTo", null);
      }
    } else {
      setRoomRecipients([]);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchRoomsDataForCreateInvoice();
  }, [roomId]);

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: "column", md: "row" }}
      divider={
        <Divider
          flexItem
          orientation={upMd ? "vertical" : "horizontal"}
          sx={{ borderStyle: "dashed" }}
        />
      }
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography variant="h6" /*sx={{ color: "text.disabled" }}*/>
            To:{" "}
            {invoiceTo ? (
              `${invoiceTo.roomNumber} - Floor: ${invoiceTo.floorNumber} - Building: ${invoiceTo.buildingName}`
            ) : (
              <Typography
                component="span"
                variant="caption"
                sx={{ color: "error.main" }}
              >
                {(errors.invoiceTo as any)?.message}
              </Typography>
            )}
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon={"eva:edit-fill"} />}
            onClick={handleOpenTo}
            // disabled={isEdit}
          >
            Change
          </Button>

          <InvoiceRecipientListDialog
            open={openTo}
            onClose={handleCloseTo}
            selected={(selectedId: string) => invoiceTo?.id === selectedId}
            onSelect={(address) => setValue("invoiceTo", address)}
            recipientOptions={roomRecipients}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RoomInfoProps = {
  roomRecipient: RoomRecipients;
};

function RoomInfo({ roomRecipient }: RoomInfoProps) {
  return (
    <>
      <Typography variant="subtitle2">
        {`${roomRecipient.roomNumber} - Floor: ${roomRecipient.floorNumber} - Building: ${roomRecipient.buildingName}`}
      </Typography>
    </>
  );
}
