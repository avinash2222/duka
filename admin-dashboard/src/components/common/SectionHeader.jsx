import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * SectionHeader Component
 * Common header component for sections with title and horizontal separator
 * Provides consistent styling across all sections
 */
const SectionHeader = ({
  title,
  subtitle,
  variant = 'h6',
  component = 'h2',
  align = 'left',
  sx = {},
  showDivider: _showDivider = true,
  dividerSx: _dividerSx = {},
  gridColumn,
  number,
  icon: IconComponent,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const baseStyles = {
    mb: theme.spacing(2),
    position: 'relative',
    padding: theme.spacing(1.5, 2),
    borderRadius: 2,
    backgroundColor: isDark 
      ? theme.palette.grey[700]
      : theme.palette.grey[100],
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[2],
    ...(gridColumn && { gridColumn }),
    ...sx,
  };

  const headerContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: align === 'center' ? 'center' : 'flex-start',
    gap: subtitle ? theme.spacing(0.25) : 0,
    mb: 0,
  };

  const headerBackgroundStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  };

  const numberBadgeStyles = {
    position: 'absolute',
    right: theme.spacing(1.5),
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 700,
    fontSize: '0.875rem',
    flexShrink: 0,
    zIndex: 1,
  };

  const typographyStyles = {
    fontWeight: 600,
    color: theme.palette.text.primary,
    textAlign: align,
    fontSize: '1rem',
    lineHeight: 1.5,
  };

  const subtitleStyles = {
    textAlign: align,
    fontWeight: 400,
    fontSize: '0.8125rem',
    color: theme.palette.text.secondary,
    lineHeight: 1.4,
    fontStyle: 'italic',
  };

  return (
    <Box sx={baseStyles}>
      {number && (
        <Box sx={numberBadgeStyles}>
          {number}
        </Box>
      )}
      <Box sx={headerContainerStyles}>
        <Box sx={headerBackgroundStyles}>
          {IconComponent && (
            <IconComponent 
              sx={{ 
                fontSize: '1.25rem',
                color: theme.palette.primary.main,
              }} 
            />
          )}
          <Typography
            variant={variant}
            component={component}
            sx={{
              ...typographyStyles,
              padding: 0,
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
            {title}
          </Typography>
        </Box>
        {subtitle && (
          <Typography
            variant="body2"
            component="span"
            sx={subtitleStyles}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SectionHeader;

