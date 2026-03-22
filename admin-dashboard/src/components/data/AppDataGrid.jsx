import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';

/**
 * Thin wrapper around MUI X Data Grid (MIT) — use instead of ag-grid for admin tables.
 */
export default function AppDataGrid({
  rows,
  columns,
  loading = false,
  height = 480,
  pageSizeOptions = [10, 25, 50],
  initialState,
  sx,
  ...rest
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height,
        '& .MuiDataGrid-columnHeaders': {
          fontWeight: 600,
          backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
        },
        ...sx,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={pageSizeOptions}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          ...initialState,
        }}
        disableRowSelectionOnClick
        {...rest}
      />
    </Box>
  );
}
