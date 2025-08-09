import React from 'react';
import { Button } from '../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { COMPONENTS as TOKENS } from '../../tokens';

export type DateRangeOption = 'yearToDate' | 'last30' | 'last90' | 'custom';
export type PremiumType = 'billed' | 'written';

export interface FiltersBarProps {
  onOpenFiltersPanel?: () => void;
  dateRange?: DateRangeOption;
  onChangeDateRange?: (value: DateRangeOption) => void;
  premiumType?: PremiumType;
  onChangePremiumType?: (value: PremiumType) => void;
}

const DATE_LABEL: Record<DateRangeOption, string> = {
  yearToDate: 'Year-to-date',
  last30: 'Last 30 days',
  last90: 'Last 90 days',
  custom: 'Custom range',
};

const PREMIUM_LABEL: Record<PremiumType, string> = {
  billed: 'Billed',
  written: 'Written',
};

export default function FiltersBar({
  onOpenFiltersPanel,
  dateRange = 'yearToDate',
  onChangeDateRange,
  premiumType = 'billed',
  onChangePremiumType,
}: FiltersBarProps) {
  return (
    <div className={TOKENS.filtersBar}>
      <Button className={TOKENS.filtersSurface} onClick={onOpenFiltersPanel} aria-label="Add filters">
        Add filters
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={TOKENS.filtersSurface} aria-haspopup="listbox">
            {DATE_LABEL[dateRange]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {Object.entries(DATE_LABEL).map(([value, label]) => (
            <DropdownMenuItem key={value} onClick={() => onChangeDateRange?.(value as DateRangeOption)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={TOKENS.filtersSurface} aria-haspopup="listbox">
            {PREMIUM_LABEL[premiumType]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {Object.entries(PREMIUM_LABEL).map(([value, label]) => (
            <DropdownMenuItem key={value} onClick={() => onChangePremiumType?.(value as PremiumType)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


