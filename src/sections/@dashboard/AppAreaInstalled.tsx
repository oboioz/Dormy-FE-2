import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
// @mui
import { Box, Card, CardHeader, CardProps } from '@mui/material';
import Chart, { useChart } from '../../components/chart';
import { CustomSmallSelect } from '../../components/custom-input';


// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[];
    colors?: string[];
    series: {
      year: string;
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ApexOptions;
  };
}

export default function AppAreaInstalled({ title, subheader, chart, ...other }: Props) {
  const { colors, categories, series, options } = chart;

  const [seriesData, setSeriesData] = useState('2019');

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect
            value={seriesData}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSeriesData(event.target.value)
            }
          >
            {series.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />

      {series.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <Chart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
