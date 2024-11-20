// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardHeader, Stack } from '@mui/material';
import FormProvider, { RHFTextField } from '../../../../../components/hook-form';
import { RHFSelect } from '../../../../../components/hook-form/RHFSelect';

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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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

                    <RHFSelect native name="country" label="Country" placeholder="Country">
                        <option value="" />
                    </RHFSelect>

                    <RHFTextField name="state" label="State/Region" />

                    <RHFTextField name="city" label="City" />

                    <RHFTextField name="zipCode" label="Zip/Code" />
                </Box>

                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                    <RHFTextField name="about" multiline rows={4} label="About" />

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Save Changes
                    </LoadingButton>
                </Stack>
            </Card>
        </FormProvider>
    );
}
