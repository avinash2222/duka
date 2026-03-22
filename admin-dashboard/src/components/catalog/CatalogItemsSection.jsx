import { Box, Typography, Paper } from '@mui/material';

/**
 * Outlined block with a title row (count) + optional header action, then main content (e.g. grid).
 * Reuse per catalog vertical tab with the same chrome.
 */
export default function CatalogItemsSection({ title, count, headerAction, children }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        mt: 2,
        borderColor: (t) => t.palette.custom?.commonBorderColor ?? t.palette.divider,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          {title} ({count})
        </Typography>
        {headerAction ?? null}
      </Box>
      <Box sx={{ px: 2, py: 2, bgcolor: 'background.paper' }}>{children}</Box>
    </Paper>
  );
}
