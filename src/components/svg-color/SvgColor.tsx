import { forwardRef } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface SvgColorProps extends BoxProps {
  src: string; // Expected to be an Iconify icon name
}

const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(({ src, sx, ...other }, ref) => {
  // Convert Iconify icon name to an SVG URL
  const iconUrl = `https://api.iconify.design/${src}.svg`;

  return (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${iconUrl}) no-repeat center / contain`,
        WebkitMask: `url(${iconUrl}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  );
});

export default SvgColor;
