/**
 * Formating a number with the specified rounding, or by default - to an integer.
 * If necessary, you can add a symbol.
 */

const formatNumber = (number, max, symbol) => {
  const formattedNumber = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: max || 0,
  }).format(number);

  return `${formattedNumber}${symbol || ''}`;
};

module.exports = formatNumber;
