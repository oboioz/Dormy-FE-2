// form
// @mui
import { Box, Card, CardHeader, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from '../../../components/hook-form';

// utils


// ----------------------------------------------------------------------

type FormValuesProps = {
    adminID: string;
    role: string;

    displayName: string;
    gender: string;
    email: string;
    phoneNumber: string;
};

export default function AdminInformation() {

    const defaultValues = {
        adminID: '4JHDL6HKE',
        role: 'Supervisor',

        displayName: 'Dat',
        gender: 'Male',
        email: 'dat.nguyen@example.com',
        phoneNumber: '0987654321',
    };

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });

    return (
        <FormProvider methods={methods}>
            <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                    <CardHeader title="Administrator Information" />
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField name="adminID" label="Admin ID" InputProps={{ readOnly: true }} />

                        <RHFTextField name="role" label="Role" InputProps={{ readOnly: true }} />
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
                        <RHFTextField name="displayName" label="Name" InputProps={{ readOnly: true }} />

                        <RHFTextField name="gender" label="Gender" InputProps={{ readOnly: true }} />

                        <RHFTextField name="email" label="Email Address" InputProps={{ readOnly: true }} />

                        <RHFTextField name="phoneNumber" label="Phone Number" InputProps={{ readOnly: true }} />

                    </Box>
                </Card>
            </Stack>
        </FormProvider>

    );
}
