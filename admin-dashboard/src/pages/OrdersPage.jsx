import { Paper, Typography, Box } from '@mui/material';
import { SectionHeader } from '@common';

export default function OrdersPage() {
  return (
    <Box>
      <SectionHeader
        title="Orders"
        subtitle="Assigned runs, status updates, and operations — connect to DUKA Backend order APIs."
      />
      <Paper sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Placeholder. Wire to order APIs; staff roles (store operator, support admin, super admin, vendor) use this screen—delivery agents use the mobile app.
        </Typography>
      </Paper>
    </Box>
  );
}
