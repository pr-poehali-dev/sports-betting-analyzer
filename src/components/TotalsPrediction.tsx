import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    homeTeam: 'Лейкерс',
    awayTeam: 'Вориорз',
    date: '2024-11-05',
    time: '22:00',
    predictedTotal: 224.5,
    bookmakerLine: 221.5,
    confidence: 78,
    trend: 'over',
    factors: ['Высокий темп', 'Слабая защита', 'Серия тоталов больше']
  },
  {
    id: 2,
    homeTeam: 'Селтикс',
    awayTeam: 'Хит',
    date: '2024-11-06',
    time: '01:00',
    predictedTotal: 208.5,
    bookmakerLine: 212.5,
    confidence: 65,
    trend: 'under',
    factors: ['Сильная защита', 'Низкий темп', 'Травмы ключевых игроков']
  },
  {
    id: 3,
    homeTeam: 'Мэверикс',
    awayTeam: 'Санс',
    date: '2024-11-06',
    time: '02:30',
    predictedTotal: 232.5,
    bookmakerLine: 228.5,
    confidence: 82,
    trend: 'over',
    factors: ['Очень высокий темп', 'Атакующие лидеры', 'История встреч']
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

      <div className="flex flex-col md:flex-row gap-4">
        <Select value={selectedGame} onValueChange={setSelectedGame}>
          <SelectTrigger className="w-full md:w-64 bg-input border-border">
            <SelectValue placeholder="Матч" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все матчи</SelectItem>
            <SelectItem value="today">Сегодня</SelectItem>
            <SelectItem value="tomorrow">Завтра</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {upcomingGames.map((game) => (
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
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Ключевые факторы:</p>
                  {game.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={14} className="text-primary" />
                      <span className="text-sm text-foreground">{factor}</span>
                    </div>
                  ))}
                </div>
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
