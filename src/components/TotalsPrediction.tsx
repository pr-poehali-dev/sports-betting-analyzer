import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const trendData = [
  { date: '01.10', actual: 218, predicted: 215, line: 216 },
  { date: '08.10', actual: 222, predicted: 220, line: 217 },
  { date: '15.10', actual: 215, predicted: 218, line: 218 },
  { date: '22.10', actual: 225, predicted: 223, line: 219 },
  { date: '29.10', actual: 220, predicted: 221, line: 220 },
  { date: '05.11', actual: null, predicted: 224, line: 221 },
  { date: '12.11', actual: null, predicted: 226, line: 222 },
];

const upcomingGames = [
  {
    id: 1,
    homeTeam: 'Бруклин Нетс',
    awayTeam: 'Мемфис Гриззлис',
    date: '2025-10-22',
    time: '19:30',
    predictedTotal: 227.5,
    bookmakerLine: 225.5,
    confidence: 76,
    trend: 'over',
    factors: ['Высокий темп обеих команд', 'Слабая защита Бруклина', 'Моран в отличной форме']
  },
  {
    id: 2,
    homeTeam: 'Майами Хит',
    awayTeam: 'Атланта Хокс',
    date: '2025-10-22',
    time: '20:00',
    predictedTotal: 219.5,
    bookmakerLine: 221.0,
    confidence: 68,
    trend: 'under',
    factors: ['Майами играет от защиты', 'Янг травмирован', 'Низкий темп последних встреч']
  },
  {
    id: 3,
    homeTeam: 'Лос-Анджелес Лейкерс',
    awayTeam: 'Кливленд Кавальерс',
    date: '2025-10-22',
    time: '22:00',
    predictedTotal: 233.5,
    bookmakerLine: 229.5,
    confidence: 81,
    trend: 'over',
    factors: ['Леброн vs бывшая команда', 'Отличные атаки обеих', 'Серия результативных игр']
  },
  {
    id: 4,
    homeTeam: 'Голден Стэйт Вориорз',
    awayTeam: 'Денвер Наггетс',
    date: '2025-10-22',
    time: '22:30',
    predictedTotal: 238.5,
    bookmakerLine: 236.0,
    confidence: 85,
    trend: 'over',
    factors: ['Топ-1 по темпу лиги', 'Йокич + Карри = шоу', 'Слабые скамейки защиты']
  },
  {
    id: 5,
    homeTeam: 'Даллас Мэверикс',
    awayTeam: 'Юта Джаз',
    date: '2025-10-22',
    time: '21:00',
    predictedTotal: 224.0,
    bookmakerLine: 226.5,
    confidence: 72,
    trend: 'under',
    factors: ['Юта играет медленно', 'Даллас без Ирвинга', 'История низких тоталов']
  },
  {
    id: 6,
    homeTeam: 'Финикс Санс',
    awayTeam: 'Сакраменто Кингз',
    date: '2025-10-22',
    time: '23:00',
    predictedTotal: 241.5,
    bookmakerLine: 238.5,
    confidence: 88,
    trend: 'over',
    factors: ['Оба топ-3 по темпу', 'Дюрант в огне', 'Защиты проваливаются']
  },
];

const confidenceData = [
  { range: '0-20%', count: 5 },
  { range: '20-40%', count: 12 },
  { range: '40-60%', count: 28 },
  { range: '60-80%', count: 35 },
  { range: '80-100%', count: 20 },
];

