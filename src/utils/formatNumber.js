/**
 * Formating a number with the specified rounding, or by default - to an integer.
 * If necessary, you can add a symbol.
 * @param {*} number - number to formatting
 * @param {*} max - max numerical after decimal point (eaqual digit length minus five)
 * @param {*} symbol - additional symbol after number (if nessesary)
 * @return {*} formatted result in string
 */
export const formatNumber = (number, max, symbol) => {
  const beforeDecimalLength = 7 - String(number.toFixed(0)).length;
  const numberLength = beforeDecimalLength >= 0 ? beforeDecimalLength : 0;

  const formattedNumber = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: max === 0 ? 0 : max || numberLength,
  }).format(number);

  return `${formattedNumber}${symbol || ''}`;
};
