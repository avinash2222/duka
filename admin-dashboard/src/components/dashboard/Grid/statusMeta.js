export const GROCERY_OPS_STATUS = {
  pending: 'pending',
  confirmed: 'confirmed',
  packed: 'packed',
  out_for_delivery: 'out_for_delivery',
  delivered: 'delivered',
};

export const statusChipMeta = {
  [GROCERY_OPS_STATUS.pending]: { label: 'Pending', color: 'warning' },
  [GROCERY_OPS_STATUS.confirmed]: { label: 'Confirmed', color: 'info' },
  [GROCERY_OPS_STATUS.packed]: { label: 'Packed', color: 'primary' },
  [GROCERY_OPS_STATUS.out_for_delivery]: { label: 'Out for delivery', color: 'success' },
  [GROCERY_OPS_STATUS.delivered]: { label: 'Delivered', color: 'success' },
};
