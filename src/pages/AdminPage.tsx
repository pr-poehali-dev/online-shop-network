import { useState } from 'react';
import { Page } from '../App';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminPageProps {
  onNavigate: (page: Page) => void;
}

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const [showAddGuarantor, setShowAddGuarantor] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const pendingProducts = [
    {
      id: 1,
      title: 'Steam Account Premium',
      seller: 'NewSeller',
      price: 3500,
      category: 'Steam'
    }
  ];

  const guarantors = ['Alex_Pro', 'SafeDeal', 'TrustGuard'];
  const categories = ['Telegram', 'Steam', 'Epic Games', 'Другое'];

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
              >
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon name="ShieldCheck" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold">Админ-панель</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
            <TabsTrigger value="products" className="data-[state=active]:gradient-gaming data-[state=active]:text-white">
              <Icon name="Package" size={18} className="mr-2" />
              Товары на проверке
            </TabsTrigger>
            <TabsTrigger value="guarantors" className="data-[state=active]:gradient-gaming data-[state=active]:text-white">
              <Icon name="Shield" size={18} className="mr-2" />
              Гаранты
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:gradient-gaming data-[state=active]:text-white">
              <Icon name="Grid3x3" size={18} className="mr-2" />
              Категории
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Товары на модерации</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingProducts.length > 0 ? (
                  <div className="space-y-4">
                    {pendingProducts.map((product) => (
                      <Card key={product.id} className="border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">{product.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Icon name="User" size={14} />
                                  {product.seller}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="DollarSign" size={14} />
                                  {product.price} ₽
                                </span>
                                <Badge variant="outline">{product.category}</Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => alert('Товар одобрен')}
                              >
                                <Icon name="Check" size={16} className="mr-1" />
                                Одобрить
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => alert('Товар отклонён')}
                              >
                                <Icon name="X" size={16} className="mr-1" />
                                Отклонить
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Нет товаров на проверке</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guarantors">
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Список гарантов</CardTitle>
                <Button 
                  className="gradient-gaming"
                  onClick={() => setShowAddGuarantor(true)}
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить гаранта
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {guarantors.map((guarantor, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                            {guarantor[0]}
                          </div>
                          <div>
                            <div className="font-semibold">{guarantor}</div>
                            <div className="text-sm text-muted-foreground">Сделок: 150+</div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => alert(`Гарант ${guarantor} удалён`)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Категории товаров</CardTitle>
                <Button 
                  className="gradient-gaming"
                  onClick={() => setShowAddCategory(true)}
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить категорию
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="font-semibold mb-2">{category}</div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full"
                          onClick={() => alert(`Категория ${category} удалена`)}
                        >
                          <Icon name="Trash2" size={14} className="mr-1" />
                          Удалить
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {showAddGuarantor && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="max-w-md w-full border-border/50 bg-card">
            <CardHeader>
              <CardTitle>Добавить гаранта</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="guarantor-name">Имя гаранта</Label>
                <Input id="guarantor-name" placeholder="Введите имя" />
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 gradient-gaming"
                  onClick={() => {
                    alert('Гарант добавлен');
                    setShowAddGuarantor(false);
                  }}
                >
                  Добавить
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddGuarantor(false)}
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAddCategory && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="max-w-md w-full border-border/50 bg-card">
            <CardHeader>
              <CardTitle>Добавить категорию</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category-name">Название категории</Label>
                <Input id="category-name" placeholder="Введите название" />
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 gradient-gaming"
                  onClick={() => {
                    alert('Категория добавлена');
                    setShowAddCategory(false);
                  }}
                >
                  Добавить
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddCategory(false)}
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
