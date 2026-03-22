import { Paper, Tabs, Tab, Box } from '@mui/material';

/**
 * Bordered `Paper` with scrollable `Tabs` and a padded content area below.
 * Pair tab `id`s / `aria-controls` with `TabPanel` using the same `idPrefix`.
 */
export default function VerticalTabsPaper({
  tabs,
  value,
  onChange,
  idPrefix,
  children,
  paperSx,
  tabsSx,
  contentSx,
}) {
  return (
    <Paper
      elevation={1}
      sx={{
        overflow: 'hidden',
        border: (t) => `1px solid ${t.palette.custom?.commonBorderColor ?? t.palette.divider}`,
        ...paperSx,
      }}
    >
      <Tabs
        value={value}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          px: 1,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: (t) => t.palette.custom?.sectionControlsBackground ?? t.palette.action.hover,
          ...tabsSx,
        }}
      >
        {tabs.map((tab, i) => (
          <Tab
            key={tab.id}
            label={tab.label}
            id={`${idPrefix}-tab-${i}`}
            aria-controls={`${idPrefix}-tabpanel-${i}`}
          />
        ))}
      </Tabs>
      <Box sx={{ px: 2, pb: 2, ...contentSx }}>{children}</Box>
    </Paper>
  );
}
