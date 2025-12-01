export const formatPrice = (price) => {
  if (!price && price !== 0) return '';
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
  }).format(price);
};
