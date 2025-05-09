import numeral from 'numeral';

// ----------------------------------------------------------------------

type InputValue = string | number | null | undefined;

export function fNumber(number: InputValue) {
  return numeral(number).format();
}

export function fCurrency(number: InputValue, haveCurrency = false): string {
  const validNumber = Number(number);
  if (isNaN(validNumber)) return '';

  const format = haveCurrency
    ? numeral(validNumber).format('$0,0')
    : numeral(validNumber).format('0,0');

  return format;
}

export function fPercent(number: InputValue) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number: InputValue) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format: string, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
