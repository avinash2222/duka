import { useMemo, useRef, useImperativeHandle, forwardRef } from 'react';
import { DataGrid } from '@datagrid';
import { getCatalogGroceryColumnDefs } from './columnConfig';

const defaultSizing = { height: 520, rowHeight: 72, headerHeight: 44 };

/**
 * Catalog grocery vertical — AG Grid surface. Parent can call `ref.current.scrollToTop()`.
 */
const CatalogGroceryGrid = forwardRef(function CatalogGroceryGrid(
  { rows, height = defaultSizing.height, rowHeight = defaultSizing.rowHeight, headerHeight = defaultSizing.headerHeight },
  ref
) {
  const apiRef = useRef(null);
  const columnDefs = useMemo(() => getCatalogGroceryColumnDefs(), []);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => apiRef.current?.ensureIndexVisible(0, 'top'),
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columnDefs}
      height={height}
      rowHeight={rowHeight}
      headerHeight={headerHeight}
      onGridReady={(e) => {
        apiRef.current = e.api;
      }}
    />
  );
});

export default CatalogGroceryGrid;
