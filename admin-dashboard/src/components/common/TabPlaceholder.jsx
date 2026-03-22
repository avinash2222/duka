import { Box, Typography } from '@mui/material';

/** Centered message for inactive or “coming soon” tab bodies. */
export default function TabPlaceholder({ message, minHeight = 200, sx }) {
  return (
    <Box
      sx={{
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        ...sx,
      }}
    >
      <Typography color="text.secondary" textAlign="center">
        {message}
      </Typography>
    </Box>
  );
}
