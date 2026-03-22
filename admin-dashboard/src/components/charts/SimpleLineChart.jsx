import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import ChartStateMessage from '@common/ChartStateMessage';

export default function SimpleLineChart({
  data = [],
  dataKey = 'value',
  xKey = 'name',
  height = 320,
  loading = false,
  error = null,
  emptyMessage,
}) {
  const theme = useTheme();

  if (loading) {
    return <ChartStateMessage type="loading" height={`${height}px`} />;
  }
  if (error) {
    return <ChartStateMessage type="error" message={String(error)} height={`${height}px`} />;
  }
  if (!data.length) {
    return (
      <ChartStateMessage type="empty" message={emptyMessage} height={`${height}px`} />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis dataKey={xKey} stroke={theme.palette.text.secondary} fontSize={12} />
        <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
        <Tooltip
          contentStyle={{
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 8,
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
