import { Paper, Typography, Box } from '@mui/material';
import { SectionHeader } from '@common';

export default function SettingsPage() {
  return (
    <Box>
      <SectionHeader title="Settings" subtitle="Org preferences, integrations, and admin configuration." />
      <Paper sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Placeholder — connect to Backend settings and feature flags when APIs exist.
        </Typography>
      </Paper>
    </Box>
  );
}
