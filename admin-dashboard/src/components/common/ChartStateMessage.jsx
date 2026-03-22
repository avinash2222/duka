/**
 * Chart State Message Component
 * Reusable component for displaying loading, error, and empty states in charts
 */

import { Box, Typography, useTheme } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';

/**
 * Chart State Message Component
 * @param {Object} props - Component props
 * @param {string} props.type - State type: 'loading', 'error', 'empty', 'invalid', 'noSelection'
 * @param {string} props.message - Custom message to display
 * @param {string} props.height - Container height
 * @param {string} props.width - Container width
 * @param {boolean} props.showIcon - Whether to show loading spinner
 * @param {Object} props.sx - MUI sx prop
 */
const ChartStateMessage = ({
  type = 'empty',
  message,
  height = '400px',
  width = '100%',
  showIcon = true,
  sx = {}
}) => {
  const theme = useTheme();

  const getDefaultMessage = () => {
    switch (type) {
      case 'loading':
        return 'Loading chart data...';
      case 'error':
        return 'Error loading chart data';
      case 'invalid':
        return 'Please select valid options to view the chart';
      case 'noSelection':
        return 'Please make a selection to view the chart';
      case 'empty':
      default:
        return 'No data available for the selected criteria';
    }
  };

  const getMessageColor = () => {
    switch (type) {
      case 'error':
        return 'error';
      case 'invalid':
      case 'noSelection':
      case 'empty':
        return 'text.secondary';
      default:
        return 'text.primary';
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'error':
        return 'body1';
      case 'invalid':
      case 'noSelection':
      case 'empty':
        return 'body2';
      default:
        return 'body1';
    }
  };

  const displayMessage = message || getDefaultMessage();
  const shouldShowIcon = showIcon && type === 'loading';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: width,
        fontFamily: theme.typography.fontFamily,
        p: 2,
        ...sx
      }}
    >
      {shouldShowIcon ? (
        <LoadingSpinner />
      ) : (
        <Typography
          variant={getVariant()}
          color={getMessageColor()}
          sx={{
            fontFamily: theme.typography.fontFamily,
            textAlign: 'center',
            maxWidth: '80%'
          }}
        >
          {displayMessage}
        </Typography>
      )}
    </Box>
  );
};

export default ChartStateMessage;
