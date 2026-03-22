import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MetricCard = ({
  value,
  label,
  color = 'primary.main',
  borderColor = 'primary.main',
  size = 'medium', // 'small', 'medium', 'large'
  variant = 'default' // 'default', 'elevated', 'outlined'
}) => {
  const theme = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '12px 16px',
          valueFontSize: '18px',
          labelFontSize: '11px',
          minHeight: '60px',
          borderRadius: '8px'
        };
      case 'large':
        return {
          padding: '20px 24px',
          valueFontSize: '28px',
          labelFontSize: '14px',
          minHeight: '100px',
          borderRadius: '12px'
        };
      default: // medium
        return {
          padding: '16px 20px',
          valueFontSize: '22px',
          labelFontSize: '12px',
          minHeight: '80px',
          borderRadius: '10px'
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: 'none',
          backgroundColor: theme.palette.background.paper
        };
      case 'outlined': {
        const borderKey = borderColor.split('.');
        return {
          boxShadow: 'none',
          border: `2px solid ${theme.palette[borderKey[0]]?.[borderKey[1]] || borderColor}`,
          backgroundColor: 'transparent',
        };
      }
      default: // default
        return {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          border: 'none',
          backgroundColor: theme.palette.background.paper
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  return (
    <Paper
      sx={{
        ...variantStyles,
        padding: sizeStyles.padding,
        minHeight: sizeStyles.minHeight,
        borderRadius: sizeStyles.borderRadius,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        cursor: 'default',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: variant === 'elevated'
            ? '0 8px 24px rgba(0, 0, 0, 0.15)'
            : '0 4px 16px rgba(0, 0, 0, 0.12)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${color}, ${theme.palette[color.split('.')[0]]?.[color.split('.')[1]] || color}80)`,
        }
      }}
    >
      <Typography
        sx={{
          fontSize: sizeStyles.valueFontSize,
          fontWeight: 700,
          color: color,
          lineHeight: 1.2,
          mb: 0.5,
          fontFamily: theme.typography.fontFamily,
          letterSpacing: '-0.02em'
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: sizeStyles.labelFontSize,
          fontWeight: 500,
          color: theme.palette.text.secondary,
          lineHeight: 1.3,
          fontFamily: theme.typography.fontFamily,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          opacity: 0.8
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
};

export default MetricCard;
