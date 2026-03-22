import { Paper, Typography, Box } from '@mui/material';
import { SectionHeader } from '@common';

export default function CatalogPage() {
  return (
    <Box>
      <SectionHeader title="Catalog" subtitle="Products, categories, and pricing — to be implemented against DUKA Backend." />
      <Paper sx={{ p: 3 }}>
        <Typography color="text.secondary">Placeholder page. Add grids with the shared DataGrid (`@datagrid`) and shared dialogs (`@common`).</Typography>
      </Paper>
    </Box>
  );
}
