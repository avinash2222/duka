import { useMemo } from 'react';
import { DataGrid } from '@datagrid';
import { getDashboardGroceryOrderColumnDefs } from './columnConfig';
import { groceryActiveOrderDemoRows } from './groceryOrderDemoRows';

/**
 * Dashboard overview — grocery active orders table (demo rows until APIs exist).
 */
export default function DashboardGroceryOrdersGrid({ rows = groceryActiveOrderDemoRows, height = 320 }) {
  const columnDefs = useMemo(() => getDashboardGroceryOrderColumnDefs(), []);

  return <DataGrid rows={rows} columns={columnDefs} height={height} />;
}
