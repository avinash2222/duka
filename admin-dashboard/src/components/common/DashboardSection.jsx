import { Box, Typography, Paper, Collapse, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ExpandMore as ExpandSectionIcon } from '@mui/icons-material';
import GridSearch from './GridSearch';

/**
 * Grid dashboard header shell — title row, optional search, toolbar controls, collapsible body.
 * Ported from ClinAi vendorselection-frontend `DashboardSection`.
 */
export default function DashboardSection({
  title,
  subtitle,
  icon: Icon,
  children,
  controls,
  headerButton,
  onSearch,
  searchPlaceholder,
  sx = {},
  minimized = false,
  visible = true,
  onToggleMinimize,
  headerStyle = {},
  /** Increment to remount the toolbar search field (e.g. after refresh). */
  gridSearchResetKey = 0,
}) {
  const theme = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 1,
        backgroundColor: minimized ? 'background.default' : 'background.paper',
        border: minimized ? `1px solid ${theme.palette.custom?.commonBorderColor ?? theme.palette.divider}` : 'none',
        transition: 'all 0.2s ease-in-out',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: minimized ? 0 : 1.5,
          cursor: 'default',
          p: minimized ? 1 : 1.5,
          borderRadius: minimized ? 0.5 : 1,
          backgroundColor: minimized
            ? 'background.paper'
            : headerStyle.backgroundColor || theme.palette.custom?.sectionControlsBackground,
          border: `1px solid ${theme.palette.custom?.commonBorderColor ?? theme.palette.divider}`,
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 1 auto', minWidth: 0 }}>
          {Icon && (
            <Box
              sx={{
                mr: 1.5,
                color: minimized ? 'text.secondary' : 'primary.main',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <Icon sx={{ fontSize: 22 }} />
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: minimized ? 'text.secondary' : headerStyle.color || 'text.primary',
              }}
            >
              {title}
            </Typography>
            {subtitle && !minimized && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        {!minimized && onSearch && (
          <Box
            sx={{
              flex: '1 1 auto',
              display: 'flex',
              justifyContent: 'center',
              minWidth: 0,
              px: 1,
            }}
          >
            <GridSearch
              key={gridSearchResetKey}
              onSearch={onSearch}
              placeholder={searchPlaceholder || `Search ${String(title).toLowerCase()}…`}
              sx={{ width: '100%' }}
            />
          </Box>
        )}

        {!minimized && (headerButton || controls) && (
          <Box
            sx={{
              ml: 1.5,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {headerButton}
            {controls}
          </Box>
        )}

        {minimized && onToggleMinimize && (
          <IconButton
            onClick={onToggleMinimize}
            size="small"
            color="inherit"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
              flexShrink: 0,
            }}
            aria-label="Expand section"
          >
            <ExpandSectionIcon sx={{ fontSize: 22 }} />
          </IconButton>
        )}
      </Box>

      <Collapse in={!minimized}>{children}</Collapse>
    </Paper>
  );
}
