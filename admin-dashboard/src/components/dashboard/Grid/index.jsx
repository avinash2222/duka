import { useMemo } from 'react';
import { DataGrid } from '@datagrid';
import { getGroceryOpsColumnDefs } from './columnConfig';
import { groceryOpsDemoOrders } from './demoOrders';

/**
 * Dashboard grocery vertical — ops fields as AG Grid columns (phone, agent, status, actions).
 */
export default function DashboardGroceryOrdersGrid({
  rows = groceryOpsDemoOrders,
  height = 440,
  rowHeight = 44,
  headerHeight = 42,
}) {
  const columnDefs = useMemo(() => getGroceryOpsColumnDefs(), []);

  return (
    <DataGrid
      rows={rows}
      columns={columnDefs}
      height={height}
      rowHeight={rowHeight}
      headerHeight={headerHeight}
    />
  );
}
