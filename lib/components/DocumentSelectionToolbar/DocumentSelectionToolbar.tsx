import { Share2, Download, Zap, GitCompare, FolderOpen, Trash2, Sparkles, Table2, FileType } from 'lucide-react';
import SelectionToolbar, { type ToolbarAction } from '../SelectionToolbar';

export interface DocumentSelectionToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onAskQuestions: () => void;
  onShare: () => void;
  onExportExcel: () => void;
  onExportPDF: () => void;
  onDigitize: () => void;
  onCompare: () => void;
  onMove: () => void;
  onDelete: () => void;
}

const DocumentSelectionToolbar = ({
  selectedCount,
  onClearSelection,
  onAskQuestions,
  onShare,
  onExportExcel,
  onExportPDF,
  onDigitize,
  onCompare,
  onMove,
  onDelete
}: DocumentSelectionToolbarProps) => {
  const actions: ToolbarAction[] = [
    {
      icon: Sparkles,
      label: 'Ask Questions',
      onClick: onAskQuestions
    },
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
      icon: Zap,
      label: 'Digitize',
      onClick: onDigitize
    },
    {
      icon: GitCompare,
      label: 'Compare',
      onClick: onCompare
    },
    {
      icon: FolderOpen,
      label: 'Move',
      onClick: onMove
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

export default DocumentSelectionToolbar;