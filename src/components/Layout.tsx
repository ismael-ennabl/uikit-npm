import { Outlet, useLocation, Link, useParams } from 'react-router-dom';
import { Book, Search, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AISearchInterface from '@/components/AISearchInterface';
import { TYPOGRAPHY } from '@/styles/tokens';
import { getPackageInfo } from '@/utils/packageNaming';
import Footer from './Footer';
const Layout = () => {
  const location = useLocation();
  const params = useParams();
  const isComparisonPage = location.pathname.startsWith('/comparison/');
  const isRootPage = location.pathname === '/';
  const isDocsLibraryPage = location.pathname === '/docs-library';
  const isDashboardPage = location.pathname === '/dashboard';
  if (isComparisonPage) {
    return <div className="min-h-screen bg-[#F5F8FD]">
        <header className="bg-[#F5F8FD]">
          <div className="max-w-[1200px] mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-0 text-gray-600 hover:text-gray-900 bg-[0000C5] bg-[#0000c5]/[0.04] font-light">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs">Docs Compare</span>
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-80">
                  <AISearchInterface />
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <h1 className={TYPOGRAPHY.h1}>
                {params.id ? getPackageInfo(params.id).name : 'Document Package'}
              </h1>
            </div>
          </div>
        </div>
        
        <main className="flex-1 max-w-[1200px] mx-auto pb-8">
          <Outlet />
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen bg-[#F5F8FD]">
      <header className="bg-[#F5F8FD]">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
              {isRootPage ? <Button variant="ghost" size="sm" className="flex items-center space-x-0 font-light cursor-default" style={{
              backgroundColor: '#EFF1F6',
              color: '#B6B7BB'
            }}>
                  <span className="text-xs">Discover</span>
                 </Button> : isDashboardPage || isDocsLibraryPage ? <Link to="/">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-0 text-gray-600 bg-[#0000c5]/[0.04] font-light hover:bg-[#0000c5]/[0.08]">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs">ennablDocs</span>
                  </Button>
                </Link> : <Link to="/">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-0 text-gray-600 hover:text-gray-900 bg-[#0000c5]/[0.04] font-light">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs">Compare Docs</span>
                  </Button>
                </Link>}
              
              <div className="w-80">
                <AISearchInterface />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {isRootPage && <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-2">
            <h1 className={TYPOGRAPHY.h1}>ennablDocs</h1>
          </div>
        </div>}
      
      {isDocsLibraryPage && <div className="max-w-[1200px] mx-auto px-8">
          <div className="mb-2">
            <h1 className={TYPOGRAPHY.h1}>Docs Library</h1>
          </div>
        </div>}
      
      <main className="flex-1 max-w-[1200px] mx-auto pb-8">
        <Outlet />
      </main>
      <Footer />
    </div>;
};
export default Layout;