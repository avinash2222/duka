import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

/**
 * Search + three selects + reset / apply row for catalog (or other vertical) tabs.
 * Use a unique `idPrefix` per tab when multiple toolbars can exist in the tree.
 */
export default function CatalogFilterToolbar({
  idPrefix = 'catalog-filter',
  search,
  onSearchChange,
  searchPlaceholder,
  category,
  onCategoryChange,
  categoryOptions,
  categoryLabel = 'Category',
  listing,
  onListingChange,
  listingOptions,
  listingLabel = 'Listing',
  stock,
  onStockChange,
  stockOptions,
  stockLabel = 'Stock',
  onReset,
  onApply,
  resetLabel,
  filterLabel,
}) {
  const catLabelId = `${idPrefix}-cat`;
  const listingLabelId = `${idPrefix}-listing`;
  const stockLabelId = `${idPrefix}-stock`;

  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 0 }}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <FormControl fullWidth size="small">
          <InputLabel id={catLabelId}>{categoryLabel}</InputLabel>
          <Select
            labelId={catLabelId}
            label={categoryLabel}
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categoryOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <FormControl fullWidth size="small">
          <InputLabel id={listingLabelId}>{listingLabel}</InputLabel>
          <Select
            labelId={listingLabelId}
            label={listingLabel}
            value={listing}
            onChange={(e) => onListingChange(e.target.value)}
          >
            {listingOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <FormControl fullWidth size="small">
          <InputLabel id={stockLabelId}>{stockLabel}</InputLabel>
          <Select
            labelId={stockLabelId}
            label={stockLabel}
            value={stock}
            onChange={(e) => onStockChange(e.target.value)}
          >
            {stockOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
      >
        <Button size="small" onClick={onReset}>
          {resetLabel}
        </Button>
        <Button size="small" variant="outlined" startIcon={<FilterListIcon />} onClick={onApply}>
          {filterLabel}
        </Button>
      </Grid>
    </Grid>
  );
}
