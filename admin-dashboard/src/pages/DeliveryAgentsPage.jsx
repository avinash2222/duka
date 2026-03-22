import { Paper, Typography, Box } from '@mui/material';
import { SectionHeader } from '@common';

export default function DeliveryAgentsPage() {
  return (
    <Box>
      <SectionHeader
        title="Delivery Agents"
        subtitle="Assign and monitor field agents when logistics APIs are available."
      />
      <Paper sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Placeholder — delivery agents primarily use the DUKA mobile app; this view will support
          operations oversight.
        </Typography>
      </Paper>
    </Box>
  );
}
