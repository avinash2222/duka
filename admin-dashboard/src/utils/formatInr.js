/**
 * Indian Rupee formatting for admin lists, grids, and receipts.
 */
export function formatInr(value, { maximumFractionDigits = 0 } = {}) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits,
  }).format(Number(value));
}
