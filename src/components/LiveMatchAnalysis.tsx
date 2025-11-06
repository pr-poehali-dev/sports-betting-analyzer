import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface LiveMatchData {
  minute: number;
  score: string;
  homeTeam: string;
  awayTeam: string;
  goals: number;
  yellowCards: number;
  homeYellowCards: number;
  awayYellowCards: number;
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  xG: { home: number; away: number };
  dangerousAttacks: { home: number; away: number };
}

interface Prediction {
  type: string;
  probability: number;
  currentOdds: number;
  value: number;
  trend: 'up' | 'down' | 'stable';
  status: 'waiting' | 'winning' | 'losing';
}

const LiveMatchAnalysis = () => {
  const [isLive, setIsLive] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [matchData, setMatchData] = useState<LiveMatchData>({
    minute: 0,
    score: '0-0',
    homeTeam: 'Спартак',
    awayTeam: 'Локомотив',
    goals: 0,
    yellowCards: 0,
    homeYellowCards: 0,
    awayYellowCards: 0,
    possession: { home: 50, away: 50 },
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
    xG: { home: 0, away: 0 },
    dangerousAttacks: { home: 0, away: 0 }
  });

  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      type: 'ТБ 2.5 голов',
      probability: 68,
      currentOdds: 2.05,
      value: 39,
      trend: 'stable',
      status: 'waiting'
    },
    {
      type: 'Обе забьют',
      probability: 76,
      currentOdds: 1.68,
      value: 28,
      trend: 'stable',
      status: 'waiting'
    },
    {
      type: 'ЖК ТБ 4.5',
      probability: 74,
      currentOdds: 1.85,
      value: 37,
      trend: 'stable',
      status: 'waiting'
    },
    {
      type: 'ТБ 3.5 голов',
      probability: 38,
      currentOdds: 3.40,
      value: 29,
      trend: 'stable',
      status: 'waiting'
    }
  ]);

  const [timelineData, setTimelineData] = useState<any[]>([
    { minute: 0, goals: 0, xG: 0, yellowCards: 0, intensity: 50 }
  ]);

  const simulateLiveMatch = () => {
    if (!isLive || !autoUpdate) return;

    setMatchData(prev => {
      const newMinute = Math.min(prev.minute + 1, 90);
      const newData = { ...prev, minute: newMinute };

      if (newMinute % 8 === 0 && Math.random() > 0.7) {
        const homeScores = Math.random() > 0.5;
        const [homeGoals, awayGoals] = prev.score.split('-').map(Number);
        newData.score = homeScores ? `${homeGoals + 1}-${awayGoals}` : `${homeGoals}-${awayGoals + 1}`;
        newData.goals = prev.goals + 1;
      }

      if (newMinute % 5 === 0 && Math.random() > 0.65) {
        newData.yellowCards = prev.yellowCards + 1;
        if (Math.random() > 0.5) {
          newData.homeYellowCards = prev.homeYellowCards + 1;
        } else {
          newData.awayYellowCards = prev.awayYellowCards + 1;
        }
      }

      if (newMinute % 3 === 0) {
        newData.possession = {
          home: Math.floor(45 + Math.random() * 15),
          away: 0
        };
        newData.possession.away = 100 - newData.possession.home;

        newData.shots = {
          home: prev.shots.home + (Math.random() > 0.6 ? 1 : 0),
          away: prev.shots.away + (Math.random() > 0.6 ? 1 : 0)
        };

        newData.shotsOnTarget = {
          home: prev.shotsOnTarget.home + (Math.random() > 0.8 ? 1 : 0),
          away: prev.shotsOnTarget.away + (Math.random() > 0.8 ? 1 : 0)
        };

        newData.corners = {
          home: prev.corners.home + (Math.random() > 0.85 ? 1 : 0),
          away: prev.corners.away + (Math.random() > 0.85 ? 1 : 0)
        };

        newData.fouls = {
          home: prev.fouls.home + (Math.random() > 0.75 ? 1 : 0),
          away: prev.fouls.away + (Math.random() > 0.75 ? 1 : 0)
        };

        newData.xG = {
          home: parseFloat((prev.xG.home + (Math.random() * 0.15)).toFixed(2)),
          away: parseFloat((prev.xG.away + (Math.random() * 0.15)).toFixed(2))
        };

        newData.dangerousAttacks = {
          home: prev.dangerousAttacks.home + (Math.random() > 0.7 ? 1 : 0),
          away: prev.dangerousAttacks.away + (Math.random() > 0.7 ? 1 : 0)
        };
      }

      return newData;
    });
  };

  useEffect(() => {
    if (!isLive || !autoUpdate) return;

    const interval = setInterval(() => {
      simulateLiveMatch();
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive, autoUpdate]);

  useEffect(() => {
    if (matchData.minute % 5 === 0 && matchData.minute > 0) {
      setTimelineData(prev => [...prev, {
        minute: matchData.minute,
        goals: matchData.goals,
        xG: matchData.xG.home + matchData.xG.away,
        yellowCards: matchData.yellowCards,
        intensity: matchData.fouls.home + matchData.fouls.away + matchData.yellowCards * 5
      }]);

      updatePredictions();
    }
  }, [matchData.minute]);

  const updatePredictions = () => {
    setPredictions(prev => prev.map(pred => {
      let newProb = pred.probability;
      let newValue = pred.value;
      let trend: 'up' | 'down' | 'stable' = 'stable';
      let status: 'waiting' | 'winning' | 'losing' = 'waiting';

      if (pred.type === 'ТБ 2.5 голов') {
        const timeLeft = 90 - matchData.minute;
        const goalsNeeded = Math.max(0, 3 - matchData.goals);
        const currentPace = matchData.goals / (matchData.minute / 90);
        const projectedGoals = currentPace * (90 / matchData.minute);

        newProb = Math.min(95, Math.max(5, (projectedGoals > 2.5 ? 70 : 40) + (matchData.xG.home + matchData.xG.away) * 5));
        trend = newProb > pred.probability ? 'up' : (newProb < pred.probability ? 'down' : 'stable');
        status = projectedGoals > 2.5 ? 'winning' : (timeLeft < 20 && goalsNeeded > 1 ? 'losing' : 'waiting');
      }

      if (pred.type === 'Обе забьют') {
        const [homeGoals, awayGoals] = matchData.score.split('-').map(Number);
        if (homeGoals > 0 && awayGoals > 0) {
          newProb = 100;
          status = 'winning';
          trend = 'up';
        } else {
          const bothScoring = (matchData.xG.home > 0.5 && matchData.xG.away > 0.5);
          newProb = bothScoring ? 65 : 45;
          trend = newProb > pred.probability ? 'up' : 'down';
        }
      }

      if (pred.type === 'ЖК ТБ 4.5') {
        const cardsNeeded = Math.max(0, 5 - matchData.yellowCards);
        const timeLeft = 90 - matchData.minute;
        const currentPace = matchData.yellowCards / (matchData.minute / 90);
        const projectedCards = currentPace * (90 / matchData.minute);

        newProb = Math.min(95, Math.max(10, projectedCards > 4.5 ? 75 : 50));
        newValue = Math.floor((newProb / 100) * pred.currentOdds * 100 - 100);
        trend = newProb > pred.probability ? 'up' : (newProb < pred.probability ? 'down' : 'stable');
        status = projectedCards > 4.5 ? 'winning' : (timeLeft < 15 && cardsNeeded > 2 ? 'losing' : 'waiting');
      }

      if (pred.type === 'ТБ 3.5 голов') {
        const goalsNeeded = Math.max(0, 4 - matchData.goals);
        const currentPace = matchData.goals / (matchData.minute / 90);
        const projectedGoals = currentPace * (90 / matchData.minute);

        newProb = Math.min(90, Math.max(5, projectedGoals > 3.5 ? 60 : 25));
        trend = newProb > pred.probability ? 'up' : (newProb < pred.probability ? 'down' : 'stable');
        status = projectedGoals > 3.5 ? 'winning' : (matchData.minute > 70 && goalsNeeded > 2 ? 'losing' : 'waiting');
      }

      return {
        ...pred,
        probability: Math.round(newProb),
        value: newValue,
        trend,
        status
      };
    }));
  };

  const startSimulation = () => {
    setIsLive(true);
    setMatchData({
      minute: 0,
      score: '0-0',
      homeTeam: 'Спартак',
      awayTeam: 'Локомотив',
      goals: 0,
      yellowCards: 0,
      homeYellowCards: 0,
      awayYellowCards: 0,
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      shotsOnTarget: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      xG: { home: 0, away: 0 },
      dangerousAttacks: { home: 0, away: 0 }
    });
    setTimelineData([{ minute: 0, goals: 0, xG: 0, yellowCards: 0, intensity: 50 }]);
  };

  const stopSimulation = () => {
    setIsLive(false);
  };

  const radarData = [
    { stat: 'Атака', home: (matchData.shots.home / 20) * 100, away: (matchData.shots.away / 20) * 100 },
    { stat: 'Владение', home: matchData.possession.home, away: matchData.possession.away },
    { stat: 'Опасность', home: (matchData.dangerousAttacks.home / 15) * 100, away: (matchData.dangerousAttacks.away / 15) * 100 },
    { stat: 'Точность', home: matchData.shots.home > 0 ? (matchData.shotsOnTarget.home / matchData.shots.home) * 100 : 0, away: matchData.shots.away > 0 ? (matchData.shotsOnTarget.away / matchData.shots.away) * 100 : 0 },
    { stat: 'Агрессия', home: (matchData.fouls.home / 15) * 100, away: (matchData.fouls.away / 15) * 100 },
    { stat: 'xG', home: (matchData.xG.home / 3) * 100, away: (matchData.xG.away / 3) * 100 },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-red-500/10 to-green-500/10 border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center">
              <Icon name="Radio" size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Live-Анализ Матча
                {isLive && (
                  <Badge className="bg-red-500 animate-pulse">
                    <Icon name="Circle" size={8} className="mr-1 fill-current" />
                    LIVE
                  </Badge>
                )}
              </h2>
              <p className="text-sm text-muted-foreground">Отслеживание статистики в реальном времени</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Авто-обновление</span>
              <Button
                variant={autoUpdate ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoUpdate(!autoUpdate)}
              >
                <Icon name={autoUpdate ? "PlayCircle" : "PauseCircle"} size={16} className="mr-2" />
                {autoUpdate ? 'Вкл' : 'Выкл'}
              </Button>
            </div>
            {!isLive ? (
              <Button onClick={startSimulation} size="lg" className="gap-2">
                <Icon name="PlayCircle" size={20} />
                Запустить Симуляцию
              </Button>
            ) : (
              <Button onClick={stopSimulation} size="lg" variant="destructive" className="gap-2">
                <Icon name="StopCircle" size={20} />
                Остановить
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 p-6 bg-card/80 backdrop-blur-sm border-border">
            <div className="text-center space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-lg font-bold text-foreground">{matchData.homeTeam}</p>
                  <Badge variant="outline" className="mt-2">Дома</Badge>
                </div>
                <div className="px-6">
                  <p className="text-4xl font-bold text-primary">{matchData.score}</p>
                  <p className="text-sm text-muted-foreground mt-1">{matchData.minute}'</p>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-foreground">{matchData.awayTeam}</p>
                  <Badge variant="outline" className="mt-2">Гости</Badge>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Владение мячом</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold w-8">{matchData.possession.home}%</span>
                  <Progress value={matchData.possession.home} className="flex-1" />
                  <span className="text-xs font-bold w-8">{matchData.possession.away}%</span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{matchData.shots.home}</p>
                    <p className="text-xs text-muted-foreground">Удары</p>
                  </div>
                  <div className="text-center border-x border-border">
                    <p className="text-2xl font-bold text-secondary">{matchData.yellowCards}</p>
                    <p className="text-xs text-muted-foreground">Карточки</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{matchData.shots.away}</p>
                    <p className="text-xs text-muted-foreground">Удары</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6 bg-card/80 backdrop-blur-sm border-border">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Icon name="BarChart3" size={20} className="text-primary" />
              Детальная статистика
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="Target" size={16} className="text-primary" />
                    <span className="text-sm">Удары в створ</span>
                  </div>
                  <span className="font-bold">{matchData.shotsOnTarget.home} - {matchData.shotsOnTarget.away}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="CornerDownRight" size={16} className="text-secondary" />
                    <span className="text-sm">Угловые</span>
                  </div>
                  <span className="font-bold">{matchData.corners.home} - {matchData.corners.away}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="AlertTriangle" size={16} className="text-yellow-500" />
                    <span className="text-sm">Фолы</span>
                  </div>
                  <span className="font-bold">{matchData.fouls.home} - {matchData.fouls.away}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="Activity" size={16} className="text-accent" />
                    <span className="text-sm">xG (ожидаемые голы)</span>
                  </div>
                  <span className="font-bold">{matchData.xG.home.toFixed(2)} - {matchData.xG.away.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="Zap" size={16} className="text-red-500" />
                    <span className="text-sm">Опасные атаки</span>
                  </div>
                  <span className="font-bold">{matchData.dangerousAttacks.home} - {matchData.dangerousAttacks.away}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="AlertOctagon" size={16} className="text-yellow-500" />
                    <span className="text-sm">Жёлтые карточки</span>
                  </div>
                  <span className="font-bold">{matchData.homeYellowCards} - {matchData.awayYellowCards}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            Динамика матча
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="minute" stroke="hsl(var(--muted-foreground))" label={{ value: 'Минута', position: 'insideBottom', offset: -5 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="goals" stroke="hsl(var(--primary))" strokeWidth={3} name="Голы" />
              <Line type="monotone" dataKey="xG" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" name="xG" />
              <Line type="monotone" dataKey="yellowCards" stroke="#eab308" strokeWidth={2} name="Карточки" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Radar" size={20} className="text-primary" />
            Сравнение команд
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="stat" stroke="hsl(var(--muted-foreground))" />
              <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
              <Radar name={matchData.homeTeam} dataKey="home" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              <Radar name={matchData.awayTeam} dataKey="away" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Target" size={20} className="text-primary" />
          Live-обновление прогнозов
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictions.map((pred, index) => (
            <Card key={index} className={`p-4 border-2 transition-all ${
              pred.status === 'winning' ? 'border-green-500 bg-green-500/10' :
              pred.status === 'losing' ? 'border-red-500 bg-red-500/10' :
              'border-border bg-card/50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon 
                    name={
                      pred.status === 'winning' ? 'TrendingUp' :
                      pred.status === 'losing' ? 'TrendingDown' :
                      'Activity'
                    } 
                    size={20} 
                    className={
                      pred.status === 'winning' ? 'text-green-500' :
                      pred.status === 'losing' ? 'text-red-500' :
                      'text-primary'
                    } 
                  />
                  <span className="font-bold text-foreground">{pred.type}</span>
                </div>
                <Badge 
                  variant={
                    pred.status === 'winning' ? 'default' :
                    pred.status === 'losing' ? 'destructive' :
                    'outline'
                  }
                  className="gap-1"
                >
                  {pred.trend === 'up' && <Icon name="ArrowUp" size={12} />}
                  {pred.trend === 'down' && <Icon name="ArrowDown" size={12} />}
                  {pred.status === 'winning' && 'Проходит'}
                  {pred.status === 'losing' && 'Не зайдет'}
                  {pred.status === 'waiting' && 'Ожидание'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Вероятность</span>
                  <span className="font-bold text-primary">{pred.probability}%</span>
                </div>
                <Progress value={pred.probability} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Коэффициент</p>
                    <p className="text-lg font-bold text-foreground">{pred.currentOdds}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Value</p>
                    <p className={`text-lg font-bold ${pred.value > 20 ? 'text-green-500' : pred.value > 0 ? 'text-primary' : 'text-red-500'}`}>
                      {pred.value > 0 ? '+' : ''}{pred.value}%
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <Icon name="Lightbulb" size={20} className="text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Live-рекомендации</h3>
            <p className="text-sm text-muted-foreground">Корректировка стратегии на основе текущей игры</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {matchData.minute > 0 && matchData.minute < 15 && matchData.goals === 0 && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
              <Icon name="Clock" size={20} className="text-yellow-500 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Ранняя фаза - ждём первого гола</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Матч начался осторожно. {matchData.xG.home + matchData.xG.away > 0.3 ? 'Но команды уже создают моменты - скоро будет гол!' : 'Обе команды действуют аккуратно.'}
                </p>
              </div>
            </div>
          )}

          {matchData.goals >= 2 && matchData.minute < 30 && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
              <Icon name="TrendingUp" size={20} className="text-green-500 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Голевой размен! ТБ 2.5 выглядит отлично</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Уже {matchData.goals} гола за {matchData.minute} минут. При таком темпе ожидается {((matchData.goals / matchData.minute) * 90).toFixed(1)} голов в матче.
                </p>
              </div>
            </div>
          )}

          {matchData.yellowCards >= 3 && matchData.minute < 45 && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
              <Icon name="AlertTriangle" size={20} className="text-yellow-500 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Карточный ливень начался!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {matchData.yellowCards} ЖК за {matchData.minute} минут. Судья строгий, ставка на карточки идёт по плану!
                </p>
              </div>
            </div>
          )}

          {matchData.minute > 60 && matchData.goals < 2 && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="text-red-500 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Внимание! ТБ 2.5 под угрозой</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {60 - matchData.minute} минут до конца, нужно ещё {3 - matchData.goals} гола. 
                  {matchData.xG.home + matchData.xG.away > 1.5 ? ' Но xG высокий - шансы есть!' : ' Команды создают мало моментов.'}
                </p>
              </div>
            </div>
          )}

          {matchData.minute > 70 && matchData.yellowCards >= 5 && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-green-500 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">ЖК ТБ 4.5 прошло! 🎉</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {matchData.yellowCards} карточек уже показано. Поздравляем с прибылью!
                </p>
              </div>
            </div>
          )}

          {matchData.minute === 0 && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Запустите симуляцию для анализа</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Нажмите кнопку "Запустить Симуляцию" чтобы увидеть live-анализ матча с обновлением прогнозов в реальном времени.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LiveMatchAnalysis;
