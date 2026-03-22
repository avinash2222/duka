import { Paper, Typography, Box } from '@mui/material';
import { SectionHeader } from '@common';

export default function VendorsPage() {
  return (
    <Box>
      <SectionHeader
        title="Vendors"
        subtitle="Marketplace partners and catalog ownership — wire to Backend when ready."
      />
      <Paper sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Placeholder — vendor onboarding, contracts, and performance will live here.
        </Typography>
      </Paper>
    </Box>
  );
}
