import { useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  MetricCard,
  SectionHeader,
  GradientHeaderBar,
  TabPanel,
  VerticalTabsPaper,
  TabPlaceholder,
} from '@common';
import { SimpleBarChart } from '@charts';
import { dashboardContent, dashboardOrderVerticalTabs } from '@/content/appContent';
import DashboardGroceryOrdersGrid from '@/components/dashboard/Grid';

const sampleBars = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 19 },
  { name: 'Wed', value: 8 },
  { name: 'Thu', value: 15 },
  { name: 'Fri', value: 22 },
];

export default function DashboardPage() {
  const [verticalTab, setVerticalTab] = useState(0);

  return (
    <Box>
      <GradientHeaderBar
        title="Overview"
        subtitle="Catalog, orders, and roles will connect to DUKA Backend here."
        gradient="primary"
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <MetricCard value="—" label="Orders today" size="medium" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard value="—" label="Active SKUs" color="secondary.main" borderColor="secondary.main" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricCard value="—" label="Delivery agents" color="success.main" borderColor="success.main" />
        </Grid>
      </Grid>

      <SectionHeader
        title={dashboardContent.activeOrdersTitle}
        subtitle={dashboardContent.activeOrdersSubtitle}
      />
      <VerticalTabsPaper
        tabs={dashboardOrderVerticalTabs}
        value={verticalTab}
        onChange={(_, v) => setVerticalTab(v)}
        idPrefix="dashboard-order"
        paperSx={{ mb: 3 }}
      >
        <TabPanel idPrefix="dashboard-order" value={verticalTab} index={0}>
          <DashboardGroceryOrdersGrid />
        </TabPanel>
        {dashboardOrderVerticalTabs.slice(1).map((_, i) => (
          <TabPanel
            key={dashboardOrderVerticalTabs[i + 1].id}
            idPrefix="dashboard-order"
            value={verticalTab}
            index={i + 1}
          >
            <TabPlaceholder message={dashboardContent.verticalComingSoon} />
          </TabPanel>
        ))}
      </VerticalTabsPaper>

      <SectionHeader title="Sample chart (Recharts)" subtitle="Replace with real metrics from your API" />
      <Paper sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          AG Charts were not copied; this uses the free Recharts stack.
        </Typography>
        <SimpleBarChart data={sampleBars} />
      </Paper>
    </Box>
  );
}
