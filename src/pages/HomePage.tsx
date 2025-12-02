import { Page, Product } from '../App';
import { User } from '@/lib/api';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onProductClick: (product: Product) => void;
  currentUser: User;
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Telegram Premium 12 месяцев',
    price: 1499,
    category: 'Telegram',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop',
    seller: 'TechStore',
    description: 'Telegram Premium подписка на 12 месяцев. Мгновенная активация после оплаты.'
  },
  {
    id: 2,
    title: 'Steam Account (5+ игр)',
    price: 2999,
    category: 'Steam',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
    seller: 'GamerHub',
    description: 'Steam аккаунт с 5+ играми. Полный доступ, смена почты гарантирована.'
  },
  {
    id: 3,
    title: 'Epic Games | GTA V + Fortnite Bundle',
    price: 899,
    category: 'Epic Games',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    seller: 'GameDeals',
    description: 'Epic Games аккаунт с GTA V и скинами Fortnite на сумму 5000+ V-Bucks.'
  },
  {
    id: 4,
    title: 'Discord Nitro 1 месяц',
    price: 599,
    category: 'Другое',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop',
    seller: 'DigitalShop',
    description: 'Discord Nitro подписка на 1 месяц. Все преимущества Nitro для вашего сервера.'
  },
  {
    id: 5,
    title: 'CS:GO Prime Status',
    price: 1199,
    category: 'Steam',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    seller: 'ProGaming',
    description: 'CS:GO Prime Status аккаунт. Готов к рейтингу, полная смена данных.'
  },
  {
    id: 6,
    title: 'Spotify Premium 12 месяцев',
    price: 1799,
    category: 'Другое',
    image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=400&h=300&fit=crop',
    seller: 'MusicHub',
    description: 'Spotify Premium на год. Слушайте музыку без рекламы и офлайн.'
  }
];

export default function HomePage({ onNavigate, onProductClick, currentUser }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-gaming flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-gaming bg-clip-text text-transparent">
                GameMarket
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('home')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Главная
              </button>
              <button 
                onClick={() => onNavigate('catalog')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Каталог
              </button>
              <button 
                onClick={() => onNavigate('purchases')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Мои покупки
              </button>
              <button 
                onClick={() => onNavigate('chats')}
                className="text-foreground hover:text-primary transition-colors font-medium relative"
              >
                Чаты
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse-glow"></span>
              </button>
              <button 
                onClick={() => onNavigate('profile')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Профиль
              </button>
            </div>

            <Button 
              onClick={() => onNavigate('profile')}
              className="gradient-gaming hover-glow"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Продать товар
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Торговая площадка
            <span className="gradient-gaming bg-clip-text text-transparent"> игровых товаров</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Безопасные сделки с системой гарантов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="group hover-glow cursor-pointer overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm"
              onClick={() => onProductClick(product)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary/90 text-primary-foreground">
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
                  
                  <Button 
                    size="sm" 
                    className="gradient-gaming"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick(product);
                    }}
                  >
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
          <button 
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-1 text-primary"
          >
            <Icon name="Home" size={24} />
            <span className="text-xs">Главная</span>
          </button>
          <button 
            onClick={() => onNavigate('catalog')}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <Icon name="Grid3x3" size={24} />
            <span className="text-xs">Каталог</span>
          </button>
          <button 
            onClick={() => onNavigate('chats')}
            className="flex flex-col items-center gap-1 text-muted-foreground relative"
          >
            <Icon name="MessageCircle" size={24} />
            <span className="text-xs">Чаты</span>
            <span className="absolute top-0 right-3 w-2 h-2 bg-accent rounded-full"></span>
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  );
}