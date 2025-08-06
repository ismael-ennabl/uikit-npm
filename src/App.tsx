
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedApp from "@/components/auth/ProtectedApp";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import DocumentComparison from "./pages/DocumentComparison";
import PackageFiles from "./pages/PackageFiles";
import Documents from "./pages/Documents";
import AllDocuments from "./pages/AllDocuments";
import Tables from "./pages/Tables";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ProtectedApp>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Documents />} />
                <Route path="docs-library" element={<AllDocuments />} />
                <Route path="dashboard" element={<Index />} />
                <Route path="tables" element={<Tables />} />
                <Route path="comparison/:id" element={<DocumentComparison />} />
                <Route path="package/:id/files" element={<PackageFiles />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProtectedApp>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
