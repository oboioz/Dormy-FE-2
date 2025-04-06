export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('de-DE').format(value); // de-DE uses dots as thousand separators
  };