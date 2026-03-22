import { Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@mui/material/styles';
import ModalDialog from './ModalDialog';

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  message,
  title = 'Confirm Delete',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  loading = false,
  maxWidth = 'sm',
  sx = {},
}) => {
  const theme = useTheme();

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (onConfirm) {
      await onConfirm();
    }
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      onSubmit={handleConfirm}
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <WarningIcon sx={{ fontSize: '1.75rem', color: theme.palette.warning.main }} />
          <Typography
            variant="h6"
            component="span"
            sx={{ color: theme.palette.warning.main, fontWeight: 600 }}
          >
            {title}
          </Typography>
        </Box>
      }
      submitLabel={confirmLabel}
      cancelLabel={cancelLabel}
      maxWidth={maxWidth}
      fullWidth
      loading={loading}
    >
      <Box sx={{ py: 1, ...sx }}>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          {message}
        </Typography>
      </Box>
    </ModalDialog>
  );
};

export default ConfirmationDialog;
