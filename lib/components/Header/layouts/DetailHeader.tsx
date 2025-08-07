import React from 'react';
import Header from '../Header';
import Breadcrumb from '../Breadcrumb';
import PageTitle from '../PageTitle';
import TopAI from '../TopAI';
import TopSearch from '../TopSearch';
import Dropdown from '../Dropdown';
import OverviewSection from '../OverviewSection';
import type { MetricData, ActionButton } from '../OverviewSection';

export interface DetailHeaderProps {
  title: string;
  breadcrumbItems: Array<{ label: string; path?: string }>;
  metrics?: MetricData[];
  actions?: ActionButton[];
  className?: string;
}

const DetailHeader = ({ 
  title, 
  breadcrumbItems, 
  metrics = [], 
  actions = [], 
  className 
}: DetailHeaderProps) => {
  const dropdownItems = [
    { label: 'Settings', onClick: () => console.log('Settings') },
    { label: 'Help', onClick: () => console.log('Help') },
    { label: 'Sign out', onClick: () => console.log('Sign out') },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Row - Breadcrumbs and Controls */}
      <Header className={className}>
        <div className="flex items-center justify-between w-full">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="flex items-center gap-3">
            <TopAI />
            <TopSearch />
            <Dropdown items={dropdownItems} />
          </div>
        </div>
      </Header>
      
      {/* Second Row - Page Title */}
      <div className="px-6">
        <PageTitle 
          title={title} 
          variant="h1" 
        />
      </div>
      
      {/* Third Row - Overview Metrics */}
      {metrics.length > 0 && (
        <div className="px-6">
          <OverviewSection 
            metrics={metrics}
            actions={actions}
          />
        </div>
      )}
    </div>
  );
};

export default DetailHeader;