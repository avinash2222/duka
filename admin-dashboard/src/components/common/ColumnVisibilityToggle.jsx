import { useState, useCallback, useMemo } from 'react';
import {
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Tooltip,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, Search, FilterAltOff } from '@mui/icons-material';
/**
 * Returns a new columnDefs array with explicit `hide` on every hideable column.
 * AG Grid needs fresh defs and explicit `hide: false` when showing again — returning
 * the original array when nothing is hidden left columns stuck hidden after toggling.
 */
export function applyColumnVisibility(columnDefs = [], hiddenColumns = new Set(), excludeFields = ['actions']) {
  if (!Array.isArray(columnDefs)) {
    return columnDefs;
  }
  const hidden = hiddenColumns instanceof Set ? hiddenColumns : new Set(hiddenColumns);
  return columnDefs.map((colDef) => {
    if (!colDef || typeof colDef !== 'object') {
      return colDef;
    }
    const field = colDef.field;
    if (!field || excludeFields.includes(field)) {
      return { ...colDef };
    }
    const shouldHide = hidden.has(field);
    return { ...colDef, hide: shouldHide };
  });
}

export function useColumnVisibility(baseColumnDefs = [], excludeFields = ['actions']) {
  const [hiddenColumns, setHiddenColumns] = useState(() => new Set());
  const handleHiddenColumnsChange = useCallback((newHiddenColumns) => {
    setHiddenColumns(new Set(newHiddenColumns));
  }, []);
  const columnDefs = useMemo(
    () => applyColumnVisibility(baseColumnDefs, hiddenColumns, excludeFields),
    [baseColumnDefs, hiddenColumns, excludeFields]
  );
  return {
    columnDefs,
    hiddenColumns,
    setHiddenColumns,
    handleHiddenColumnsChange,
  };
}

export default function ColumnVisibilityToggle({
  columns = [],
  hiddenColumns = new Set(),
  onHiddenColumnsChange,
  disabled = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const hasFilters = searchTerm.trim() !== '' || hiddenColumns.size > 0;

  const filteredColumns = useMemo(() => {
    if (!searchTerm.trim()) return columns;
    const term = searchTerm.toLowerCase().trim();
    return columns.filter((col) => (col.headerName || col.field || '').toLowerCase().includes(term));
  }, [columns, searchTerm]);

  const toggleColumnVisibility = useCallback(
    (field) => {
      const next = new Set(hiddenColumns);
      if (next.has(field)) next.delete(field);
      else next.add(field);
      onHiddenColumnsChange(next);
    },
    [hiddenColumns, onHiddenColumnsChange]
  );

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
    setSearchTerm('');
  }, []);

  const showAllColumns = useCallback(() => {
    onHiddenColumnsChange(new Set());
  }, [onHiddenColumnsChange]);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    onHiddenColumnsChange(new Set());
  }, [onHiddenColumnsChange]);

  return (
    <>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="Clear column visibility filters">
          <span>
            <IconButton
              size="small"
              onClick={clearAllFilters}
              disabled={disabled || !hasFilters}
              color={hasFilters ? 'primary' : 'default'}
            >
              <FilterAltOff fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Column visibility">
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            disabled={disabled}
          >
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { minWidth: 260, maxHeight: 400, overflow: 'auto' },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              Column visibility
            </Typography>
            <Button variant="contained" size="small" onClick={showAllColumns}>
              Show all
            </Button>
          </Box>
          <TextField
            fullWidth
            size="small"
            placeholder="Search columns…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <List dense disablePadding>
            {filteredColumns.map((column) => {
              const field = column.field;
              if (!field) return null;
              const isHidden = hiddenColumns.has(field);
              return (
                <ListItem key={field} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => toggleColumnVisibility(field)}
                    sx={{ borderRadius: 1 }}
                  >
                    {isHidden ? (
                      <VisibilityOff sx={{ fontSize: 20, color: 'text.disabled', mr: 1 }} />
                    ) : (
                      <Visibility sx={{ fontSize: 20, color: 'primary.main', mr: 1 }} />
                    )}
                    <Typography
                      variant="body2"
                      color={isHidden ? 'text.disabled' : 'text.primary'}
                      sx={{ textDecoration: isHidden ? 'line-through' : 'none', flex: 1 }}
                    >
                      {column.headerName || field}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Popover>
    </>
  );
}
