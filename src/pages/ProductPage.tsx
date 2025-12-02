import { useState } from 'react';
import { Page, Product } from '../App';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface ProductPageProps {
  product: Product;
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

export default function ProductPage({ product, onNavigate, onBack }: ProductPageProps) {
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [showGuarantorDialog, setShowGuarantorDialog] = useState(false);

  const handleContactSeller = () => {
    setShowChatDialog(true);
  };

  const handleOrderWithGuarantor = () => {
    setShowGuarantorDialog(true);
  };

  const selectGuarantor = (guarantor: string) => {
    setShowGuarantorDialog(false);
    onNavigate('chats');
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-gaming flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold">Товар</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl neon-border">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-lg px-4 py-2">
                  {product.category}
                </Badge>
              </div>
            </div>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Store" size={20} />
                  Продавец
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-primary">
                      <AvatarFallback className="gradient-gaming text-white font-bold">
                        {product.seller[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{product.seller}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow"></div>
                        Был(а) в сети недавно
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={handleContactSeller}
                  >
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Написать
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className="text-4xl font-bold text-primary mb-6">
                {product.price} ₽
              </div>
            </div>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Описание</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                className="w-full gradient-gaming hover-glow text-lg py-6"
                onClick={handleOrderWithGuarantor}
              >
                <Icon name="ShieldCheck" size={24} className="mr-2" />
                Оформить заказ с гарантом
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white py-6"
                onClick={handleContactSeller}
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Связаться с продавцом
              </Button>
            </div>

            <Card className="border-accent/50 bg-accent/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="ShieldCheck" size={24} className="text-accent flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-accent mb-1">Безопасная сделка</div>
                    <p className="text-sm text-muted-foreground">
                      Гарант проверит товар перед передачей и обеспечит безопасность сделки для обеих сторон
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showGuarantorDialog && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="max-w-md w-full border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ShieldCheck" size={24} className="text-primary" />
                Выберите гаранта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Гарант #1 - Alex_Pro', 'Гарант #2 - SafeDeal', 'Гарант #3 - TrustGuard'].map((guarantor) => (
                <Card 
                  key={guarantor}
                  className="cursor-pointer hover-glow border-border/50"
                  onClick={() => selectGuarantor(guarantor)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-secondary">
                        <AvatarFallback className="bg-secondary text-white">
                          {guarantor[8]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{guarantor}</div>
                        <div className="text-sm text-muted-foreground">Сделок: 150+</div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
              
              <Separator />
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowGuarantorDialog(false)}
              >
                Отмена
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showChatDialog && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="max-w-md w-full border-border/50 bg-card">
            <CardHeader>
              <CardTitle>Начать диалог</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Вы хотите связаться с продавцом {product.seller}?
              </p>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 gradient-gaming"
                  onClick={() => {
                    setShowChatDialog(false);
                    onNavigate('chats');
                  }}
                >
                  Открыть чат
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowChatDialog(false)}
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
