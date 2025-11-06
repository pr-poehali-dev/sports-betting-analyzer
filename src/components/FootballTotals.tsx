import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateFootballTotalsExcel } from '@/utils/excelExport';

const trendData = [
  { week: 'Неделя 1', avgGoals: 2.4, predicted: 2.5, accuracy: 68 },
  { week: 'Неделя 2', avgGoals: 2.8, predicted: 2.7, accuracy: 72 },
  { week: 'Неделя 3', avgGoals: 2.6, predicted: 2.6, accuracy: 78 },
  { week: 'Неделя 4', avgGoals: 3.1, predicted: 2.9, accuracy: 75 },
  { week: 'Неделя 5', avgGoals: 2.9, predicted: 3.0, accuracy: 81 },
  { week: 'Неделя 6', avgGoals: 2.7, predicted: 2.8, accuracy: 79 },
  { week: 'Неделя 7', avgGoals: 3.2, predicted: 3.1, accuracy: 85 },
];

const totalsPredictions = [
  {
    id: 1,
    match: 'Манчестер Сити - Арсенал',
    league: 'АПЛ',
    prediction: 'Больше 2.5',
    line: 2.5,
    predicted: 3.2,
    odds: 1.85,
    confidence: 82,
    factors: [
      'Средняя результативность Сити дома: 3.1 гола',
      'Арсенал пропускает в среднем 1.2 гола в гостях',
      'Последние 5 встреч: среднее 3.8 голов'
    ],
    valuebet: true
  },
  {
    id: 2,
    match: 'Реал Мадрид - Барселона',
    league: 'Ла Лига',
    prediction: 'Больше 3.0',
    line: 3.0,
    predicted: 3.5,
    odds: 1.92,
    confidence: 88,
    factors: [
      'Эль Класико всегда результативен',
      'Обе команды забили в 9 из 10 последних игр',
      'Слабая защита у обеих команд в этом сезоне'
    ],
    valuebet: true
  },
  {
    id: 3,
    match: 'Интер - Милан',
    league: 'Серия А',
    prediction: 'Больше 2.5',
    line: 2.5,
    predicted: 2.8,
    odds: 2.10,
    confidence: 75,
    factors: [
      'Дерби Милана всегда напряженное',
      'Обе команды в атакующей форме',
      'H2H: 2.6 голов в среднем'
    ],
    valuebet: false
  },
  {
    id: 4,
    match: 'Бавария - Боруссия Дортмунд',
    league: 'Бундеслига',
    prediction: 'Больше 3.5',
    line: 3.5,
    predicted: 4.1,
    odds: 1.78,
    confidence: 91,
    factors: [
      'Бавария забивает в среднем 3.5 дома',
      'Дортмунд атакующая команда',
      'Дер Классикер всегда результативен: 4.5 среднее'
    ],
    valuebet: true
  }
];

const FootballTotals = () => {
  const [notifications, setNotifications] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Target" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">ИИ Прогнозы тоталов</h3>
              <p className="text-sm text-muted-foreground">Машинное обучение на основе 50,000+ матчей</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={generateFootballTotalsExcel}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Icon name="Download" size={16} />
              Скачать Excel
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Уведомления</span>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Точность модели</p>
            <p className="text-3xl font-bold text-primary">79.2%</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Проанализировано</p>
            <p className="text-3xl font-bold text-secondary">52,847</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Value Bets</p>
            <p className="text-3xl font-bold text-accent">12</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          Тренд точности прогнозов
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="avgGoals" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              name="Реальные голы"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="hsl(var(--secondary))" 
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Прогноз"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {totalsPredictions.map((pred) => (
          <Card key={pred.id} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{pred.league}</Badge>
                  {pred.valuebet && (
                    <Badge className="bg-accent hover:bg-accent/80">
                      <Icon name="TrendingUp" size={12} className="mr-1" />
                      Value Bet
                    </Badge>
                  )}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{pred.match}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Target" size={14} />
                  <span>{pred.prediction}</span>
                </div>
              </div>

              <div className="lg:w-1/3 lg:border-l lg:border-r border-border lg:px-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Линия</p>
                    <p className="text-2xl font-bold text-foreground">{pred.line}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Прогноз</p>
                    <p className="text-2xl font-bold text-primary">{pred.predicted}</p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Коэффициент</p>
                    <p className="text-2xl font-bold text-secondary">{pred.odds}</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Уверенность</p>
                    <p className="text-2xl font-bold text-accent">{pred.confidence}%</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 flex flex-col justify-between">
                <div>
                  <h5 className="text-sm font-semibold text-muted-foreground mb-3">Ключевые факторы</h5>
                  <ul className="space-y-2">
                    {pred.factors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                        <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFavorite(pred.id)}
                    className={favorites.includes(pred.id) ? 'text-yellow-500' : ''}
                  >
                    <Icon name="Star" size={18} fill={favorites.includes(pred.id) ? 'currentColor' : 'none'} />
                  </Button>
                  <Button className="flex-1">
                    <Icon name="ExternalLink" size={16} />
                    Поставить
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FootballTotals;