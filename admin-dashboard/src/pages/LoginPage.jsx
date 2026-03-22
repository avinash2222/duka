import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuth } from '@/auth/AuthContext';
import { apiPost } from '@/api/apiClient';
import { ROLES } from '@/auth/rbacConstants';
import DukaLogo from '@/components/branding/DukaLogo';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await apiPost('login', {
        email: form.email.trim(),
        password: form.password,
      });
      const token = data?.accessToken ?? data?.token;
      const user = data?.user ?? { email: form.email, name: data?.name };
      if (!token) {
        throw new Error('Invalid response: no access token');
      }
      login({ accessToken: token, user });
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Sign-in failed. Use “Continue offline (dev)” if the API is not ready.';
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

  const devPersonas = {
    superAdmin: {
      name: 'Dev Super Admin',
      email: 'super@duka.local',
      roles: [ROLES.SUPER_ADMIN],
    },
    storeOperator: {
      name: 'Dev Store Operator',
      email: 'store@duka.local',
      roles: [ROLES.STORE_OPERATOR],
    },
    supportAdmin: {
      name: 'Dev Support Admin',
      email: 'support@duka.local',
      roles: [ROLES.SUPPORT_ADMIN],
    },
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
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <DukaLogo width={88} sx={{ borderRadius: 2 }} />
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom align="center">
          Admin
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }} align="center">
          Sign in with your admin account (backend must expose POST /auth/login).
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
            label="Email"
            name="email"
            type="email"
            autoComplete="username"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" aria-label="toggle password">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth type="submit" variant="contained" size="large" sx={{ mt: 3 }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
          {import.meta.env.DEV ? (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Dev personas per FEAT-RBAC-001. Customers use mobile only (no admin login).
              </Typography>
              <Button variant="outlined" size="small" onClick={() => devLogin(devPersonas.superAdmin)} type="button">
                Super Admin
              </Button>
              <Button variant="outlined" size="small" onClick={() => devLogin(devPersonas.storeOperator)} type="button">
                Store Operator
              </Button>
              <Button variant="outlined" size="small" onClick={() => devLogin(devPersonas.supportAdmin)} type="button">
                Support Admin
              </Button>
            </Box>
          ) : null}
        </Box>
      </Paper>
    </Box>
  );
}
