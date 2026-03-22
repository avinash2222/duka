import { useMemo, useState } from 'react';
import { Grid, Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import { MetricCard, SectionHeader, GradientHeaderBar } from '@common';
import { SimpleBarChart } from '@charts';
import { DataGrid } from '@datagrid';
import { dashboardContent, dashboardOrderVerticalTabs } from '@/content/appContent';

const sampleBars = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 19 },
  { name: 'Wed', value: 8 },
  { name: 'Thu', value: 15 },
  { name: 'Fri', value: 22 },
];

/** Demo grocery orders until Backend order APIs exist */
const groceryActiveOrderRows = [
  {
    id: 'G-10421',
    customer: 'Priya Sharma',
    status: 'Out for delivery',
    placedAt: 'Today, 09:14',
    total: '₹1,240',
    items: 12,
  },
  {
    id: 'G-10420',
    customer: 'Rahul Mehta',
    status: 'Packing',
    placedAt: 'Today, 09:02',
    total: '₹486',
    items: 5,
  },
  {
    id: 'G-10419',
    customer: 'Ananya Iyer',
    status: 'Ready for pickup',
    placedAt: 'Today, 08:51',
    total: '₹2,890',
    items: 18,
  },
  {
    id: 'G-10418',
    customer: 'Vikram Singh',
    status: 'Payment confirmed',
    placedAt: 'Today, 08:40',
    total: '₹320',
    items: 3,
  },
];

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-order-tabpanel-${index}`}
      aria-labelledby={`dashboard-order-tab-${index}`}
    >
      {value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null}
    </div>
  );
}

export default function DashboardPage() {
  const [verticalTab, setVerticalTab] = useState(0);

  const groceryColumns = useMemo(
    () => [
      { field: 'id', headerName: 'Order', flex: 0, minWidth: 110 },
      { field: 'customer', headerName: 'Customer', flex: 1, minWidth: 140 },
      { field: 'status', headerName: 'Status', flex: 1, minWidth: 150 },
      { field: 'placedAt', headerName: 'Placed', flex: 1, minWidth: 130 },
      { field: 'items', headerName: 'Items', flex: 0, minWidth: 80 },
      { field: 'total', headerName: 'Total', flex: 0, minWidth: 100 },
    ],
    []
  );

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
      <Paper
        elevation={1}
        sx={{
          p: 0,
          mb: 3,
          overflow: 'hidden',
          border: (t) => `1px solid ${t.palette.custom?.commonBorderColor ?? t.palette.divider}`,
        }}
      >
        <Tabs
          value={verticalTab}
          onChange={(_, v) => setVerticalTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 1,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: (t) => t.palette.custom?.sectionControlsBackground ?? t.palette.action.hover,
          }}
        >
          {dashboardOrderVerticalTabs.map((tab, i) => (
            <Tab
              key={tab.id}
              label={tab.label}
              id={`dashboard-order-tab-${i}`}
              aria-controls={`dashboard-order-tabpanel-${i}`}
            />
          ))}
        </Tabs>

        <Box sx={{ px: 2, pb: 2 }}>
          <TabPanel value={verticalTab} index={0}>
            <DataGrid rows={groceryActiveOrderRows} columns={groceryColumns} height={320} />
          </TabPanel>
          {dashboardOrderVerticalTabs.slice(1).map((_, i) => (
            <TabPanel key={dashboardOrderVerticalTabs[i + 1].id} value={verticalTab} index={i + 1}>
              <Box
                sx={{
                  minHeight: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 2,
                }}
              >
                <Typography color="text.secondary" textAlign="center">
                  {dashboardContent.verticalComingSoon}
                </Typography>
              </Box>
            </TabPanel>
          ))}
        </Box>
      </Paper>

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
