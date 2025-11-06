import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const cardsMatchesData = [
  {
    id: 1,
    league: 'РПЛ',
    homeTeam: 'Зенит',
    awayTeam: 'Локомотив',
    date: '2025-11-02',
    time: '16:30',
    referee: 'Иванов В.',
    refereeAvgYellow: 4.8,
    refereeAvgRed: 0.3,
    predictedYellow: 5.2,
    predictedRed: 0.4,
    yellowOver35: 76,
    yellowOver45: 68,
    redOver05: 71,
    homeYellowAvg: 2.4,
    awayYellowAvg: 2.8,
    homeRedAvg: 0.2,
    awayRedAvg: 0.2,
    h2hYellowAvg: 5.6,
    h2hRedAvg: 0.4,
    matchType: 'derby',
    confidence: 76
  },
  {
    id: 2,
    league: 'АПЛ',
    homeTeam: 'Манчестер Юнайтед',
    awayTeam: 'Ливерпуль',
    date: '2025-11-02',
    time: '17:30',
    referee: 'Тейлор А.',
    refereeAvgYellow: 5.2,
    refereeAvgRed: 0.4,
    predictedYellow: 6.1,
    predictedRed: 0.5,
    yellowOver35: 82,
    yellowOver45: 75,
    redOver05: 78,
    homeYellowAvg: 2.8,
    awayYellowAvg: 3.3,
    homeRedAvg: 0.3,
    awayRedAvg: 0.2,
    h2hYellowAvg: 6.4,
    h2hRedAvg: 0.6,
    matchType: 'rival',
    confidence: 82
  },
  {
    id: 3,
    league: 'Ла Лига',
    homeTeam: 'Реал Мадрид',
    awayTeam: 'Барселона',
    date: '2025-11-02',
    time: '20:00',
    referee: 'Матеу Лаос',
    refereeAvgYellow: 6.1,
    refereeAvgRed: 0.5,
    predictedYellow: 7.2,
    predictedRed: 0.6,
    yellowOver35: 91,
    yellowOver45: 88,
    redOver05: 85,
    homeYellowAvg: 3.2,
    awayYellowAvg: 3.9,
    homeRedAvg: 0.3,
    awayRedAvg: 0.3,
    h2hYellowAvg: 7.8,
    h2hRedAvg: 0.7,
    matchType: 'clasico',
    confidence: 91
  },
  {
    id: 4,
    league: 'Серия А',
    homeTeam: 'Интер',
    awayTeam: 'Милан',
    date: '2025-11-02',
    time: '19:45',
    referee: 'Орсато Д.',
    refereeAvgYellow: 5.5,
    refereeAvgRed: 0.4,
    predictedYellow: 5.8,
    predictedRed: 0.5,
    yellowOver35: 79,
    yellowOver45: 71,
    redOver05: 76,
    homeYellowAvg: 2.6,
    awayYellowAvg: 3.2,
    homeRedAvg: 0.2,
    awayRedAvg: 0.3,
    h2hYellowAvg: 6.1,
    h2hRedAvg: 0.5,
    matchType: 'derby',
    confidence: 79
  },
  {
    id: 5,
    league: 'Бундеслига',
    homeTeam: 'Боруссия Д',
    awayTeam: 'Шальке',
    date: '2025-11-02',
    time: '18:30',
    referee: 'Цвайер Ф.',
    refereeAvgYellow: 5.8,
    refereeAvgRed: 0.3,
    predictedYellow: 6.5,
    predictedRed: 0.4,
    yellowOver35: 84,
    yellowOver45: 77,
    redOver05: 73,
    homeYellowAvg: 3.0,
    awayYellowAvg: 3.5,
    homeRedAvg: 0.2,
    awayRedAvg: 0.2,
    h2hYellowAvg: 6.8,
    h2hRedAvg: 0.5,
    matchType: 'derby',
    confidence: 84
  },
  {
    id: 6,
    league: 'Лига 1',
    homeTeam: 'Марсель',
    awayTeam: 'ПСЖ',
    date: '2025-11-02',
    time: '21:00',
    referee: 'Бастьен Ф.',
    refereeAvgYellow: 5.4,
    refereeAvgRed: 0.4,
    predictedYellow: 5.9,
    predictedRed: 0.5,
    yellowOver35: 80,
    yellowOver45: 72,
    redOver05: 77,
    homeYellowAvg: 2.9,
    awayYellowAvg: 3.0,
    homeRedAvg: 0.3,
    awayRedAvg: 0.2,
    h2hYellowAvg: 6.2,
    h2hRedAvg: 0.5,
    matchType: 'rival',
    confidence: 80
  }
];

