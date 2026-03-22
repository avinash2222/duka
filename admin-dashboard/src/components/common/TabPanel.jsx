import { Box } from '@mui/material';

/**
 * MUI Tabs companion panel (a11y). Parent `Tab` nodes should use:
 * - `id={\`${idPrefix}-tab-${i}\`}`
 * - `aria-controls={\`${idPrefix}-tabpanel-${i}\`}`
 */
export default function TabPanel({ children, value, index, idPrefix, contentSx }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${idPrefix}-tabpanel-${index}`}
      aria-labelledby={`${idPrefix}-tab-${index}`}
    >
      {value === index ? <Box sx={{ pt: 2, ...contentSx }}>{children}</Box> : null}
    </div>
  );
}
