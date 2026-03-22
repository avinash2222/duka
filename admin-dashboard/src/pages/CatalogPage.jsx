import { useMemo, useState, useRef, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GridViewIcon from '@mui/icons-material/GridView';
import { TabPanel, PageHeader, VerticalTabsPaper, TabPlaceholder } from '@common';
import { catalogDemoItems } from '@/data/catalogDemoItems';
import { catalogContent, dashboardOrderVerticalTabs } from '@/content/appContent';
import CatalogFilterToolbar from '@/components/catalog/CatalogFilterToolbar';
import CatalogItemsSection from '@/components/catalog/CatalogItemsSection';
import CatalogGroceryGrid from '@/components/catalog/Grid';

export default function CatalogPage() {
  const [verticalTab, setVerticalTab] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [listingFilter, setListingFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const catalogGridRef = useRef(null);

  const categoryOptions = useMemo(
    () => [
      { value: 'all', label: catalogContent.allCategories },
      { value: 'grocery', label: 'Grocery' },
      { value: 'fruits', label: 'Fruits' },
      { value: 'dairy', label: 'Dairy' },
      { value: 'snacks', label: 'Snacks' },
      { value: 'health', label: 'Health' },
    ],
    []
  );

  const listingOptions = useMemo(
    () => [
      { value: 'all', label: catalogContent.allStatus },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
    []
  );

  const stockOptions = useMemo(
    () => [
      { value: 'all', label: catalogContent.stockAll },
      { value: 'in_stock', label: catalogContent.stockInStock },
      { value: 'low_stock', label: catalogContent.stockLow },
      { value: 'out_of_stock', label: catalogContent.stockOut },
    ],
    []
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return catalogDemoItems.filter((row) => {
      if (category !== 'all' && row.category !== category) return false;
      if (listingFilter !== 'all' && row.listingStatus !== listingFilter) return false;
      if (stockFilter !== 'all' && row.stockStatus !== stockFilter) return false;
      if (q && !row.name.toLowerCase().includes(q) && !row.sku.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [search, category, listingFilter, stockFilter]);

  const handleResetFilters = useCallback(() => {
    setSearch('');
    setCategory('all');
    setListingFilter('all');
    setStockFilter('all');
  }, []);

  const handleApplyFilter = useCallback(() => {
    catalogGridRef.current?.scrollToTop();
  }, []);

  return (
    <Box>
      <PageHeader
        title={catalogContent.title}
        subtitle={catalogContent.subtitle}
        action={
          <Button variant="contained" startIcon={<AddIcon />}>
            {catalogContent.addItem}
          </Button>
        }
      />

      <VerticalTabsPaper
        tabs={dashboardOrderVerticalTabs}
        value={verticalTab}
        onChange={(_, v) => setVerticalTab(v)}
        idPrefix="catalog-vertical"
      >
        <TabPanel idPrefix="catalog-vertical" value={verticalTab} index={0}>
          <CatalogFilterToolbar
            idPrefix="catalog-grocery-filter"
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder={catalogContent.searchPlaceholder}
            category={category}
            onCategoryChange={setCategory}
            categoryOptions={categoryOptions}
            listing={listingFilter}
            onListingChange={setListingFilter}
            listingOptions={listingOptions}
            stock={stockFilter}
            onStockChange={setStockFilter}
            stockOptions={stockOptions}
            stockLabel={catalogContent.stockFilterLabel}
            onReset={handleResetFilters}
            onApply={handleApplyFilter}
            resetLabel={catalogContent.reset}
            filterLabel={catalogContent.filter}
          />

          <CatalogItemsSection
            title={catalogContent.itemsHeading}
            count={filteredRows.length}
            headerAction={
              <Button size="small" variant="outlined" startIcon={<GridViewIcon />}>
                {catalogContent.manageCategories}
              </Button>
            }
          >
            <CatalogGroceryGrid ref={catalogGridRef} rows={filteredRows} />
          </CatalogItemsSection>
        </TabPanel>

        {dashboardOrderVerticalTabs.slice(1).map((tab, i) => (
          <TabPanel key={tab.id} idPrefix="catalog-vertical" value={verticalTab} index={i + 1}>
            <TabPlaceholder message={catalogContent.verticalComingSoon} />
          </TabPanel>
        ))}
      </VerticalTabsPaper>
    </Box>
  );
}
