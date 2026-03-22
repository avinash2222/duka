/** Dashboard “active orders” grocery tab — column definitions. */
export function getDashboardGroceryOrderColumnDefs() {
  return [
    { field: 'id', headerName: 'Order', flex: 0, minWidth: 110 },
    { field: 'customer', headerName: 'Customer', flex: 1, minWidth: 140 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 150 },
    { field: 'placedAt', headerName: 'Placed', flex: 1, minWidth: 130 },
    { field: 'items', headerName: 'Items', flex: 0, minWidth: 80 },
    { field: 'total', headerName: 'Total', flex: 0, minWidth: 100 },
  ];
}
