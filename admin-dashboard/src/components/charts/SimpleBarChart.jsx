import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import ChartStateMessage from '@common/ChartStateMessage';

/**
 * Free alternative to AG Charts bar visuals — uses Recharts (MIT).
 */
export default function SimpleBarChart({
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
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
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
        <Bar dataKey={dataKey} fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
