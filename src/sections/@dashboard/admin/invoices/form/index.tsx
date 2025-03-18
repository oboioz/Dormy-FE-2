import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';



//
import { IInvoice, IInvoiceRecipient } from '../../../../../@types/invoice';
import FormProvider from '../../../../../components/hook-form';
import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';

// ----------------------------------------------------------------------

type IFormValuesProps = Omit<IInvoice, 'dueDate' | 'invoiceTo'>;

interface FormValuesProps extends IFormValuesProps {
  dueDate: Date | null;
  invoiceTo: IInvoiceRecipient | null;
}

type Props = {
  isEdit?: boolean;
  currentInvoice?: FormValuesProps;
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice }: Props) {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
    invoiceTo: Yup.mixed().nullable().required('Invoice to is required'),
  });

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceID || '17099',
      dueDate: currentInvoice?.dueDate || null,
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.invoiceItems || [
        { serviceName: '', unit: '', quantity: 1, cost: 0, total: 0 },
      ],
      totalPrice: currentInvoice?.amountAfterPromotion || 0,
    }),
    [currentInvoice]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  const handleCreateAndSend = async (data: FormValuesProps) => {
    // setLoadingSend(true);

    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   setLoadingSend(false);
    //   navigate(PATH_DASHBOARD.invoice.list);
    //   console.log('DATA', JSON.stringify(data, null, 2));
    // } catch (error) {
    //   console.error(error);
    //   setLoadingSend(false);
    // }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditAddress />

        <InvoiceNewEditStatusDate />

        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {isEdit ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
