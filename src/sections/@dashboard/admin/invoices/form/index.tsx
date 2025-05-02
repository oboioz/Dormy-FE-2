import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Card, Stack } from "@mui/material";
import FormProvider from "../../../../../components/hook-form";
import InvoiceNewEditAddress from "./InvoiceNewEditAddress";
import InvoiceNewEditDetails from "./InvoiceNewEditDetails";
import InvoiceNewEditStatusDate from "./InvoiceNewEditStatusDate";
import { GetInitialInvoiceItemCreationResponseModel, RoomRecipients } from "../../../../../models/responses/InvoiceResponseModels";
import { CreateInvoiceRequestModel, EditInvoiceRequestModel } from "../../../../../models/requests/InvoiceRequestModels";
import { getMonth, getYear } from "date-fns";
import { httpClient } from "../../../../../services";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateTimeUtils } from "../../../../../utils/DateTimeUtils";
import { PATH_ADMIN } from "../../../../../routes/paths";

// ----------------------------------------------------------------------

type IFormValuesProps = Omit<
  CreateInvoiceRequestModel,
  "dueDate" | "invoiceTo" | "invoiceMonthYear"
>;

interface FormValuesProps extends IFormValuesProps {
  dueDate: Date | null;
  invoiceTo: RoomRecipients | null;
  invoiceMonthYear: Date | null;
}

type Props = {
  isEdit: boolean;
  currentInvoice?: FormValuesProps;
  invoiceId?: string;
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice, invoiceId }: Props) {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const [items, setItems] = useState<
    GetInitialInvoiceItemCreationResponseModel[]
  >([]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [invoiceMonthYear, setInvoiceMonthYear] = useState<Date | null>(null);

  const NewUserSchema = Yup.object().shape({
    invoiceMonthYear: Yup.date()
        .nullable()
        .required("Start date is required"),
    // createDate: Yup.string().nullable().required("Create date is required"),
    // dueDate: Yup.string().nullable().required("Due date is required"),
    invoiceTo: Yup.mixed().nullable().required("Invoice to is required"),
  });

  const fetchgetInitialInvoiceEdit = async (invoiceId: string) => {
    const response = await httpClient.invoiceService.getInitialInvoiceEdit(invoiceId);

    if (response) {
      setItems(response.invoiceItems);
      setRoomId(response.roomId);
      setDueDate(new Date(response.dueDate));
      setInvoiceMonthYear(
        new Date(response.year, response.month - 1, 1)
      );
    } else {
      toast.error("Failed to fetch data");
    }
  };
  
  const defaultValues = useMemo(
    () => ({
      dueDate: currentInvoice?.dueDate || null,
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.invoiceItems || [
        {
          roomServiceId: null,
          roomServiceName: null,
          unit: null,
          quantity: 0,
          cost: null,
          oldIndicator: null,
          newIndicator: null,
        },
      ],
    }),
    [currentInvoice]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema) as any,
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const { control, watch } = useFormContext();

  //   const values = watch();

  useEffect(() => {
    if (isEdit && invoiceId) {
      // reset(defaultValues);
      fetchgetInitialInvoiceEdit(invoiceId);
      console.log("roomId-hoangtk5:", roomId);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, invoiceId]);

  const handleCreateInvoice = async (data: FormValuesProps) => {
    setLoadingSend(true);
    try {
      // Build the payload
      const payload: CreateInvoiceRequestModel = {
        dueDate: DateTimeUtils.toStringWithDefaultTime(data.dueDate),
        month: data.invoiceMonthYear
          ? getMonth(data.invoiceMonthYear) + 1
          : null,
        year: data.invoiceMonthYear ? getYear(data.invoiceMonthYear) : null,
        type: "ROOM_SERVICE_MONTHLY", // Replace with the actual type if needed
        roomId: data.invoiceTo?.roomId || "", // Ensure roomId is a string
        invoiceItems: items.map((item) => ({
          roomServiceId: item.roomServiceId,
          roomServiceName: item.roomServiceId ? "" : item.roomServiceName,
          cost: item.roomServiceId ? null : item.cost,
          unit: item.roomServiceId ? "" : item.unit,
          quantity: item.quantity,
          oldIndicator: item.oldIndicator,
          newIndicator: item.newIndicator,
        })),
      };

      const response = await httpClient.invoiceService.createInvoice(payload);
      if (response) {
        toast.success("Invoice was created successfully!");
        navigate(PATH_ADMIN.invoice.monthly);
      }
      else {
        toast.error("Failed to create invoice.");
      }
  
      // console.log("Payload:", JSON.stringify(payload, null, 2));
      setLoadingSend(false);
  
      // Uncomment this to navigate after successful creation
      // navigate(PATH_DASHBOARD.invoice.list);
    } catch (error) {
      toast.error("Failed to create invoice: " + error);
      setLoadingSend(false);
    }
  };

  const handleEditInvoice = async (data: FormValuesProps) => {
    setLoadingSend(true);
    try {
      // Build the payload
      const payload: EditInvoiceRequestModel = {
        id: invoiceId || "", // Ensure invoiceId is a string
        dueDate: DateTimeUtils.toStringWithDefaultTime(data.dueDate),
        month: data.invoiceMonthYear
          ? getMonth(data.invoiceMonthYear) + 1
          : null,
        year: data.invoiceMonthYear ? getYear(data.invoiceMonthYear) : null,
        type: "ROOM_SERVICE_MONTHLY", // Replace with the actual type if needed
        roomId: data.invoiceTo?.roomId || "", // Ensure roomId is a string
        invoiceItems: items.map((item) => ({
          roomServiceId: item.roomServiceId,
          roomServiceName: item.roomServiceId ? "" : item.roomServiceName,
          cost: item.roomServiceId ? null : item.cost,
          unit: item.roomServiceId ? "" : item.unit,
          quantity: item.quantity,
          oldIndicator: item.oldIndicator,
          newIndicator: item.newIndicator,
        })),
      };

      const response = await httpClient.invoiceService.updateInvoice(payload);
      if (response) {
        toast.success("Invoice was updated successfully!");
        navigate(PATH_ADMIN.invoice.monthly);
      }
      else {
        toast.error("Failed to update invoice.");
      }
  
      // console.log("Payload:", JSON.stringify(payload, null, 2));
      setLoadingSend(false);
  
      // Uncomment this to navigate after successful creation
      // navigate(PATH_DASHBOARD.invoice.list);
    } catch (error) {
      toast.error("Failed to update invoice: " + error);
      setLoadingSend(false);
    }
  };

  const handleSubmitInvoice = async (data: FormValuesProps) => {
    if (isEdit) {
      await handleEditInvoice(data);
    } else {
      await handleCreateInvoice(data);
    }
  }

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditAddress isEdit={isEdit} roomId={roomId}/>

        <InvoiceNewEditStatusDate isEdit={isEdit} invoiceMonthYear={invoiceMonthYear} dueDate={dueDate}/>

        <InvoiceNewEditDetails
          isEdit={isEdit}
          items={items}
          setItems={setItems}
        />
      </Card>

      <Stack
        justifyContent="flex-end"
        direction="row"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleSubmitInvoice)}
        >
          {isEdit ? "Update" : "Create"}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
