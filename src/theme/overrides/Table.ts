import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Table(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
          borderRadius: theme.shape.borderRadius, // Add rounded corners
          boxShadow: theme.shadows[1], // Subtle shadow for better elevation
          border: `1px solid ${theme.palette.divider}`, // Light border
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default, // Alternating row colors
          },
          '&:hover': {
            backgroundColor: theme.palette.action.hover, // Light hover effect
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.divider}`, // Add borders for separation
          padding: theme.spacing(1.5), // More spacing for readability
        },
        head: {
          color: theme.palette.primary.contrastText, // White text
          backgroundColor: theme.palette.primary.main, // Primary color header
          fontWeight: 'bold',
          textTransform: 'uppercase', // Make headers uppercase
        },
        stickyHeader: {
          backgroundColor: theme.palette.primary.main, // Sticky header in primary color
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      defaultProps: {
        backIconButtonProps: {
          size: 'small',
        },
        nextIconButtonProps: {
          size: 'small',
        },
        SelectProps: {
          MenuProps: {
            MenuListProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  ...theme.typography.body2,
                },
              },
            },
          },
        },
      },

      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default, // Match table background
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: theme.spacing(1),
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}
