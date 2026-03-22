import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Slide,
  Button,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const SlideUp = React.forwardRef(function SlideUp(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * MUI dialog with form submit — ported from vendorselection-frontend without MobX / role-specific gradients.
 */
export default function ModalDialog({
  open,
  onClose,
  onSubmit,
  title = 'Dialog',
  titleDescription,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  children,
  maxWidth = 'sm',
  fullWidth = false,
  fullScreen = false,
  submitDisabled = false,
  loading = false,
  hideSubmitButton = false,
  hideFooter = false,
  headerSx = {},
  gradientHeader = false,
  paperSx = {},
  customHeaderComponent,
  disableBottomPadding = false,
  contentSx = {},
}) {
  const theme = useTheme();

  const gradientSx = gradientHeader
    ? {
        background: `linear-gradient(135deg, ${theme.palette.custom?.dashboardGradientStart ?? theme.palette.primary.main} 0%, ${theme.palette.custom?.dashboardGradientEnd ?? theme.palette.primary.dark} 100%)`,
        color: theme.palette.primary.contrastText,
        borderBottom: 'none',
        '& .MuiTypography-root': { color: 'inherit' },
      }
    : {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(e);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      TransitionComponent={SlideUp}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: fullScreen ? 0 : 2,
          ...paperSx,
        },
      }}
    >
      {customHeaderComponent ? (
        customHeaderComponent
      ) : (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 1,
            borderBottom: gradientHeader ? 'none' : `1px solid ${theme.palette.divider}`,
            ...gradientSx,
            ...headerSx,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
            <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            {titleDescription ? (
              <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
                {titleDescription}
              </Typography>
            ) : null}
          </Box>
          <IconButton onClick={onClose} size="small" aria-label="close dialog" sx={{ mt: -0.5 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
      >
        <DialogContent
          sx={{
            pt: 2,
            pb: disableBottomPadding ? 0 : 2,
            flex: 1,
            overflow: 'auto',
            ...contentSx,
          }}
        >
          {children}
        </DialogContent>

        {!hideFooter && (
          <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}`, gap: 1 }}>
            <Button onClick={onClose} disabled={loading} variant="outlined" sx={{ minWidth: 100 }}>
              {cancelLabel}
            </Button>
            {!hideSubmitButton && (
              <Button
                type="submit"
                variant="contained"
                disabled={submitDisabled || loading}
                sx={{ minWidth: 120 }}
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
              >
                {submitLabel}
              </Button>
            )}
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}
