import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz } from 'ag-grid-community';
import { Box, useTheme } from '@mui/material';

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

  const gridTheme = useMemo(
    () =>
      themeQuartz.withParams({
        accentColor: muiTheme.palette.primary.main,
        backgroundColor: muiTheme.palette.background.paper,
        browserColorScheme: muiTheme.palette.mode === 'dark' ? 'dark' : 'light',
      }),
    [muiTheme]
  );

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
