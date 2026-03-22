import { formatInr } from '@/utils/formatInr';
import {
  CatalogItemCell,
  CatalogCategoryCell,
  CatalogStockCell,
  CatalogListingStatusCell,
  CatalogActionsCell,
} from './CatalogGridCells';

/** Grocery catalog tab — AG Grid column definitions. */
export function getCatalogGroceryColumnDefs() {
  return [
    {
      colId: 'item',
      field: 'name',
      headerName: 'Item',
      flex: 2,
      minWidth: 280,
      cellRenderer: CatalogItemCell,
      filterValueGetter: (p) => `${p.data.name} ${p.data.sku}`,
    },
    {
      field: 'categoryLabel',
      headerName: 'Category',
      flex: 1,
      minWidth: 130,
      cellRenderer: CatalogCategoryCell,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0,
      minWidth: 110,
      valueFormatter: (p) => formatInr(p.value),
    },
    {
      colId: 'stock',
      field: 'stockQty',
      headerName: 'Stock',
      flex: 1,
      minWidth: 140,
      cellRenderer: CatalogStockCell,
    },
    {
      field: 'listingStatus',
      headerName: 'Status',
      flex: 0,
      minWidth: 130,
      cellRenderer: CatalogListingStatusCell,
    },
    {
      colId: 'actions',
      headerName: 'Actions',
      width: 108,
      minWidth: 108,
      maxWidth: 108,
      sortable: false,
      filter: false,
      pinned: 'right',
      cellRenderer: CatalogActionsCell,
    },
  ];
}
