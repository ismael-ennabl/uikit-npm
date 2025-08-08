import { useLocation, useParams, Outlet } from 'react-router-dom';
import Footer from './Footer';
import { getPackageInfo } from '@/utils/packageNaming';
import { RootHeader, DashboardHeader, DetailHeader } from './header';
import { useUsageStats } from '@/hooks/useUsageStats';
import { PAGE } from '@/styles/tokens';
const Layout = () => {
  const location = useLocation();
  const params = useParams();
  const { stats } = useUsageStats();

  // Handle comparison pages with special layout
  if (location.pathname.startsWith('/comparison/')) {
    const packageInfo = getPackageInfo(params.id || '');
    
    const breadcrumbItems = [
      { label: 'ennablDocs', path: '/' },
      { label: 'Compare Docs', path: '/dashboard' },
       { label: packageInfo.name }
    ];

    const metrics = [
      { value: '24', label: 'Documents', onClick: () => console.log('Documents clicked') },
      { value: '3', label: 'Issues found', onClick: () => console.log('Issues clicked') },
      { value: stats.documentsCompared, label: 'Compared', isExternal: true },
    ];

    const actions = [
      { label: 'Share Report', onClick: () => console.log('Share'), variant: 'ctaSecondary' as const },
      { label: 'Download PDF', onClick: () => console.log('Download'), variant: 'ctaPrimary' as const },
    ];
    
    return (
      <div className={PAGE.container}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-2 z-[100]">Skip to main content</a>
        <DetailHeader
           title={packageInfo.name}
          breadcrumbItems={breadcrumbItems}
          metrics={metrics}
          actions={actions}
        />
        
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  }

  // Dashboard pages
  if (location.pathname === '/dashboard') {
    const breadcrumbItems = [
      { label: 'ennablDocs', path: '/' },
      { label: 'Compare Docs' }
    ];
    
    return (
      <div className={PAGE.container}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-2 z-[100]">Skip to main content</a>
        <DashboardHeader 
          title="Compare Docs"
          breadcrumbItems={breadcrumbItems}
        />
        
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  }

  // Library pages
  if (location.pathname === '/docs-library') {
    const breadcrumbItems = [
      { label: 'ennablDocs', path: '/' },
      { label: 'Docs Library' }
    ];
    
    return (
      <div className={PAGE.container}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-2 z-[100]">Skip to main content</a>
        <DashboardHeader 
          title="Docs Library"
          breadcrumbItems={breadcrumbItems}
        />
        
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  }

  // Tables pages
  if (location.pathname === '/tables') {
    const breadcrumbItems = [
      { label: 'ennablDocs', path: '/' },
      { label: 'Tables' }
    ];
    
    return (
      <div className={PAGE.container}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-2 z-[100]">Skip to main content</a>
        <DashboardHeader 
          title="Tables"
          breadcrumbItems={breadcrumbItems}
        />
        
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  }

  // Package files pages
  if (location.pathname.startsWith('/package/')) {
    const packageInfo = getPackageInfo(params.id || '');
    const breadcrumbItems = [
      { label: 'ennablDocs', path: '/' },
      { label: 'Compare Docs', path: '/dashboard' },
      { label: packageInfo.name }
    ];
    
    return (
      <div className={PAGE.container}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-2 z-[100]">Skip to main content</a>
        <DashboardHeader 
          title={packageInfo.name}
          breadcrumbItems={breadcrumbItems}
        />
        
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  }

  // Root page layout
  return (
    <div className={PAGE.container}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-2 z-[100]">Skip to main content</a>
      <RootHeader />
      
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
export default Layout;