const TotalsPrediction = () => {
  const [selectedGame, setSelectedGame] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [notifications, setNotifications] = useState(false);

  const toggleFavorite = (gameId: number) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(gameId);
      if (isFavorite) {
        toast.success('Прогноз удален из избранного');
        return prev.filter(id => id !== gameId);
      } else {
        toast.success('Прогноз добавлен в избранное');
        return [...prev, gameId];
      }
    });
  };

  const handleNotificationToggle = (checked: boolean) => {
    setNotifications(checked);
    if (checked) {
      toast.success('Уведомления включены! Вы будете получать прогнозы на новые матчи');
    } else {
      toast.info('Уведомления отключены');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="Sparkles" size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">ИИ Прогнозирование</h3>
            <p className="text-sm text-muted-foreground">Анализ трендов и статистики для точных прогнозов</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Точность модели</p>
            <p className="text-3xl font-bold text-primary">73.2%</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Проанализировано игр</p>
            <p className="text-3xl font-bold text-secondary">2,847</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">ROI за сезон</p>
            <p className="text-3xl font-bold text-accent">+12.4%</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-full md:w-64 bg-input border-border">
              <SelectValue placeholder="Матч" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все матчи</SelectItem>
              <SelectItem value="favorites">Избранное ({favorites.length})</SelectItem>
              <SelectItem value="today">Сегодня</SelectItem>
              <SelectItem value="tomorrow">Завтра</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <Icon name="Bell" size={20} className={notifications ? 'text-primary' : 'text-muted-foreground'} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Уведомления</span>
              <span className="text-xs text-muted-foreground">О новых прогнозах</span>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={handleNotificationToggle}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {upcomingGames
          .filter(game => {
            if (selectedGame === 'favorites') return favorites.includes(game.id);
            if (selectedGame === 'today') return game.date === '2025-10-22';
            if (selectedGame === 'tomorrow') return game.date === '2025-10-23';
            return true;
          })
          .map((game) => (
          <Card key={game.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{game.date} • {game.time}</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    game.trend === 'over' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-accent/20 text-accent'
                  }`}>
                    {game.trend === 'over' ? 'БОЛЬШЕ' : 'МЕНЬШЕ'}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Icon name="Home" size={20} className="text-foreground" />
                    </div>
                    <span className="text-lg font-bold text-foreground">{game.homeTeam}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Icon name="Plane" size={20} className="text-foreground" />
                    </div>
                    <span className="text-lg font-bold text-foreground">{game.awayTeam}</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/5 flex items-center justify-center border-l border-r border-border px-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Прогноз тотала</p>
                  <p className="text-4xl font-bold text-primary mb-1">{game.predictedTotal}</p>
                  <p className="text-xs text-muted-foreground">Линия: {game.bookmakerLine}</p>
                  <div className="mt-2">
                    <span className={`text-sm font-medium ${
                      game.predictedTotal > game.bookmakerLine ? 'text-primary' : 'text-accent'
                    }`}>
                      {game.predictedTotal > game.bookmakerLine ? '▲' : '▼'} {Math.abs(game.predictedTotal - game.bookmakerLine).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/5">
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Уверенность</span>
                    <span className="text-lg font-bold text-foreground">{game.confidence}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        game.confidence >= 70 ? 'bg-primary' : 'bg-secondary'
                      }`}
                      style={{ width: `${game.confidence}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-medium text-muted-foreground">Ключевые факторы:</p>
                  {game.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={14} className="text-primary" />
                      <span className="text-sm text-foreground">{factor}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => toggleFavorite(game.id)}
                  variant={favorites.includes(game.id) ? "default" : "outline"}
                  className="w-full gap-2"
                >
                  <Icon 
                    name={favorites.includes(game.id) ? "Star" : "StarOff"} 
                    size={16} 
                  />
                  {favorites.includes(game.id) ? 'В избранном' : 'Добавить в избранное'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            Тренд прогнозов vs. факт
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={3} name="Факт" />
              <Line type="monotone" dataKey="predicted" stroke="hsl(var(--secondary))" strokeWidth={3} name="Прогноз" />
              <Line type="monotone" dataKey="line" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 5" name="Линия БК" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-secondary" />
            Распределение уверенности
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.6} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={24} className="text-secondary" />
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Как работает прогнозирование?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Наша модель анализирует более 50 параметров для каждого матча: статистику команд за последние игры, 
              форму игроков, историю личных встреч, темп игры, эффективность атаки и защиты, влияние домашней площадки, 
              травмы и усталость. Алгоритм машинного обучения обучен на данных за последние 5 сезонов и постоянно 
              обновляется с учетом новых результатов.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TotalsPrediction;