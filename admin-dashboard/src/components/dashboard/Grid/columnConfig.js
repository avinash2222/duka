import {
  GroceryPhoneCell,
  GroceryItemsCell,
  GroceryStatusCell,
  GroceryAgentCell,
  GroceryOpsActionsCell,
} from './GroceryOpsGridCells';

/** Grocery ops dashboard — one row per order, all ops fields as columns. */
export function getGroceryOpsColumnDefs() {
  return [
    {
      field: 'id',
      headerName: 'Order',
      flex: 0,
      minWidth: 110,
      valueFormatter: (p) => (p.value != null ? `#${p.value}` : ''),
      filterValueGetter: (p) => p.data?.id ?? '',
    },
    {
      colId: 'placedTime',
      field: 'placedAtLabel',
      headerName: 'Time',
      flex: 0,
      minWidth: 130,
      comparator: (_a, _b, nodeA, nodeB, _isDesc) =>
        (nodeA.data?.placedAtSort ?? 0) - (nodeB.data?.placedAtSort ?? 0),
      sort: 'desc',
    },
    {
      field: 'customerName',
      headerName: 'Customer',
      flex: 1,
      minWidth: 130,
    },
    {
      colId: 'phone',
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      minWidth: 200,
      cellRenderer: GroceryPhoneCell,
      sortable: false,
    },
    {
      colId: 'items',
      field: 'itemCount',
      headerName: 'Items',
      flex: 1.2,
      minWidth: 200,
      cellRenderer: GroceryItemsCell,
      filterValueGetter: (p) =>
        `${p.data?.itemCount ?? ''} ${p.data?.itemSummary ?? ''}`.toLowerCase(),
    },
    {
      field: 'area',
      headerName: 'Area',
      flex: 0,
      minWidth: 110,
    },
    {
      field: 'addressShort',
      headerName: 'Address',
      flex: 1,
      minWidth: 160,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0,
      minWidth: 150,
      cellRenderer: GroceryStatusCell,
      filterValueGetter: (p) => p.data?.status ?? '',
    },
    {
      colId: 'agent',
      field: 'agentName',
      headerName: 'Agent',
      flex: 0,
      minWidth: 120,
      cellRenderer: GroceryAgentCell,
      filterValueGetter: (p) => (p.data?.agentName ? p.data.agentName : 'unassigned'),
    },
    {
      colId: 'opsActions',
      headerName: 'Actions',
      width: 200,
      minWidth: 200,
      maxWidth: 220,
      pinned: 'right',
      sortable: false,
      filter: false,
      cellRenderer: GroceryOpsActionsCell,
    },
  ];
}
