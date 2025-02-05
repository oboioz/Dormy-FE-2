// form
import { useForm } from 'react-hook-form';
// @mui
import { Box, Card, CardHeader, Divider, Stack } from '@mui/material';
import FormProvider, { RHFTextField } from '../../../../../components/hook-form';

// utils


// ----------------------------------------------------------------------

type FormValuesProps = {
    displayName: string;
    email: string;
    photoURL: string | null;
    phoneNumber: string | null;
    country: string | null;
    address: string | null;
    state: string | null;
    city: string | null;
    zipCode: string | null;
    about: string | null;
    isPublic: boolean;
};

export default function ProfileInformation() {

    const defaultValues = {
        displayName: '',
        email: '',
        photoURL: null,
        phoneNumber: '',
        country: '',
        address: '',
        state: '',
        city: '',
        zipCode: '',
        about: '',
        isPublic: false,
    };

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log('DATA', data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                    <CardHeader title="Personal Information" />
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField name="displayName" label="Name" />

                        <RHFTextField name="email" label="Email Address" />

                        <RHFTextField name="phoneNumber" label="Phone Number" />

                        <RHFTextField name="address" label="Address" />

                        <RHFTextField name="country" label="Country" placeholder="Country" />

                        <RHFTextField name="state" label="State/Region" />

                        <RHFTextField name="city" label="City" />

                        <RHFTextField name="zipCode" label="Zip/Code" />
                    </Box>
                </Card>



                <Card sx={{ p: 3 }}>
                    <CardHeader title="Personal Information" />
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField name="displayName" label="Name" />

                        <RHFTextField name="email" label="Email Address" />

                        <RHFTextField name="phoneNumber" label="Phone Number" />

                        <RHFTextField name="address" label="Address" />

                        <RHFTextField name="country" label="Country" placeholder="Country" />

                        <RHFTextField name="state" label="State/Region" />

                        <RHFTextField name="city" label="City" />

                        <RHFTextField name="zipCode" label="Zip/Code" />
                    </Box>
                </Card>

                <Divider variant="middle" component="li" />

                <Card sx={{ p: 3 }}>
                    <CardHeader title="Personal Information" />
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField name="displayName" label="Name" />

                        <RHFTextField name="email" label="Email Address" />

                        <RHFTextField name="phoneNumber" label="Phone Number" />

                        <RHFTextField name="address" label="Address" />

                        <RHFTextField name="country" label="Country" placeholder="Country" />

                        <RHFTextField name="state" label="State/Region" />

                        <RHFTextField name="city" label="City" />

                        <RHFTextField name="zipCode" label="Zip/Code" />
                    </Box>
                </Card>
            </Stack>
        </FormProvider>
    );
}
