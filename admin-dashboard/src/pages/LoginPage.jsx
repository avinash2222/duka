import { useState } from 'react';
import { Box, TextField, Typography, Paper, Alert, Link } from '@mui/material';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuth } from '@/auth/AuthContext';
import { loginWithEmail } from '@/api/api';
import DukaLogo from '@branding/DukaLogo';
import {
  routes,
  loginContent,
  devLoginPersonas,
  roleDisplayLabels,
} from '@/content/appContent';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || routes.home;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await loginWithEmail(form.email);
      const token = data?.accessToken ?? data?.token;
      const user = data?.user ?? { email: form.email.trim(), name: data?.name };
      if (!token) {
        throw new Error(loginContent.errors.noToken);
      }
      login({ accessToken: token, user });
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || loginContent.errors.signInFailed;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const devLogin = (user) => {
    login({
      accessToken: 'dev-token',
      user,
    });
    navigate(from, { replace: true });
  };

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
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: '100%', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <DukaLogo width={88} sx={{ borderRadius: 2 }} />
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom align="center">
          {loginContent.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }} align="center">
          {loginContent.emailOnlySubtitle}
        </Typography>
        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : null}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label={loginContent.emailLabel}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, py: 1.25, fontWeight: 600, textTransform: 'none', fontSize: '1rem' }}
            disabled={loading}
          >
            {loading ? loginContent.signingIn : loginContent.signIn}
          </Button>
          <Link
            component={RouterLink}
            to={routes.forgotPassword}
            variant="body2"
            underline="hover"
            sx={{ display: 'block', textAlign: 'center', mt: 2 }}
          >
            {loginContent.forgotPassword}
          </Link>
          {import.meta.env.DEV ? (
            <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
                {loginContent.dev.sectionTitle}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {devLoginPersonas.map(({ roleCode, name, email }) => (
                  <Button
                    key={roleCode}
                    variant="outlined"
                    color="primary"
                    size="medium"
                    onClick={() => devLogin({ name, email, roles: [roleCode] })}
                    type="button"
                    sx={{ textTransform: 'none' }}
                  >
                    {roleDisplayLabels[roleCode] ?? roleCode}
                  </Button>
                ))}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Paper>
    </Box>
  );
}
