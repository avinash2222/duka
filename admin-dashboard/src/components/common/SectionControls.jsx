import { Box, IconButton, Tooltip } from '@mui/material';
import {
  Refresh as RefreshIcon,
  FileDownload as FileDownloadIcon,
  UnfoldMore as ExpandRowsIcon,
  UnfoldLess as CollapseRowsIcon,
  ExpandLess as CollapseSectionIcon,
  ExpandMore as ExpandSectionIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import ColumnVisibilityToggle from './ColumnVisibilityToggle';

function ControlIconButton({ title, onClick, disabled, children, color = 'default' }) {
  return (
    <Tooltip title={title}>
      <span>
        <IconButton size="small" onClick={onClick} disabled={disabled} color={color}>
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
}

/**
 * Toolbar actions for grid dashboard sections (vendorselection-frontend pattern).
 */
export default function SectionControls({
  variant = 'full',
  onCreate,
  onDownload,
  onRefresh,
  onMinimize,
  onExpand,
  createButtonText = 'Add',
  minimized = false,
  expanded = false,
  disabled = false,
  columns = [],
  hiddenColumns = new Set(),
  onHiddenColumnsChange,
}) {
  const theme = useTheme();
  const primaryIcon = variant === 'full' ? 'primary' : 'default';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: theme.spacing(0.5),
      }}
    >
      {onCreate && (
        <ControlIconButton
          title={createButtonText}
          onClick={onCreate}
          disabled={disabled}
          color="primary"
        >
          <AddCircleOutlineIcon fontSize="small" />
        </ControlIconButton>
      )}

      {onHiddenColumnsChange && (
        <ColumnVisibilityToggle
          columns={columns}
          hiddenColumns={hiddenColumns}
          onHiddenColumnsChange={onHiddenColumnsChange}
          disabled={disabled}
        />
      )}

      {onRefresh && (
        <ControlIconButton
          title="Refresh"
          onClick={onRefresh}
          disabled={disabled}
          color={primaryIcon}
        >
          <RefreshIcon fontSize="small" />
        </ControlIconButton>
      )}

      {onDownload && (
        <ControlIconButton
          title="Download CSV"
          onClick={onDownload}
          disabled={disabled}
          color={primaryIcon}
        >
          <FileDownloadIcon fontSize="small" />
        </ControlIconButton>
      )}

      {onExpand && (
        <ControlIconButton
          title={expanded ? 'Collapse all' : 'Expand all'}
          onClick={onExpand}
          disabled={disabled}
          color={primaryIcon}
        >
          {expanded ? <CollapseRowsIcon fontSize="small" /> : <ExpandRowsIcon fontSize="small" />}
        </ControlIconButton>
      )}

      {onMinimize && (
        <ControlIconButton
          title={minimized ? 'Expand section' : 'Collapse section'}
          onClick={onMinimize}
          disabled={disabled}
          color={primaryIcon}
        >
          {minimized ? <ExpandSectionIcon fontSize="small" /> : <CollapseSectionIcon fontSize="small" />}
        </ControlIconButton>
      )}
    </Box>
  );
}
