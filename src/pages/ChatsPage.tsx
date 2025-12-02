import { useState } from 'react';
import { Page, Chat } from '../App';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatsPageProps {
  onNavigate: (page: Page) => void;
}

const mockChats: Chat[] = [
  {
    id: 1,
    participants: ['TechStore'],
    lastMessage: 'Товар готов к передаче',
    status: 'online'
  },
  {
    id: 2,
    participants: ['GamerHub', 'Гарант Alex_Pro'],
    lastMessage: 'Проверяю аккаунт...',
    status: 'typing',
    isGuarantorChat: true
  },
  {
    id: 3,
    participants: ['GameDeals'],
    lastMessage: 'Спасибо за покупку!',
    status: 'offline'
  }
];

export default function ChatsPage({ onNavigate }: ChatsPageProps) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: string, time: string}>>([
    { id: 1, text: 'Здравствуйте! Интересует этот товар', sender: 'Вы', time: '14:30' },
    { id: 2, text: 'Добрый день! Товар в наличии', sender: 'TechStore', time: '14:31' },
    { id: 3, text: 'Товар готов к передаче', sender: 'TechStore', time: '14:35' }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: messages.length + 1,
      text: message,
      sender: 'Вы',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage('');
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
                <h1 className="text-2xl font-bold">Чаты</h1>
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
              <button onClick={() => onNavigate('chats')} className="text-primary font-medium">
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
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          <Card className="lg:col-span-1 border-border/50 bg-card/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-lg">Сообщения</h2>
              </div>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-2 p-2">
                  {mockChats.map((chat) => (
                    <Card
                      key={chat.id}
                      className={`cursor-pointer transition-all hover-glow ${
                        selectedChat?.id === chat.id ? 'border-primary bg-primary/10' : 'border-border/50'
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="border-2 border-primary">
                            <AvatarFallback className="gradient-gaming text-white font-bold">
                              {chat.participants[0][0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-semibold truncate">
                                {chat.participants.join(', ')}
                              </div>
                              {chat.isGuarantorChat && (
                                <Badge variant="outline" className="border-accent text-accent ml-2 text-xs">
                                  <Icon name="ShieldCheck" size={12} className="mr-1" />
                                  Гарант
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {chat.status === 'online' && (
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow"></div>
                              )}
                              {chat.status === 'typing' && (
                                <div className="text-primary text-sm font-medium">Печатает...</div>
                              )}
                              {chat.status === 'offline' && (
                                <div className="text-muted-foreground text-sm truncate">
                                  {chat.lastMessage}
                                </div>
                              )}
                              {chat.status === 'online' && (
                                <div className="text-muted-foreground text-sm truncate">
                                  {chat.lastMessage}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-border/50 bg-card/50 overflow-hidden flex flex-col">
            {selectedChat ? (
              <>
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-primary">
                      <AvatarFallback className="gradient-gaming text-white font-bold">
                        {selectedChat.participants[0][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{selectedChat.participants.join(', ')}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        {selectedChat.status === 'online' && (
                          <>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow"></div>
                            В сети
                          </>
                        )}
                        {selectedChat.status === 'typing' && (
                          <span className="text-primary">Печатает...</span>
                        )}
                        {selectedChat.status === 'offline' && 'Был(а) недавно'}
                      </div>
                    </div>
                  </div>
                  {selectedChat.isGuarantorChat && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Icon name="Check" size={16} className="mr-1" />
                        Завершить
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Icon name="X" size={16} className="mr-1" />
                        Отменить
                      </Button>
                    </div>
                  )}
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'Вы' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl p-3 ${
                            msg.sender === 'Вы'
                              ? 'gradient-gaming text-white'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="text-sm">{msg.text}</div>
                          <div className={`text-xs mt-1 ${
                            msg.sender === 'Вы' ? 'text-white/70' : 'text-muted-foreground'
                          }`}>
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите сообщение..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} className="gradient-gaming">
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-50" />
                  <p>Выберите чат для начала общения</p>
                </div>
              </div>
            )}
          </Card>
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
          <button onClick={() => onNavigate('chats')} className="flex flex-col items-center gap-1 text-primary">
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
