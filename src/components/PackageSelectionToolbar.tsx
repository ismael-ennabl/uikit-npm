import { Share2, Download, Trash2, Table2, FileType } from 'lucide-react';
import SelectionToolbar, { type ToolbarAction } from '@/components/ui/selection-toolbar';

interface PackageSelectionToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onShare: () => void;
  onExportExcel: () => void;
  onExportPDF: () => void;
  onDelete: () => void;
}

const PackageSelectionToolbar = ({
  selectedCount,
  onClearSelection,
  onShare,
  onExportExcel,
  onExportPDF,
  onDelete
}: PackageSelectionToolbarProps) => {
  const actions: ToolbarAction[] = [
    {
      icon: Share2,
      label: 'Share',
      onClick: onShare
    },
    {
      icon: Download,
      label: 'Download',
      dropdownItems: [
        {
          icon: Table2,
          label: 'Export as Excel',
          onClick: onExportExcel
        },
        {
          icon: FileType,
          label: 'Export as PDF',
          onClick: onExportPDF
        }
      ]
    },
    {
      icon: Trash2,
      label: 'Delete',
      onClick: onDelete
    }
  ];

  return (
    <SelectionToolbar
      selectedCount={selectedCount}
      onClearSelection={onClearSelection}
      actions={actions}
    />
  );
};

export default PackageSelectionToolbar;