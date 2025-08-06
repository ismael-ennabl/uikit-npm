import Header from '../Header';
import Breadcrumb from '../Breadcrumb';
import PageTitle from '../PageTitle';
import TopSearch from '../TopSearch';
import TopAI from '../TopAI';
import Dropdown from '../Dropdown';

interface DashboardHeaderProps {
  title: string;
  breadcrumbItems?: Array<{ label: string; path?: string }>;
  className?: string;
}

const DashboardHeader = ({ title, breadcrumbItems = [], className }: DashboardHeaderProps) => {
  const dropdownItems = [
    { label: 'Settings', onClick: () => console.log('Settings') },
    { label: 'Help', onClick: () => console.log('Help') },
    { label: 'Sign out', onClick: () => console.log('Sign out') },
  ];

  const hasNonRootBreadcrumb = breadcrumbItems.length > 0 && 
    breadcrumbItems.some(item => item.label !== 'ennablDocs');

  return (
    <Header className={className}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {hasNonRootBreadcrumb ? (
            <Breadcrumb items={breadcrumbItems} />
          ) : (
            <PageTitle title={title} variant="h2" />
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <TopAI />
          <TopSearch />
          <Dropdown items={dropdownItems} />
        </div>
      </div>
    </Header>
  );
};

export default DashboardHeader;