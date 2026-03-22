import { memo } from 'react';
import { Box, Typography, Chip, IconButton, Tooltip, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { statusChipMeta } from './statusMeta';

function telHref(phone) {
  return `tel:${String(phone).replace(/\s/g, '')}`;
}

export const GroceryPhoneCell = memo((props) => {
  const { data } = props;
  if (!data?.phone) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, height: '100%', minWidth: 0 }}>
      <Typography variant="body2" noWrap sx={{ minWidth: 0 }}>
        {data.phone}
      </Typography>
      <Tooltip title="Call customer">
        <IconButton component="a" href={telHref(data.phone)} size="small" color="primary" aria-label="Call customer">
          <PhoneIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
});
GroceryPhoneCell.displayName = 'GroceryPhoneCell';

export const GroceryItemsCell = memo((props) => {
  const { data } = props;
  if (!data) return null;
  const text = `${data.itemCount} · ${data.itemSummary ?? '—'}`;
  return (
    <Typography variant="body2" noWrap title={text} sx={{ lineHeight: 1.5 }}>
      {text}
    </Typography>
  );
});
GroceryItemsCell.displayName = 'GroceryItemsCell';

export const GroceryStatusCell = memo((props) => {
  const { data } = props;
  if (!data) return null;
  const meta = statusChipMeta[data.status] ?? { label: data.status, color: 'default' };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Chip size="small" label={meta.label} color={meta.color} variant="outlined" sx={{ fontWeight: 700 }} />
    </Box>
  );
});
GroceryStatusCell.displayName = 'GroceryStatusCell';

export const GroceryAgentCell = memo((props) => {
  const { data } = props;
  if (!data) return null;
  if (!data.agentName) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Chip size="small" label="Unassigned" color="error" variant="filled" sx={{ fontWeight: 700 }} />
      </Box>
    );
  }
  return (
    <Typography variant="body2" noWrap fontWeight={600}>
      {data.agentName}
    </Typography>
  );
});
GroceryAgentCell.displayName = 'GroceryAgentCell';

export const GroceryOpsActionsCell = memo((props) => {
  const { data } = props;
  if (!data) return null;
  return (
    <Stack direction="row" alignItems="center" spacing={0} sx={{ height: '100%', flexWrap: 'nowrap' }}>
      <Tooltip title="Assign agent">
        <IconButton size="small" aria-label="Assign agent" onClick={() => {}}>
          <PersonAddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="View details">
        <IconButton size="small" aria-label="View details" onClick={() => {}}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Mark packed">
        <IconButton size="small" aria-label="Mark packed" onClick={() => {}}>
          <Inventory2Icon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Out for delivery">
        <IconButton size="small" color="primary" aria-label="Out for delivery" onClick={() => {}}>
          <LocalShippingIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Mark delivered">
        <IconButton size="small" color="success" aria-label="Mark delivered" onClick={() => {}}>
          <CheckCircleOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
});
GroceryOpsActionsCell.displayName = 'GroceryOpsActionsCell';
