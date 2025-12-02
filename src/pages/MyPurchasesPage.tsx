import { Page } from '../App';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MyPurchasesPageProps {
  onNavigate: (page: Page) => void;
}

const purchases = [
  {
    id: 1,
    title: 'Telegram Premium 12 месяцев',
    price: 1499,
    date: '15.11.2024',
    status: 'completed',
    seller: 'TechStore'
  },
  {
    id: 2,
    title: 'Steam Account (5+ игр)',
    price: 2999,
    date: '10.11.2024',
    status: 'in_progress',
    seller: 'GamerHub'
  }
];

export default function MyPurchasesPage({ onNavigate }: MyPurchasesPageProps) {
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
                <h1 className="text-2xl font-bold">Мои покупки</h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => onNavigate('home')} className="text-muted-foreground hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => onNavigate('catalog')} className="text-muted-foreground hover:text-primary transition-colors">
                Каталог
              </button>
              <button onClick={() => onNavigate('purchases')} className="text-primary font-medium">
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <Card key={purchase.id} className="border-border/50 bg-card/50 hover-glow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{purchase.title}</h3>
                      {purchase.status === 'completed' ? (
                        <Badge className="bg-green-600">Завершено</Badge>
                      ) : (
                        <Badge className="bg-primary">В процессе</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {purchase.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Store" size={14} />
                        {purchase.seller}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {purchase.price} ₽
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => onNavigate('chats')}
                    >
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      Чат
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {purchases.length === 0 && (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="py-12 text-center">
                <Icon name="ShoppingBag" size={64} className="mx-auto mb-4 opacity-50 text-muted-foreground" />
                <p className="text-muted-foreground text-lg mb-4">У вас пока нет покупок</p>
                <Button 
                  className="gradient-gaming"
                  onClick={() => onNavigate('catalog')}
                >
                  Перейти к каталогу
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around py-3">
          <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1 text-muted-foreground">
            <Icon name="Home" size={24} />
            <span className="text-xs">Главная</span>
          </button>
          <button onClick={() => onNavigate('catalog')} className="flex flex-col items-center gap-1 text-muted-foreground">
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
