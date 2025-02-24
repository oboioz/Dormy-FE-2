import { useState } from 'react';
// @mui
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
// @types
import { ICheckoutBillingAddress } from '../../../../../@types/product';
// _mock
import { _addressBooks } from '../../../../../_mock/arrays';
// components
import Iconify from '../../../../../components/iconify';
import Label from '../../../../../components/label';
//
import * as Yup from "yup";
import { IUserGuardian } from '../../@types/user';
import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingNewAddressForm from './CheckoutBillingNewAddressForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


// ----------------------------------------------------------------------

const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];

type Props = {
  guardian: IUserGuardian;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction
};

type FormValuesProps = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  relationshipToUser: string;
};

const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .required('First name is required')
    .min(6, 'Mininum 6 characters')
    .max(32, 'Maximum 32 characters'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  phoneNumber: Yup.string().required('Phone number is required!'),
  address: Yup.string().required('Address is required!'),
  relationshipToUser: Yup.string().required('Relationship is required!'),
});

const defaultValues: FormValuesProps = {
  name: '',
  email: '',
  phoneNumber: '',
  address: '',
  relationshipToUser: '',
};

export default function GuardianInformationForm({ guardian, onNextStep, onBackStep }: Props) {


  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('DATA', data);
    reset();
  };



  const { total, discount, subtotal } = checkout;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {_addressBooks.map((address, index) => (
            <AddressItem
              key={index}
              address={address}
              onCreateBilling={() => onCreateBilling(address)}
            />
          ))}

          <Stack direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>

            <Button
              size="small"
              variant="soft"
              onClick={handleOpen}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add new address
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
        </Grid>
      </Grid>

      <CheckoutBillingNewAddressForm
        open={open}
        onClose={handleClose}
        onCreateBilling={onCreateBilling}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type AddressItemProps = {
  address: ICheckoutBillingAddress;
  onCreateBilling: VoidFunction;
};

function AddressItem({ address, onCreateBilling }: AddressItemProps) {
  const { receiver, fullAddress, addressType, phoneNumber, isDefault } = address;

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Stack
        spacing={2}
        alignItems={{
          md: 'flex-end',
        }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Stack flexGrow={1} spacing={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1">
              {receiver}
              <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
                ({addressType})
              </Box>
            </Typography>

            {isDefault && (
              <Label color="info" sx={{ ml: 1 }}>
                Default
              </Label>
            )}
          </Stack>

          <Typography variant="body2">{fullAddress}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {phoneNumber}
          </Typography>
        </Stack>

        <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
          {!isDefault && (
            <Button variant="outlined" size="small" color="inherit" sx={{ mr: 1 }}>
              Delete
            </Button>
          )}

          <Button variant="outlined" size="small" onClick={onCreateBilling}>
            Deliver to this Address
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
