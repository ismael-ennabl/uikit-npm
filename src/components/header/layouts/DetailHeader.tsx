import Header from '../Header';
import Breadcrumb from '../Breadcrumb';
import PageTitle from '../PageTitle';
import TopSearch from '../TopSearch';
import TopAI from '../TopAI';
import Dropdown from '../Dropdown';
import OverviewSection from '../OverviewSection';

interface DetailHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbItems: Array<{ label: string; path?: string }>;
  metrics?: Array<{
    value: string | number;
    label: string;
    onClick?: () => void;
    tooltip?: {
      content: string;
      variant?: 'default' | 'dark' | 'light' | 'restricted' | 'info';
    };
    isExternal?: boolean;
  }>;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'ctaPrimary' | 'ctaSecondary';
    disabled?: boolean;
  }>;
  className?: string;
}

const DetailHeader = ({ 
  title, 
  subtitle,
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
    <div className="flex flex-col">
      {/* Top Header Row */}
      <Header className={className}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          <div className="flex items-center gap-3">
            <TopAI />
            <TopSearch />
            <Dropdown items={dropdownItems} />
          </div>
        </div>
      </Header>
      
      {/* Page Title & Overview Section */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex flex-col gap-4">
          <PageTitle 
            title={title} 
            subtitle={subtitle}
            variant="h1" 
          />
          
          {(metrics.length > 0 || actions.length > 0) && (
            <OverviewSection 
              metrics={metrics}
              actions={actions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;