import { SnackbarProvider, useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// Close button component that uses useSnackbar hook
// This component will be rendered inside SnackbarProvider context, so it can use useSnackbar
const SnackbarCloseButton = ({ snackbarId }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      size="small"
      onClick={() => closeSnackbar(snackbarId)}
      sx={{
        color: 'inherit',
        padding: '4px',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

const NotificationProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      action={(snackbarId) => <SnackbarCloseButton snackbarId={snackbarId} />}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotificationProvider;