const refereeStatsData = [
  { name: 'Матеу Лаос', yellow: 6.1, red: 0.5 },
  { name: 'Цвайер Ф.', yellow: 5.8, red: 0.3 },
  { name: 'Орсато Д.', yellow: 5.5, red: 0.4 },
  { name: 'Бастьен Ф.', yellow: 5.4, red: 0.4 },
  { name: 'Тейлор А.', yellow: 5.2, red: 0.4 },
];

const cardsTrendData = [
  { week: 'Неделя 1', yellow: 4.2, predicted: 4.5 },
  { week: 'Неделя 2', yellow: 4.8, predicted: 4.7 },
  { week: 'Неделя 3', yellow: 5.1, predicted: 5.0 },
  { week: 'Неделя 4', yellow: 4.6, predicted: 4.8 },
  { week: 'Неделя 5', yellow: 5.3, predicted: 5.2 },
  { week: 'Неделя 6', yellow: 4.9, predicted: 4.9 },
  { week: 'Неделя 7', yellow: 5.5, predicted: 5.4 },
];

const FootballCards = () => {
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [minConfidence, setMinConfidence] = useState('65');
  const [onlyValueBets, setOnlyValueBets] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredMatches = cardsMatchesData.filter(match => 
    match.confidence >= parseInt(minConfidence)
  );

  const getMatchTypeColor = (type: string) => {
    switch(type) {
      case 'clasico': return 'bg-red-500';
      case 'derby': return 'bg-orange-500';
      case 'rival': return 'bg-yellow-500';
      default: return 'bg-muted';
    }
  };

  const getMatchTypeLabel = (type: string) => {
    switch(type) {
      case 'clasico': return 'Класико';
      case 'derby': return 'Дерби';
      case 'rival': return 'Принципиальный';
      default: return 'Обычный';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-red-500/10 border-yellow-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mx-0">Анализ карточек</h3>
              <p className="text-sm text-muted-foreground">ИИ прогнозы желтых и красных карточек</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Только Value</span>
            <Switch checked={onlyValueBets} onCheckedChange={setOnlyValueBets} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Точность ЖК</p>
            <p className="text-3xl font-bold text-yellow-600">81.3%</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Точность КК</p>
            <p className="text-3xl font-bold text-red-600">74.8%</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Матчей</p>
            <p className="text-3xl font-bold text-primary">38,492</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Прогнозов 65%+</p>
            <p className="text-3xl font-bold text-accent">{filteredMatches.length}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-yellow-600" />
            Тренд желтых карточек
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cardsTrendData}>
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
                dataKey="yellow" 
                stroke="#eab308" 
                strokeWidth={3}
                name="Реальные"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#f97316" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Прогноз"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="User" size={20} className="text-red-600" />
            Топ судей по карточкам
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={refereeStatsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="yellow" fill="#eab308" radius={[0, 8, 8, 0]} name="ЖК" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Select value={selectedLeague} onValueChange={setSelectedLeague}>
          <SelectTrigger className="w-full md:w-48 bg-input border-border">
            <SelectValue placeholder="Лига" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все лиги</SelectItem>
            <SelectItem value="rpl">РПЛ</SelectItem>
            <SelectItem value="epl">АПЛ</SelectItem>
            <SelectItem value="laliga">Ла Лига</SelectItem>
            <SelectItem value="seriea">Серия А</SelectItem>
            <SelectItem value="bundesliga">Бундеслига</SelectItem>
            <SelectItem value="ligue1">Лига 1</SelectItem>
          </SelectContent>
        </Select>
        <Select value={minConfidence} onValueChange={setMinConfidence}>
          <SelectTrigger className="w-full md:w-48 bg-input border-border">
            <SelectValue placeholder="Уверенность" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="65">От 65%</SelectItem>
            <SelectItem value="70">От 70%</SelectItem>
            <SelectItem value="75">От 75%</SelectItem>
            <SelectItem value="80">От 80%</SelectItem>
            <SelectItem value="85">От 85%</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMatches.map((match) => (
          <Card key={match.id} className="p-6 bg-card border-border hover:border-yellow-500/50 transition-colors">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{match.league}</Badge>
                  <Badge className={getMatchTypeColor(match.matchType)}>
                    {getMatchTypeLabel(match.matchType)}
                  </Badge>
                  {match.confidence >= 80 && (
                    <Badge className="bg-accent hover:bg-accent/80">
                      <Icon name="TrendingUp" size={12} className="mr-1" />
                      High Value
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{match.time}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(match.id)}
                    className={favorites.includes(match.id) ? 'text-yellow-500' : ''}
                  >
                    <Icon name="Star" size={18} fill={favorites.includes(match.id) ? 'currentColor' : 'none'} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1">
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {match.homeTeam} - {match.awayTeam}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Судья:</span>
                      <span className="font-semibold">{match.referee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Средняя ЖК судьи:</span>
                      <span className="text-xs font-bold text-yellow-600">{match.refereeAvgYellow}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-2">
                  <h5 className="text-sm font-semibold text-muted-foreground mb-2">Статистика команд</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                      <p className="text-xs text-muted-foreground">Хозяева ЖК</p>
                      <p className="text-lg font-bold text-yellow-600">{match.homeYellowAvg}</p>
                    </div>
                    <div className="p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                      <p className="text-xs text-muted-foreground">Гости ЖК</p>
                      <p className="text-lg font-bold text-yellow-600">{match.awayYellowAvg}</p>
                    </div>
                  </div>
                  <div className="p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">H2H среднее ЖК</p>
                    <p className="text-lg font-bold text-foreground">{match.h2hYellowAvg}</p>
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-2">
                  <h5 className="text-sm font-semibold text-muted-foreground mb-2">ИИ Прогноз</h5>
                  <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <p className="text-xs text-muted-foreground mb-1">Желтые карточки</p>
                    <p className="text-2xl font-bold text-yellow-600">{match.predictedYellow}</p>
                  </div>
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <p className="text-xs text-muted-foreground mb-1">Красные карточки</p>
                    <p className="text-2xl font-bold text-red-600">{match.predictedRed}</p>
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-2">
                  <h5 className="text-sm font-semibold text-muted-foreground mb-2">Рекомендации</h5>
                  <div className="space-y-2">
                    {match.yellowOver35 >= 65 && (
                      <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold">ЖК Больше 3.5</span>
                          <Badge variant="secondary">{match.yellowOver35}%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Высокая вероятность</p>
                      </div>
                    )}
                    {match.yellowOver45 >= 65 && (
                      <div className="p-2 bg-secondary/10 rounded-lg border border-secondary/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold">ЖК Больше 4.5</span>
                          <Badge variant="secondary">{match.yellowOver45}%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Хорошая вероятность</p>
                      </div>
                    )}
                    {match.redOver05 >= 65 && (
                      <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold">КК Больше 0.5</span>
                          <Badge variant="secondary">{match.redOver05}%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Высокая вероятность</p>
                      </div>
                    )}
                    <div className="mt-3 p-2 bg-accent/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Общая уверенность</span>
                        <span className="text-lg font-bold text-accent">{match.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                  <Icon name="FileText" size={16} />
                  Детальный отчет
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="ExternalLink" size={16} />
                  Поставить
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <Card className="p-12 text-center bg-card border-border">
          <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">Нет прогнозов</h3>
          <p className="text-muted-foreground">
            С выбранными фильтрами не найдено матчей с уверенностью от {minConfidence}%
          </p>
        </Card>
      )}
    </div>
  );
};

export default FootballCards;