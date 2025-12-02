import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ChatsPage from './pages/ChatsPage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import MyPurchasesPage from './pages/MyPurchasesPage';

export type Page = 'home' | 'catalog' | 'purchases' | 'chats' | 'profile' | 'product' | 'admin';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  seller: string;
  description: string;
}

export interface Chat {
  id: number;
  participants: string[];
  lastMessage: string;
  status: 'online' | 'typing' | 'offline';
  isGuarantorChat?: boolean;
}

const queryClient = new QueryClient();

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const handleAdminLogin = (username: string, password: string) => {
    if (username === 'skzry' && password === '568876Qqq') {
      setIsAdmin(true);
      setCurrentPage('admin');
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 'home' && (
        <HomePage 
          onNavigate={navigateToPage} 
          onProductClick={navigateToProduct}
        />
      )}
      {currentPage === 'catalog' && (
        <CatalogPage 
          onNavigate={navigateToPage}
          onProductClick={navigateToProduct}
        />
      )}
      {currentPage === 'purchases' && (
        <MyPurchasesPage onNavigate={navigateToPage} />
      )}
      {currentPage === 'chats' && (
        <ChatsPage onNavigate={navigateToPage} />
      )}
      {currentPage === 'profile' && (
        <ProfilePage 
          onNavigate={navigateToPage}
          onAdminLogin={handleAdminLogin}
        />
      )}
      {currentPage === 'product' && selectedProduct && (
        <ProductPage 
          product={selectedProduct}
          onNavigate={navigateToPage}
          onBack={() => setCurrentPage('home')}
        />
      )}
      {currentPage === 'admin' && isAdmin && (
        <AdminPage onNavigate={navigateToPage} />
      )}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;