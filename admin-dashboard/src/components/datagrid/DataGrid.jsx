import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz } from 'ag-grid-community';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Shared AG Grid Community table. Add shared cellRenderers, cellEditors, and filters alongside this file.
 *
 * Quartz colours are derived from the active MUI theme (`palette`) so the grid matches the admin shell
 * in light and dark mode (not AG Grid’s generic dark palette alone).
 *
 * Pass `columns` as AG Grid `columnDefs` (`field`, `headerName`, `flex`, `minWidth`, etc.).
 * Rows scroll inside the fixed `height` viewport (no pagination by default). Pass `pagination` via `rest` if needed.
 *
 * @param {number} [rowHeight] — fixed row height in px (e.g. 72 for image / multi-line cells).
 * @param {(params: object) => number | undefined | null} [getRowHeight] — AG Grid per-row height; overrides `rowHeight` when set.
 * @param {number} [headerHeight] — column header height in px.
 */
export default function DataGrid({
  rows,
  columns,
  loading = false,
  height = 480,
  rowHeight,
  getRowHeight,
  headerHeight,
  sx,
  ...rest
}) {
  const theme = useTheme();
  const p = theme.palette;

  const gridTheme = useMemo(() => {
    const isDark = p.mode === 'dark';
    const border = p.custom?.commonBorderColor ?? p.divider;
    const headerBg = isDark
      ? (p.custom?.sectionControlsBackground ?? '#1a2438')
      : (p.grey?.[100] ?? '#f1f5f9');

    return themeQuartz.withParams({
      browserColorScheme: isDark ? 'dark' : 'light',
      accentColor: p.primary.main,
      backgroundColor: p.background.paper,
      foregroundColor: p.text.primary,
      borderColor: border,
      dataBackgroundColor: p.background.paper,
      headerBackgroundColor: headerBg,
      headerTextColor: isDark ? p.text.secondary : (p.grey?.[800] ?? '#1e293b'),
      cellTextColor: p.text.primary,
      oddRowBackgroundColor: isDark ? p.background.default : (p.grey?.[50] ?? '#f8fafc'),
      rowHoverBackgroundColor: alpha(p.primary.main, isDark ? 0.14 : 0.08),
      selectedRowBackgroundColor: alpha(p.primary.main, isDark ? 0.22 : 0.12),
    });
  }, [p]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 120,
    }),
    []
  );

  const getRowId = useMemo(() => {
    const first = rows?.[0];
    if (first && Object.prototype.hasOwnProperty.call(first, 'id')) {
      return (q) => String(q.data.id);
    }
    return undefined;
  }, [rows]);

  return (
    <Box sx={{ width: '100%', height, ...sx }}>
      <AgGridReact
        key={p.mode}
        theme={gridTheme}
        rowData={rows}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        loading={loading}
        suppressCellFocus
        getRowId={getRowId}
        containerStyle={{ width: '100%', height: '100%' }}
        {...rest}
        rowHeight={rowHeight}
        getRowHeight={getRowHeight}
        headerHeight={headerHeight}
      />
    </Box>
  );
}
