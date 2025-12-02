import { useState } from 'react';
import { Page, Product } from '../App';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CatalogPageProps {
  onNavigate: (page: Page) => void;
  onProductClick: (product: Product) => void;
}

const categories = ['Все', 'Telegram', 'Steam', 'Epic Games', 'Другое'];

const allProducts: Product[] = [
  {
    id: 1,
    title: 'Telegram Premium 12 месяцев',
    price: 1499,
    category: 'Telegram',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop',
    seller: 'TechStore',
    description: 'Telegram Premium подписка на 12 месяцев.'
  },
  {
    id: 2,
    title: 'Steam Account (5+ игр)',
    price: 2999,
    category: 'Steam',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
    seller: 'GamerHub',
    description: 'Steam аккаунт с играми.'
  },
  {
    id: 3,
    title: 'Epic Games | GTA V + Fortnite',
    price: 899,
    category: 'Epic Games',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    seller: 'GameDeals',
    description: 'Epic Games аккаунт с GTA V.'
  },
  {
    id: 4,
    title: 'Discord Nitro 1 месяц',
    price: 599,
    category: 'Другое',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop',
    seller: 'DigitalShop',
    description: 'Discord Nitro подписка.'
  }
];

export default function CatalogPage({ onNavigate, onProductClick }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredProducts = selectedCategory === 'Все' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate('home')}
                className="md:hidden"
              >
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg gradient-gaming flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold gradient-gaming bg-clip-text text-transparent">
                  Каталог
                </h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => onNavigate('home')} className="text-muted-foreground hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => onNavigate('catalog')} className="text-primary font-medium">
                Каталог
              </button>
              <button onClick={() => onNavigate('purchases')} className="text-muted-foreground hover:text-primary transition-colors">
                Мои покупки
              </button>
              <button onClick={() => onNavigate('chats')} className="text-muted-foreground hover:text-primary transition-colors">
                Чаты
              </button>
              <button onClick={() => onNavigate('profile')} className="text-muted-foreground hover:text-primary transition-colors">
                Профиль
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex gap-2 h-auto bg-transparent">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="data-[state=active]:gradient-gaming data-[state=active]:text-white border border-border"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="group hover-glow cursor-pointer overflow-hidden border-border/50 bg-card/50"
              onClick={() => onProductClick(product)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary/90">
                    {product.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {product.price} ₽
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Icon name="Store" size={14} />
                      {product.seller}
                    </div>
                  </div>
                  
                  <Button size="sm" className="gradient-gaming">
                    <Icon name="ShoppingCart" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around py-3">
          <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1 text-muted-foreground">
            <Icon name="Home" size={24} />
            <span className="text-xs">Главная</span>
          </button>
          <button onClick={() => onNavigate('catalog')} className="flex flex-col items-center gap-1 text-primary">
            <Icon name="Grid3x3" size={24} />
            <span className="text-xs">Каталог</span>
          </button>
          <button onClick={() => onNavigate('chats')} className="flex flex-col items-center gap-1 text-muted-foreground">
            <Icon name="MessageCircle" size={24} />
            <span className="text-xs">Чаты</span>
          </button>
          <button onClick={() => onNavigate('profile')} className="flex flex-col items-center gap-1 text-muted-foreground">
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  );
}
