/**
 * Demo catalog rows for the admin UI until Backend catalog APIs exist.
 * Shape matches the catalog grid column contract.
 */

const rows = [
  ['Basmati Rice 5kg', 'RICE-001', 'grocery', 420, 15, 'bags', 'in_stock', 'active'],
  ['Toor Dal 1kg', 'DAL-002', 'grocery', 165, 40, 'packets', 'in_stock', 'active'],
  ['Amul Butter 100g', 'DAI-101', 'dairy', 58, 6, 'tubes', 'low_stock', 'active'],
  ['Banana (dozen)', 'FRT-201', 'fruits', 60, 0, 'dozen', 'out_of_stock', 'active'],
  ['Alphonso Mango 1kg', 'FRT-202', 'fruits', 280, 22, 'kg', 'in_stock', 'active'],
  ['Lay’s Classic 52g', 'SNK-301', 'snacks', 20, 120, 'packets', 'in_stock', 'inactive'],
  ['Dabur Honey 500g', 'HLT-401', 'health', 245, 8, 'jars', 'low_stock', 'active'],
  ['Fortune Sunflower Oil 1L', 'GRO-501', 'grocery', 195, 30, 'bottles', 'in_stock', 'active'],
  ['Aashirvaad Atta 5kg', 'GRO-502', 'grocery', 285, 18, 'bags', 'in_stock', 'active'],
  ['Nandini Toned Milk 1L', 'DAI-102', 'dairy', 56, 0, 'cartons', 'out_of_stock', 'active'],
  ['Britannia Marie 200g', 'SNK-302', 'snacks', 35, 45, 'packets', 'in_stock', 'active'],
  ['Organic Turmeric 200g', 'HLT-402', 'health', 95, 12, 'jars', 'in_stock', 'active'],
  ['Onion 1kg', 'FRT-203', 'fruits', 42, 200, 'kg', 'in_stock', 'active'],
  ['Tomato Hybrid 500g', 'FRT-204', 'fruits', 28, 5, 'trays', 'low_stock', 'active'],
  ['Paneer 200g', 'DAI-103', 'dairy', 95, 14, 'packs', 'in_stock', 'active'],
  ['Kurkure Masala 75g', 'SNK-303', 'snacks', 18, 0, 'packets', 'out_of_stock', 'inactive'],
  ['Protein Bar Pack', 'HLT-403', 'health', 360, 25, 'boxes', 'in_stock', 'active'],
  ['Tata Salt 1kg', 'GRO-503', 'grocery', 28, 60, 'packets', 'in_stock', 'active'],
  ['Red Label Tea 500g', 'GRO-504', 'grocery', 275, 9, 'packets', 'low_stock', 'active'],
  ['Orange (imported) 1kg', 'FRT-205', 'fruits', 180, 11, 'kg', 'in_stock', 'active'],
  ['Greek Yogurt 400g', 'DAI-104', 'dairy', 120, 4, 'cups', 'low_stock', 'active'],
  ['Dark Fantasy Choco', 'SNK-304', 'snacks', 45, 70, 'packets', 'in_stock', 'active'],
  ['Multivitamin 60 tabs', 'HLT-404', 'health', 520, 3, 'bottles', 'low_stock', 'active'],
  ['Basmati Rice 1kg', 'RICE-002', 'grocery', 120, 50, 'bags', 'in_stock', 'active'],
];

const categoryLabels = {
  grocery: 'Grocery',
  fruits: 'Fruits',
  dairy: 'Dairy',
  snacks: 'Snacks',
  health: 'Health',
};

export const catalogDemoItems = rows.map(([name, sku, category, price, stockQty, stockUnit, stockStatus, listingStatus], i) => ({
  id: String(i + 1),
  name,
  sku,
  category,
  categoryLabel: categoryLabels[category],
  price,
  stockQty,
  stockUnit,
  stockStatus,
  listingStatus,
  imageSeed: `cat-${sku}`,
}));
