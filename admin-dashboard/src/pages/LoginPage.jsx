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

  const devBypass = () => {
    login({
      accessToken: 'dev-token',
      user: { name: 'Dev Admin', email: 'admin@duka.local', role_name: 'admin' },
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
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: '100%' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          DUKA Admin
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
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
            <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={devBypass} type="button">
              Continue offline (dev)
            </Button>
          ) : null}
        </Box>
      </Paper>
    </Box>
  );
}
