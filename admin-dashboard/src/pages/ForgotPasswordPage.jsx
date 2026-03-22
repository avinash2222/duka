import { Box, Typography, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DukaLogo from '@/components/branding/DukaLogo';
import { routes, forgotPasswordContent } from '@/content/appContent';

export default function ForgotPasswordPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        bgcolor: 'background.default',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: '100%', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <DukaLogo width={64} sx={{ borderRadius: 2 }} />
        </Box>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {forgotPasswordContent.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {forgotPasswordContent.body}
        </Typography>
        <Button component={RouterLink} to={routes.login} variant="outlined" fullWidth>
          {forgotPasswordContent.backToSignIn}
        </Button>
      </Paper>
    </Box>
  );
}
