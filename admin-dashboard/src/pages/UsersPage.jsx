import { useMemo, useState, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { DashboardSection, SectionControls, useColumnVisibility } from '@common';
import { DataGrid } from '@datagrid';

const demoRows = [
  { id: 1, name: 'Sample user', phone: '+91 00000 00000', roles: 'customer' },
  { id: 2, name: 'Agent (example)', phone: '+91 00000 00001', roles: 'customer, agent' },
];

function matchesSearch(row, term) {
  if (!term.trim()) return true;
  const q = term.trim().toLowerCase();
  return [row.name, row.phone, row.roles].some((v) => String(v).toLowerCase().includes(q));
}

export default function UsersPage({ title = 'Users', exportFileName = 'users' } = {}) {
  const gridApiRef = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [gridSearchResetKey, setGridSearchResetKey] = useState(0);

  const baseColumns = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
      { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 140 },
      { field: 'roles', headerName: 'Roles', flex: 1, minWidth: 180 },
    ],
    []
  );

  const { columnDefs, hiddenColumns, handleHiddenColumnsChange, setHiddenColumns } =
    useColumnVisibility(baseColumns);

  const filteredRows = useMemo(
    () => demoRows.filter((row) => matchesSearch(row, searchTerm)),
    [searchTerm]
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
  }, []);

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
