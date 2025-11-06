import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface LiveMatch {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  score: { home: number; away: number };
  minute: number;
  period: 'first' | 'second' | 'halftime' | 'finished';
  predictions: {
    type: string;
    probability: number;
    coefficient: number;
    status: 'active' | 'winning' | 'losing' | 'hit';
  }[];
  stats: {
    shots: { home: number; away: number };
    shotsOnTarget: { home: number; away: number };
    possession: { home: number; away: number };
    corners: { home: number; away: number };
    yellowCards: { home: number; away: number };
    redCards: { home: number; away: number };
    dangerousAttacks: { home: number; away: number };
  };
  momentum: number;
  trend: 'home' | 'away' | 'neutral';
}

const MOCK_LIVE_MATCHES: LiveMatch[] = [
  {
    id: '1',
    league: 'Лига Чемпионов',
    homeTeam: 'Ливерпуль',
    awayTeam: 'Реал Мадрид',
    score: { home: 1, away: 1 },
    minute: 67,
    period: 'second',
    predictions: [
      { type: 'ТБ 2.5', probability: 89, coefficient: 1.45, status: 'active' },
      { type: 'Обе забьют', probability: 91, coefficient: 1.35, status: 'hit' },
      { type: 'ТБ 3.5', probability: 76, coefficient: 2.10, status: 'active' },
      { type: 'ЖК 4.5+', probability: 82, coefficient: 1.75, status: 'active' },
    ],
    stats: {
      shots: { home: 14, away: 11 },
      shotsOnTarget: { home: 6, away: 5 },
      possession: { home: 58, away: 42 },
      corners: { home: 7, away: 4 },
      yellowCards: { home: 3, away: 2 },
      redCards: { home: 0, away: 0 },
      dangerousAttacks: { home: 42, away: 31 },
    },
    momentum: 68,
    trend: 'home',
  },
  {
    id: '2',
    league: 'Лига Чемпионов',
    homeTeam: 'ПСЖ',
    awayTeam: 'Бавария',
    score: { home: 2, away: 2 },
    minute: 78,
    period: 'second',
    predictions: [
      { type: 'ТБ 3.5', probability: 92, coefficient: 1.55, status: 'winning' },
      { type: 'ТБ 4.5', probability: 78, coefficient: 2.35, status: 'active' },
      { type: 'Обе забьют', probability: 88, coefficient: 1.25, status: 'hit' },
    ],
    stats: {
      shots: { home: 18, away: 16 },
      shotsOnTarget: { home: 9, away: 8 },
      possession: { home: 51, away: 49 },
      corners: { home: 6, away: 8 },
      yellowCards: { home: 2, away: 3 },
      redCards: { home: 0, away: 0 },
      dangerousAttacks: { home: 56, away: 52 },
    },
    momentum: 52,
    trend: 'neutral',
  },
  {
    id: '3',
    league: 'Лига Чемпионов',
    homeTeam: 'Атлетико Мадрид',
    awayTeam: 'Юнион СЖ',
    score: { home: 2, away: 0 },
    minute: 54,
    period: 'second',
    predictions: [
      { type: 'П1', probability: 96, coefficient: 1.12, status: 'winning' },
      { type: 'ТБ 2.5', probability: 84, coefficient: 1.65, status: 'winning' },
      { type: 'ЖК 4.5+', probability: 88, coefficient: 1.70, status: 'active' },
    ],
    stats: {
      shots: { home: 16, away: 5 },
      shotsOnTarget: { home: 8, away: 2 },
      possession: { home: 67, away: 33 },
      corners: { home: 9, away: 2 },
      yellowCards: { home: 3, away: 3 },
      redCards: { home: 0, away: 1 },
      dangerousAttacks: { home: 48, away: 18 },
    },
    momentum: 85,
    trend: 'home',
  },
  {
    id: '4',
    league: 'Лига Чемпионов',
    homeTeam: 'Наполи',
    awayTeam: 'Айнтрахт',
    score: { home: 1, away: 1 },
    minute: 42,
    period: 'first',
    predictions: [
      { type: 'ТБ 2.5', probability: 81, coefficient: 1.52, status: 'active' },
      { type: 'Обе забьют', probability: 85, coefficient: 1.40, status: 'hit' },
      { type: 'П1', probability: 68, coefficient: 1.85, status: 'active' },
    ],
    stats: {
      shots: { home: 8, away: 7 },
      shotsOnTarget: { home: 4, away: 3 },
      possession: { home: 54, away: 46 },
      corners: { home: 4, away: 3 },
      yellowCards: { home: 1, away: 2 },
      redCards: { home: 0, away: 0 },
      dangerousAttacks: { home: 24, away: 21 },
    },
    momentum: 56,
    trend: 'home',
  },
];

