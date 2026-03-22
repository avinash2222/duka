import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Block as BlockIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { ROLES } from '@/auth/rbacConstants';
import { accessForbiddenContent, routes } from '@/content/appContent';

const AccessForbidden = () => {
  const navigate = useNavigate();
  const { roles } = useAuth();

  const onlyCustomer = roles.length > 0 && roles.every((r) => r === ROLES.CUSTOMER);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: '50%',
              bgcolor: 'error.light',
              color: 'error.main',
              display: 'inline-flex',
            }}
          >
            <BlockIcon sx={{ fontSize: 64 }} />
          </Box>
        </Box>

        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          {accessForbiddenContent.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
          {onlyCustomer ? accessForbiddenContent.customerOnly : accessForbiddenContent.generic}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} size="large">
            {accessForbiddenContent.goBack}
          </Button>
          <Button variant="outlined" onClick={() => navigate(routes.home)} size="large">
            {accessForbiddenContent.dashboard}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AccessForbidden;
