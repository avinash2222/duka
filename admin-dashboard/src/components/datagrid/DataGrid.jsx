import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz } from 'ag-grid-community';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Shared AG Grid Community table. Add shared cellRenderers, cellEditors, and filters alongside this file.
 *
 * Pass `columns` as AG Grid `columnDefs` (`field`, `headerName`, `flex`, `minWidth`, etc.).
 * Rows scroll inside the fixed `height` viewport (no pagination).
 */
export default function DataGrid({
  rows,
  columns,
  loading = false,
  height = 480,
  sx,
  ...rest
}) {
  const muiTheme = useTheme();

  const gridTheme = useMemo(() => {
    const p = muiTheme.palette;
    const isDark = p.mode === 'dark';
    const sectionBg = p.custom?.sectionControlsBackground;
    const border = p.custom?.commonBorderColor ?? p.divider;

    return themeQuartz.withParams({
      accentColor: p.primary.main,
      backgroundColor: p.background.paper,
      browserColorScheme: isDark ? 'dark' : 'light',
      foregroundColor: p.text.primary,
      cellTextColor: p.text.primary,
      borderColor: border,
      oddRowBackgroundColor: isDark ? p.background.default : p.grey[50],
      headerBackgroundColor: isDark ? (sectionBg ?? '#1a2438') : p.grey[100],
      headerTextColor: isDark ? p.text.secondary : p.grey[800],
      rowHoverBackgroundColor: alpha(p.primary.main, isDark ? 0.14 : 0.08),
      selectedRowBackgroundColor: alpha(p.primary.main, isDark ? 0.22 : 0.12),
    });
  }, [muiTheme]);

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
      return (p) => String(p.data.id);
    }
    return undefined;
  }, [rows]);

  return (
    <Box sx={{ width: '100%', height, ...sx }}>
      <AgGridReact
        key={muiTheme.palette.mode}
        theme={gridTheme}
        rowData={rows}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        loading={loading}
        suppressCellFocus
        getRowId={getRowId}
        containerStyle={{ width: '100%', height: '100%' }}
        {...rest}
      />
    </Box>
  );
}
