import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import { useUi } from '@/contexts/UiContext';

const GlobalLoading = () => {
  const { globalLoading } = useUi();
  if (!globalLoading) return null;

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
      open={globalLoading}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CircularProgress color="inherit" size={60} />
        <Typography variant="h6" color="inherit">
          Processing…
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default GlobalLoading;
