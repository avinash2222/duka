import { memo, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { alpha } from '@mui/material/styles';

const CATEGORY_TONE = {
  grocery: { light: { bg: '#dcfce7', fg: '#166534' }, dark: { bg: '#14532d', fg: '#86efac' } },
  fruits: { light: { bg: '#ffedd5', fg: '#c2410c' }, dark: { bg: '#7c2d12', fg: '#fdba74' } },
  dairy: { light: { bg: '#dbeafe', fg: '#1d4ed8' }, dark: { bg: '#1e3a8a', fg: '#93c5fd' } },
  snacks: { light: { bg: '#fef3c7', fg: '#b45309' }, dark: { bg: '#78350f', fg: '#fcd34d' } },
  health: { light: { bg: '#f3e8ff', fg: '#7c3aed' }, dark: { bg: '#581c87', fg: '#d8b4fe' } },
};

function categorySx(theme, key) {
  const tone = CATEGORY_TONE[key] ?? CATEGORY_TONE.grocery;
  const t = theme.palette.mode === 'dark' ? tone.dark : tone.light;
  return {
    bgcolor: t.bg,
    color: t.fg,
    fontWeight: 600,
    height: 24,
    border: 'none',
    '& .MuiChip-label': { px: 1 },
  };
}

export const CatalogItemCell = memo((props) => {
  const { data } = props;
  if (!data) return null;
  const src = `https://picsum.photos/seed/${encodeURIComponent(data.imageSeed)}/64/64`;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5, minHeight: 56 }}>
      <Box
        component="img"
        src={src}
        alt=""
        sx={{ width: 48, height: 48, borderRadius: 1, objectFit: 'cover', bgcolor: 'action.hover' }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" fontWeight={700} noWrap>
          {data.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          SKU: {data.sku}
        </Typography>
      </Box>
    </Box>
  );
});
CatalogItemCell.displayName = 'CatalogItemCell';

export const CatalogCategoryCell = memo((props) => {
  const { data } = props;
  const theme = useTheme();
  if (!data) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Chip label={data.categoryLabel} size="small" sx={categorySx(theme, data.category)} />
    </Box>
  );
});
CatalogCategoryCell.displayName = 'CatalogCategoryCell';

export const CatalogStockCell = memo((props) => {
  const { data } = props;
  if (!data) return null;
  const line =
    data.stockStatus === 'in_stock'
      ? { label: 'In stock', color: 'success.main' }
      : data.stockStatus === 'low_stock'
        ? { label: 'Low stock', color: 'warning.main' }
        : { label: 'Out of stock', color: 'error.main' };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 0.5, minHeight: 56 }}>
      <Typography variant="body2" fontWeight={600}>
        {data.stockQty} {data.stockUnit}
      </Typography>
      <Typography variant="caption" sx={{ color: line.color, fontWeight: 600 }}>
        {line.label}
      </Typography>
    </Box>
  );
});
CatalogStockCell.displayName = 'CatalogStockCell';

export const CatalogListingStatusCell = memo((props) => {
  const { data } = props;
  const theme = useTheme();
  if (!data) return null;
  const active = data.listingStatus === 'active';
  const dot = active ? theme.palette.success.main : theme.palette.error.main;
  const label = active ? 'Active' : 'Inactive';
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Chip
        size="small"
        label={
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: dot,
                boxShadow: `0 0 0 2px ${alpha(dot, 0.25)}`,
              }}
            />
            {label}
          </Box>
        }
        sx={{
          bgcolor: active ? alpha(theme.palette.success.main, 0.12) : alpha(theme.palette.error.main, 0.12),
          color: active ? 'success.main' : 'error.main',
          fontWeight: 600,
          height: 28,
          '.MuiChip-label': { px: 1 },
        }}
      />
    </Box>
  );
});
CatalogListingStatusCell.displayName = 'CatalogListingStatusCell';

export const CatalogActionsCell = memo((props) => {
  const { data } = props;
  const [anchor, setAnchor] = useState(null);
  if (!data) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, height: '100%' }}>
      <IconButton size="small" aria-label="Edit item" onClick={() => {}}>
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" aria-label="More actions" onClick={(e) => setAnchor(e.currentTarget)}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MenuItem
          onClick={() => {
            setAnchor(null);
          }}
        >
          <ListItemIcon>
            <ContentCopyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate SKU</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchor(null);
          }}
        >
          <ListItemIcon>
            <ArchiveOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Archive</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
});
CatalogActionsCell.displayName = 'CatalogActionsCell';
