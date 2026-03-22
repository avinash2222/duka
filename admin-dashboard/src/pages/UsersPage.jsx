import { useMemo } from 'react';
import { Paper, Box } from '@mui/material';
import { SectionHeader } from '@common';
import { DataGrid } from '@datagrid';

const demoRows = [
  { id: 1, name: 'Sample user', phone: '+91 00000 00000', roles: 'customer' },
  { id: 2, name: 'Agent (example)', phone: '+91 00000 00001', roles: 'customer, agent' },
];

export default function UsersPage() {
  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
      { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 140 },
      { field: 'roles', headerName: 'Roles', flex: 1, minWidth: 180 },
    ],
    []
  );

  return (
    <Box>
      <SectionHeader
        title="Users"
        subtitle="AG Grid Community — wire to Backend user list and role assignment when APIs are ready."
      />
      <Paper sx={{ p: 2 }}>
        <DataGrid rows={demoRows} columns={columns} height={360} />
      </Paper>
    </Box>
  );
}
