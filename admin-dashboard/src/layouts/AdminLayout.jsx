import { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { useThemeMode } from '@/contexts/ThemeContext';
import GlobalLoading from '@/components/common/GlobalLoading';
import { adminNavItems } from '@/config/navigation';
import DukaLogo from '@/components/branding/DukaLogo';
import { routes, layoutContent, roleDisplayLabels } from '@/content/appContent';

const drawerWidth = 260;

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, roles, canSeeNavItem } = useAuth();
  const { mode, toggleTheme } = useThemeMode();

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 2, gap: 1.5, alignItems: 'center' }}>
        <DukaLogo width={36} sx={{ borderRadius: 1 }} />
        <Typography variant="h6" noWrap fontWeight={700} color="primary" component="span">
          {layoutContent.drawerTitle}
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, pt: 1 }}>
        {adminNavItems
          .filter((item) =>
            canSeeNavItem({
              anyOfRoles: item.anyOfRoles ?? [],
              anyOfPermissions: item.anyOfPermissions ?? [],
            })
          )
          .map((item) => {
            const Icon = item.icon;
            const selected =
              item.path === routes.home
                ? location.pathname === routes.home || location.pathname === ''
                : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <ListItem key={item.path} disablePadding sx={{ px: 1 }}>
                <ListItemButton selected={selected} onClick={() => navigate(item.path)}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Icon color={selected ? 'primary' : 'inherit'} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <GlobalLoading />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <DukaLogo width={28} sx={{ borderRadius: 0.75, display: { xs: 'none', sm: 'block' } }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
              Operations
            </Typography>
          </Box>
          {roles.length > 0 ? (
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 0.75,
                mr: 1,
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                maxWidth: 360,
              }}
            >
              {roles.map((r) => (
                <Typography
                  key={r}
                  component="span"
                  variant="caption"
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    color: 'text.secondary',
                    fontWeight: 600,
                  }}
                >
                  {roleDisplayLabels[r] ?? r}
                </Typography>
              ))}
            </Box>
          ) : null}
          <Tooltip
            title={mode === 'light' ? layoutContent.themeToDark : layoutContent.themeToLight}
          >
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              size="small"
              edge="end"
              aria-label={
                mode === 'light' ? layoutContent.themeToDark : layoutContent.themeToLight
              }
              sx={{ ml: 1 }}
            >
              {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" sx={{ ml: 0.5 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
              {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                logout();
                navigate(routes.login);
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              {layoutContent.logOut}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
