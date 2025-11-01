import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const matchesData = [
  {
    id: 1,
    league: 'РПЛ',
    homeTeam: 'Зенит',
    awayTeam: 'Локомотив',
    date: '2025-11-02',
    time: '16:30',
    status: 'upcoming',
    predictedGoals: 2.7,
    bookmakerLine: 2.5,
    homeForm: ['W', 'W', 'W', 'D', 'W'],
    awayForm: ['D', 'L', 'W', 'D', 'W'],
    h2hGoals: 2.9,
    confidence: 78,
    winPrediction: 'home',
    homeWinProb: 58,
    drawProb: 26,
    awayWinProb: 16
  },
  {
    id: 2,
    league: 'АПЛ',
    homeTeam: 'Манчестер Сити',
    awayTeam: 'Арсенал',
    date: '2025-11-02',
    time: '17:30',
    status: 'upcoming',
    predictedGoals: 3.2,
    bookmakerLine: 2.5,
    homeForm: ['W', 'W', 'D', 'W', 'W'],
    awayForm: ['W', 'L', 'W', 'W', 'D'],
    h2hGoals: 3.8,
    confidence: 82
  },
  {
    id: 2,
    league: 'Ла Лига',
    homeTeam: 'Реал Мадрид',
    awayTeam: 'Барселона',
    date: '2025-11-02',
    time: '20:00',
    status: 'upcoming',
    predictedGoals: 3.5,
    bookmakerLine: 3.0,
    homeForm: ['W', 'W', 'W', 'D', 'W'],
    awayForm: ['W', 'W', 'W', 'W', 'L'],
    h2hGoals: 4.2,
    confidence: 88
  },
  {
    id: 3,
    league: 'Серия А',
    homeTeam: 'Интер',
    awayTeam: 'Милан',
    date: '2025-11-02',
    time: '19:45',
    status: 'upcoming',
    predictedGoals: 2.8,
    bookmakerLine: 2.5,
    homeForm: ['W', 'W', 'W', 'W', 'D'],
    awayForm: ['D', 'W', 'L', 'W', 'W'],
    h2hGoals: 2.6,
    confidence: 75
  },
  {
    id: 4,
    league: 'Бундеслига',
    homeTeam: 'Бавария',
    awayTeam: 'Боруссия Д',
    date: '2025-11-02',
    time: '18:30',
    status: 'upcoming',
    predictedGoals: 4.1,
    bookmakerLine: 3.5,
    homeForm: ['W', 'W', 'W', 'W', 'W'],
    awayForm: ['W', 'D', 'W', 'W', 'L'],
    h2hGoals: 4.5,
    confidence: 91
  },
  {
    id: 5,
    league: 'Лига 1',
    homeTeam: 'ПСЖ',
    awayTeam: 'Марсель',
    date: '2025-11-02',
    time: '21:00',
    status: 'upcoming',
    predictedGoals: 3.0,
    bookmakerLine: 2.5,
    homeForm: ['W', 'W', 'D', 'W', 'W'],
    awayForm: ['W', 'L', 'D', 'W', 'W'],
    h2hGoals: 3.3,
    confidence: 79
  },
  {
    id: 6,
    league: 'АПЛ',
    homeTeam: 'Ливерпуль',
    awayTeam: 'Челси',
    date: '2025-11-02',
    time: '16:00',
    status: 'upcoming',
    predictedGoals: 2.9,
    bookmakerLine: 3.0,
    homeForm: ['W', 'W', 'W', 'D', 'W'],
    awayForm: ['D', 'W', 'W', 'L', 'W'],
    h2hGoals: 3.1,
    confidence: 77
  }
];

const FootballMatches = () => {
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');

  const getFormColor = (result: string) => {
    switch(result) {
      case 'W': return 'bg-green-500';
      case 'D': return 'bg-yellow-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  const getTrendBadge = (predicted: number, line: number) => {
    const diff = predicted - line;
    if (diff > 0.3) {
      return <Badge className="bg-green-500 hover:bg-green-600">Тотал Больше</Badge>;
    } else if (diff < -0.3) {
      return <Badge className="bg-blue-500 hover:bg-blue-600">Тотал Меньше</Badge>;
    }
    return <Badge variant="secondary">Неясно</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="CalendarDays" size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Предстоящие матчи</h3>
            <p className="text-sm text-muted-foreground">Топ-матчи европейских лиг с ИИ прогнозами</p>
          </div>
        </div>
      </Card>

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
        <Select value={selectedDate} onValueChange={setSelectedDate}>
          <SelectTrigger className="w-full md:w-48 bg-input border-border">
            <SelectValue placeholder="Дата" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Сегодня</SelectItem>
            <SelectItem value="tomorrow">Завтра</SelectItem>
            <SelectItem value="week">Неделя</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {matchesData.map((match) => (
          <Card key={match.id} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-xs">{match.league}</Badge>
                  <span className="text-sm text-muted-foreground">{match.time}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold">
                        {match.homeTeam.substring(0, 3).toUpperCase()}
                      </div>
                      <span className="font-semibold text-foreground">{match.homeTeam}</span>
                    </div>
                    <div className="flex gap-1">
                      {match.homeForm.map((form, idx) => (
                        <div key={idx} className={`w-5 h-5 rounded ${getFormColor(form)} flex items-center justify-center text-xs font-bold text-white`}>
                          {form}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center text-muted-foreground font-bold">VS</div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold">
                        {match.awayTeam.substring(0, 3).toUpperCase()}
                      </div>
                      <span className="font-semibold text-foreground">{match.awayTeam}</span>
                    </div>
                    <div className="flex gap-1">
                      {match.awayForm.map((form, idx) => (
                        <div key={idx} className={`w-5 h-5 rounded ${getFormColor(form)} flex items-center justify-center text-xs font-bold text-white`}>
                          {form}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 lg:border-l lg:border-r border-border lg:px-6">
                <h4 className="text-sm font-semibold text-muted-foreground mb-4">Прогноз тотала</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm text-muted-foreground">ИИ прогноз</span>
                    <span className="text-2xl font-bold text-primary">{match.predictedGoals}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Линия БК</span>
                    <span className="text-xl font-bold text-foreground">{match.bookmakerLine}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                    <span className="text-sm text-muted-foreground">H2H среднее</span>
                    <span className="text-xl font-bold text-secondary">{match.h2hGoals}</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-4">Рекомендация</h4>
                  <div className="space-y-3">
                    {getTrendBadge(match.predictedGoals, match.bookmakerLine)}
                    <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Уверенность:</span>
                      <span className="text-sm font-bold text-foreground">{match.confidence}%</span>
                    </div>
                    {match.winPrediction && (
                      <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <p className="text-xs text-muted-foreground mb-2">Прогноз победителя</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{match.homeTeam}</span>
                            <span className={`text-sm font-bold ${match.winPrediction === 'home' ? 'text-accent' : 'text-muted-foreground'}`}>
                              {match.homeWinProb}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Ничья</span>
                            <span className={`text-sm font-bold ${match.winPrediction === 'draw' ? 'text-accent' : 'text-muted-foreground'}`}>
                              {match.drawProb}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{match.awayTeam}</span>
                            <span className={`text-sm font-bold ${match.winPrediction === 'away' ? 'text-accent' : 'text-muted-foreground'}`}>
                              {match.awayWinProb}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full">
                    <Icon name="BarChart3" size={16} />
                    Подробная статистика
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

export default FootballMatches;