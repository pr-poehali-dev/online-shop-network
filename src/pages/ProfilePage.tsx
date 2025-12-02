import { useState } from 'react';
import { Page } from '../App';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
  onAdminLogin: (username: string, password: string) => boolean;
}

export default function ProfilePage({ onNavigate, onAdminLogin }: ProfilePageProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  const handleAdminLoginSubmit = () => {
    const success = onAdminLogin(adminUsername, adminPassword);
    if (!success) {
      alert('Неверный логин или пароль');
    }
  };

  const handleSubmitProduct = () => {
    alert('Товар отправлен на проверку администратору');
    setShowAddProduct(false);
    setProductForm({
      title: '',
      price: '',
      category: '',
      image: '',
      description: ''
    });
  };

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
                <h1 className="text-2xl font-bold">Профиль</h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => onNavigate('home')} className="text-muted-foreground hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => onNavigate('catalog')} className="text-muted-foreground hover:text-primary transition-colors">
                Каталог
              </button>
              <button onClick={() => onNavigate('purchases')} className="text-muted-foreground hover:text-primary transition-colors">
                Мои покупки
              </button>
              <button onClick={() => onNavigate('chats')} className="text-muted-foreground hover:text-primary transition-colors">
                Чаты
              </button>
              <button onClick={() => onNavigate('profile')} className="text-primary font-medium">
                Профиль
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-border/50 bg-card/50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20 border-4 border-primary">
                <AvatarFallback className="gradient-gaming text-white text-2xl font-bold">
                  У
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">Пользователь</h2>
                <p className="text-muted-foreground">user@gamemarket.com</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border/50 bg-background/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">12</div>
                  <div className="text-sm text-muted-foreground">Продаж</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">8</div>
                  <div className="text-sm text-muted-foreground">Покупок</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-1">4.9</div>
                  <div className="text-sm text-muted-foreground">Рейтинг</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Button 
            className="gradient-gaming hover-glow h-20 text-lg"
            onClick={() => setShowAddProduct(true)}
          >
            <Icon name="Plus" size={24} className="mr-2" />
            Добавить товар
          </Button>
          <Button 
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-white h-20 text-lg"
            onClick={() => setShowAdminLogin(true)}
          >
            <Icon name="ShieldCheck" size={24} className="mr-2" />
            Админ-панель
          </Button>
        </div>

        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Мои товары</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
              <p>У вас пока нет добавленных товаров</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAddProduct && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in overflow-auto">
          <Card className="max-w-2xl w-full border-border/50 bg-card my-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Plus" size={24} className="text-primary" />
                Добавить товар
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Название товара</Label>
                <Input
                  id="title"
                  placeholder="Например: Steam Account"
                  value={productForm.title}
                  onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="price">Цена (₽)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="1000"
                  value={productForm.price}
                  onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="category">Категория</Label>
                <Select 
                  value={productForm.category}
                  onValueChange={(value) => setProductForm({...productForm, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Telegram">Telegram</SelectItem>
                    <SelectItem value="Steam">Steam</SelectItem>
                    <SelectItem value="Epic Games">Epic Games</SelectItem>
                    <SelectItem value="Другое">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="image">Изображение (URL)</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={productForm.image}
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  placeholder="Подробное описание товара..."
                  rows={4}
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 gradient-gaming"
                  onClick={handleSubmitProduct}
                >
                  Отправить на проверку
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddProduct(false)}
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="max-w-md w-full border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ShieldCheck" size={24} className="text-secondary" />
                Вход в админ-панель
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="admin-username">Логин</Label>
                <Input
                  id="admin-username"
                  placeholder="skzry"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="admin-password">Пароль</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 gradient-gaming"
                  onClick={handleAdminLoginSubmit}
                >
                  Войти
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAdminLogin(false)}
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
          <button onClick={() => onNavigate('profile')} className="flex flex-col items-center gap-1 text-primary">
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  );
}
