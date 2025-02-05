// @mui
import { Button, Stack, Typography } from '@mui/material';
// @types
// components
import { IHistory } from '../../@types/vehicle';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  histories: IHistory[]; // Correctly typed as an array of IHistory
};


export default function HistoryPartition({ histories }: Props) {

  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="overline" sx={{ width: 1, color: 'text.secondary' }}>
        History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {histories.slice(0, 6).map((history) => (
          <Stack key={history.historyID} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 120 }}>
              history.time
            </Typography>

            <Typography variant="body2" color={'success'}>{history.action}</Typography>

          </Stack>
        ))}
      </Stack>

      <Button size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
        Full History
      </Button>
    </Stack>
  );
}
