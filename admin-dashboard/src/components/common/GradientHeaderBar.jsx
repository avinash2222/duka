import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ROLE_PRIMARY_COLORS } from '@/theme/palette';

const GradientHeaderBar = ({
  title,
  subtitle,
  rightContent,
  icon: Icon,
  gradient = 'primary', // 'primary', 'blue', 'purple', 'green', 'orange', 'red', 'teal'
  sx = {},
  children,
  ...props
}) => {
  const theme = useTheme();

  const getGradientColors = () => {
    switch (gradient) {
      case 'blue':
        return {
          start: '#667eea',
          end: '#764ba2'
        };
      case 'purple':
        return {
          start: '#f093fb',
          end: '#f5576c'
        };
      case 'green':
        return {
          start: '#4facfe',
          end: '#00f2fe'
        };
      case 'orange':
        return {
          start: '#fa709a',
          end: '#fee140'
        };
      case 'red':
        return {
          start: '#ff9a9e',
          end: '#fecfef'
        };
      case 'teal':
        return {
          start: '#a8edea',
          end: '#fed6e3'
        };
      case 'sunset':
        return {
          start: '#ffecd2',
          end: '#fcb69f'
        };
      case 'ocean':
        return {
          start: '#667eea',
          end: '#764ba2'
        };
      case 'forest':
        return {
          start: '#89f7fe',
          end: '#66a6ff'
        };
      case 'lavender':
        return {
          start: '#a8edea',
          end: '#fed6e3'
        };
      default: // primary
        // Use theme's primary color (role-based: teal for vendor, blue for sponsor/admin)
        const primaryMain = theme.palette.primary.main;
        const vendorPrimaryColor = ROLE_PRIMARY_COLORS.vendor.main;
        
        // Check if this is vendor teal theme
        if (primaryMain === vendorPrimaryColor) {
          // Vendor teal gradient: from main teal to dark teal for better contrast with white text
          return {
            start: primaryMain, // Main teal from ROLE_PRIMARY_COLORS
            end: theme.palette.primary.dark // Dark teal from ROLE_PRIMARY_COLORS
          };
        }
        
        // Sponsor/Admin: use existing custom gradient colors (unchanged behavior)
        // This ensures sponsor/admin keep their original blue gradient
        return {
          start: theme.palette.custom?.dashboardGradientStart || primaryMain,
          end: theme.palette.custom?.dashboardGradientEnd || theme.palette.primary.dark
        };
    }
  };

  const gradientColors = getGradientColors();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${gradientColors.start} 0%, ${gradientColors.end} 100%)`,
        color: theme.palette.primary.contrastText,
        p: theme.spacing(2),
        borderRadius: '12px',
        mb: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          transform: 'translate(30px, -30px)',
        },
        ...sx
      }}
      {...props}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {Icon && (
          <Box sx={{
            mr: theme.spacing(1.5),
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            position: 'relative',
            zIndex: 1
          }}>
            <Icon sx={{
              fontSize: 28,
              color: theme.palette.primary.contrastText,
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
            }} />
          </Box>
        )}
        <Box>
          {title && (
            <Typography
              variant="h4"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontWeight: 700,
                mb: subtitle ? theme.spacing(0.5) : 0,
                fontSize: '24px',
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                fontFamily: theme.typography.fontFamily,
                opacity: 0.9,
                fontSize: '14px',
                fontWeight: 400,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </Box>
      </Box>
      {rightContent && (
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {rightContent}
        </Box>
      )}
    </Box>
  );
};

export default GradientHeaderBar;


