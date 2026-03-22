import { useState, useCallback, useEffect } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

/**
 * Debounced search field for grid toolbars (vendorselection-frontend pattern).
 */
export default function GridSearch({
  onSearch,
  placeholder = 'Search…',
  sx = {},
  size = 'small',
}) {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onSearch('');
  }, [onSearch]);

  const handleChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 400, ...sx }}>
      <TextField
        size={size}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.custom?.commonBorderColor ?? theme.palette.divider}`,
            '&:hover': {
              borderColor: theme.palette.action.active,
            },
            '&.Mui-focused': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear} edge="end" aria-label="Clear search">
                <ClearIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
}
