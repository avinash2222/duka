import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({
  message = 'Loading...',
  size = 40,
  fullHeight = false,
  sx = {}
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      minHeight={fullHeight ? '100vh' : '400px'}
      sx={sx}
    >
      <CircularProgress size={size} />
      <Typography variant="body1" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
