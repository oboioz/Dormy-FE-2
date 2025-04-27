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
import { CreateInvoiceRequestModel } from "../../../../../models/requests/InvoiceRequestModels";
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
  isEdit?: boolean;
  currentInvoice?: FormValuesProps;
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice }: Props) {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const [items, setItems] = useState<
    GetInitialInvoiceItemCreationResponseModel[]
  >([]);

  const NewUserSchema = Yup.object().shape({
    invoiceMonthYear: Yup.date()
        .nullable()
        .required("Start date is required"),
    // createDate: Yup.string().nullable().required("Create date is required"),
    // dueDate: Yup.string().nullable().required("Due date is required"),
    invoiceTo: Yup.mixed().nullable().required("Invoice to is required"),
  });

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
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

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
        toast.success("Invoice created successfully!");
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

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditAddress />

        <InvoiceNewEditStatusDate />

        <InvoiceNewEditDetails
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
          onClick={handleSubmit(handleCreateInvoice)}
        >
          {isEdit ? "Update" : "Create"}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
