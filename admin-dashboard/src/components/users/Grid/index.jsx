import { useMemo, useState, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { DashboardSection, SectionControls, useColumnVisibility } from '@common';
import { DataGrid } from '@datagrid';
import { getUserGridBaseColumns } from './columnConfig';
import { userGridDemoRows } from './demoRows';

function matchesSearch(row, term) {
  if (!term.trim()) return true;
  const q = term.trim().toLowerCase();
  return [row.name, row.phone, row.roles].some((v) => String(v).toLowerCase().includes(q));
}

/**
 * Users / customers grid with toolbar, column visibility, CSV export (demo data until API).
 */
export default function UsersGrid({ title = 'Users', exportFileName = 'users', rows: rowsProp } = {}) {
  const rows = rowsProp ?? userGridDemoRows;
  const gridApiRef = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [gridSearchResetKey, setGridSearchResetKey] = useState(0);

  const baseColumns = useMemo(() => getUserGridBaseColumns(), []);

  const { columnDefs, hiddenColumns, handleHiddenColumnsChange, setHiddenColumns } =
    useColumnVisibility(baseColumns);

  const filteredRows = useMemo(
    () => rows.filter((row) => matchesSearch(row, searchTerm)),
    [rows, searchTerm]
  );

  const onSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleRefresh = useCallback(() => {
    setSearchTerm('');
    setHiddenColumns(new Set());
    setGridSearchResetKey((k) => k + 1);
  }, [setHiddenColumns]);

  const handleDownload = useCallback(() => {
    gridApiRef.current?.exportDataAsCsv({ fileName: `${exportFileName}.csv` });
  }, [exportFileName]);

  return (
    <Box>
      <DashboardSection
        title={title}
        icon={GroupIcon}
        minimized={minimized}
        onToggleMinimize={() => setMinimized((m) => !m)}
        gridSearchResetKey={gridSearchResetKey}
        onSearch={onSearch}
        controls={
          <SectionControls
            variant="full"
            columns={baseColumns}
            hiddenColumns={hiddenColumns}
            onHiddenColumnsChange={handleHiddenColumnsChange}
            onRefresh={handleRefresh}
            onDownload={handleDownload}
            minimized={minimized}
            onMinimize={() => setMinimized((m) => !m)}
            disabled={false}
          />
        }
      >
        <DataGrid
          rows={filteredRows}
          columns={columnDefs}
          height={380}
          onGridReady={(e) => {
            gridApiRef.current = e.api;
          }}
        />
      </DashboardSection>
    </Box>
  );
}
