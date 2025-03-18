// @mui
import { Stack, StackProps, Typography } from '@mui/material';
// assets

// ----------------------------------------------------------------------

export default function ProfileQR({ sx, ...other }: StackProps) {
    return (
        <Stack
            alignItems="center"
            sx={{ p: 5, borderRadius: 2, bgcolor: 'background.neutral', ...sx }}
            {...other}
        >
            <img alt="qrcode" src="/assets/illustrations/QRCode.svg" />

            <Typography variant="subtitle2" sx={{ color: 'text.disabled', textAlign: 'center' }}>
                Personal QRCode
            </Typography>
        </Stack>
    );
}
