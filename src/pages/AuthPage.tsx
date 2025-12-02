import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { register, login, saveAuth, User } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
}

export default function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loginForm, setLoginForm] = useState({
    login: '',
    password: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await register(
        registerForm.username,
        registerForm.email,
        registerForm.password
      );
      
      saveAuth(response.token, response.user);
      
      toast({
        title: 'Успешно!',
        description: 'Регистрация прошла успешно',
      });
      
      onAuthSuccess(response.user);
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось зарегистрироваться',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      const response = await login(loginForm.login, loginForm.password);
      
      saveAuth(response.token, response.user);
      
      toast({
        title: 'Добро пожаловать!',
        description: `Вы вошли как ${response.user.username}`,
      });
      
      onAuthSuccess(response.user);
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Неверный логин или пароль',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
      
      <Card className="max-w-md w-full border-border/50 bg-card/95 backdrop-blur-sm relative z-10 animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-gaming flex items-center justify-center">
              <Icon name="Zap" size={32} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            <span className="gradient-gaming bg-clip-text text-transparent">GameMarket</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login">Логин или Email</Label>
                  <Input
                    id="login"
                    type="text"
                    placeholder="username или email@example.com"
                    value={loginForm.login}
                    onChange={(e) => setLoginForm({...loginForm, login: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="login-password">Пароль</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-gaming hover-glow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Вход...
                    </>
                  ) : (
                    <>
                      <Icon name="LogIn" size={20} className="mr-2" />
                      Войти
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="username"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-gaming hover-glow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Регистрация...
                    </>
                  ) : (
                    <>
                      <Icon name="UserPlus" size={20} className="mr-2" />
                      Зарегистрироваться
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