const LiveBettingAnalyzer = () => {
  const [matches, setMatches] = useState<LiveMatch[]>(MOCK_LIVE_MATCHES);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setMatches(prevMatches =>
        prevMatches.map(match => {
          if (match.period === 'finished') return match;

          const newMinute = match.minute + Math.floor(Math.random() * 3);
          const shouldScore = Math.random() > 0.85;

          return {
            ...match,
            minute: Math.min(newMinute, match.period === 'first' ? 45 : 90),
            score: shouldScore
              ? {
                  home: match.score.home + (Math.random() > 0.5 ? 1 : 0),
                  away: match.score.away + (Math.random() > 0.5 ? 1 : 0),
                }
              : match.score,
            stats: {
              ...match.stats,
              shots: {
                home: match.stats.shots.home + Math.floor(Math.random() * 2),
                away: match.stats.shots.away + Math.floor(Math.random() * 2),
              },
              possession: {
                home: Math.max(30, Math.min(70, match.stats.possession.home + (Math.random() - 0.5) * 4)),
                away: 100 - match.stats.possession.home,
              },
            },
          };
        })
      );
      setLastUpdate(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getPeriodLabel = (period: string, minute: number) => {
    if (period === 'first') return `${minute}'`;
    if (period === 'halftime') return 'HT';
    if (period === 'second') return `${minute}'`;
    return 'FT';
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'home') return 'text-green-500';
    if (trend === 'away') return 'text-red-500';
    return 'text-muted-foreground';
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === 'hit') return 'default';
    if (status === 'winning') return 'secondary';
    if (status === 'losing') return 'destructive';
    return 'outline';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'hit') return 'CheckCircle2';
    if (status === 'winning') return 'TrendingUp';
    if (status === 'losing') return 'TrendingDown';
    return 'Clock';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">Live ({matches.length} матчей)</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Обновлено: {lastUpdate.toLocaleTimeString('ru')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={autoRefresh ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="gap-2"
          >
            <Icon name={autoRefresh ? 'Pause' : 'Play'} size={14} />
            {autoRefresh ? 'Пауза' : 'Старт'}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="RefreshCw" size={14} />
            Обновить
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {matches.map(match => (
          <Card key={match.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {match.league}
                    </Badge>
                    <Badge
                      variant="default"
                      className="text-xs bg-green-500 hover:bg-green-600"
                    >
                      <Icon name="Radio" size={10} className="mr-1" />
                      {getPeriodLabel(match.period, match.minute)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="font-semibold text-lg text-foreground">
                          {match.homeTeam}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {match.score.home}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="font-semibold text-lg text-foreground">
                          {match.awayTeam}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {match.score.away}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">Моментум</div>
                  <div className="flex items-center gap-2">
                    <Progress value={match.momentum} className="w-24 h-2" />
                    <span className={`text-sm font-medium ${getTrendColor(match.trend)}`}>
                      {match.momentum}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 py-3 border-y border-border">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Удары</div>
                  <div className="text-sm font-medium text-foreground">
                    {match.stats.shots.home} - {match.stats.shots.away}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">В створ</div>
                  <div className="text-sm font-medium text-foreground">
                    {match.stats.shotsOnTarget.home} - {match.stats.shotsOnTarget.away}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Владение</div>
                  <div className="text-sm font-medium text-foreground">
                    {match.stats.possession.home.toFixed(0)}% - {match.stats.possession.away.toFixed(0)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Угловые</div>
                  <div className="text-sm font-medium text-foreground">
                    {match.stats.corners.home} - {match.stats.corners.away}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Карточки</div>
                  <div className="text-sm font-medium text-foreground">
                    🟨{match.stats.yellowCards.home + match.stats.yellowCards.away}
                    {match.stats.redCards.home + match.stats.redCards.away > 0 &&
                      ` 🟥${match.stats.redCards.home + match.stats.redCards.away}`}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-foreground mb-3">
                  🎯 Активные прогнозы:
                </div>
                <div className="flex flex-wrap gap-2">
                  {match.predictions.map((pred, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border"
                    >
                      <Icon
                        name={getStatusIcon(pred.status)}
                        size={14}
                        className={
                          pred.status === 'hit'
                            ? 'text-green-500'
                            : pred.status === 'winning'
                            ? 'text-blue-500'
                            : pred.status === 'losing'
                            ? 'text-red-500'
                            : 'text-muted-foreground'
                        }
                      />
                      <span className="text-sm font-medium text-foreground">{pred.type}</span>
                      <Badge variant={getStatusBadgeVariant(pred.status)} className="text-xs">
                        {pred.probability}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">@{pred.coefficient}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">💡 ИИ рекомендует сейчас:</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • <strong>Ливерпуль - Реал:</strong> ТБ 3.5 (76%) - высокий темп, обе команды атакуют
              </p>
              <p className="text-sm text-muted-foreground">
                • <strong>ПСЖ - Бавария:</strong> ТБ 4.5 (78%) - уже 4 гола за 78 минут, игра открытая
              </p>
              <p className="text-sm text-muted-foreground">
                • <strong>Атлетико - Юнион:</strong> ЖК 4.5+ (88%) - уже 6 карточек + удаление, жесткая игра
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveBettingAnalyzer;
