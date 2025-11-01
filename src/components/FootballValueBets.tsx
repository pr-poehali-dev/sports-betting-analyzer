import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface BetAnalysis {
  impliedProbability: number;
  fairOdds: number;
  expectedValue: number;
  isValue: boolean;
  recommendation: string;
}

interface Match {
  id: string;
  team1: string;
  team2: string;
  overOdds: number;
  underOdds: number;
  totalLine: number;
  trueProbability: number;
}

const FootballValueBets = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentMatch, setCurrentMatch] = useState({
    team1: '',
    team2: '',
    totalLine: 2.5,
    overOdds: 0,
    underOdds: 0,
    trueProbability: 50,
  });

  const analyzeBet = (odds: number, trueProbOverPercent: number): BetAnalysis => {
    const impliedProb = (1 / odds) * 100;
    const fairOdds = 100 / trueProbOverPercent;
    const expectedValue = ((trueProbOverPercent / 100) * (odds - 1) - (1 - trueProbOverPercent / 100)) * 100;
    const isValue = expectedValue > 0;

    let recommendation = '';
    if (expectedValue > 5) {
      recommendation = 'Отличный валуй! Рекомендуем ставку';
    } else if (expectedValue > 0) {
      recommendation = 'Есть небольшой валуй';
    } else if (expectedValue > -3) {
      recommendation = 'Ставка близка к справедливой';
    } else {
      recommendation = 'Невыгодная ставка';
    }

    return {
      impliedProbability: impliedProb,
      fairOdds,
      expectedValue,
      isValue,
      recommendation,
    };
  };

  const addMatch = () => {
    if (!currentMatch.team1 || !currentMatch.team2 || !currentMatch.overOdds || !currentMatch.underOdds) {
      return;
    }

    const newMatch: Match = {
      id: Date.now().toString(),
      ...currentMatch,
    };

    setMatches([...matches, newMatch]);
    setCurrentMatch({
      team1: '',
      team2: '',
      totalLine: 2.5,
      overOdds: 0,
      underOdds: 0,
      trueProbability: 50,
    });
  };

  const removeMatch = (id: string) => {
    setMatches(matches.filter((m) => m.id !== id));
  };

  const overAnalysis = currentMatch.overOdds > 0 ? analyzeBet(currentMatch.overOdds, currentMatch.trueProbability) : null;
  const underAnalysis = currentMatch.underOdds > 0 ? analyzeBet(currentMatch.underOdds, 100 - currentMatch.trueProbability) : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Calculator" size={24} />
            Добавить матч
          </CardTitle>
          <CardDescription>Введите данные матча и коэффициенты букмекера</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team1">Команда 1</Label>
              <Input
                id="team1"
                placeholder="Например: Барселона"
                value={currentMatch.team1}
                onChange={(e) => setCurrentMatch({ ...currentMatch, team1: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team2">Команда 2</Label>
              <Input
                id="team2"
                placeholder="Например: Реал Мадрид"
                value={currentMatch.team2}
                onChange={(e) => setCurrentMatch({ ...currentMatch, team2: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalLine">Линия тотала</Label>
              <Input
                id="totalLine"
                type="number"
                step="0.5"
                value={currentMatch.totalLine}
                onChange={(e) => setCurrentMatch({ ...currentMatch, totalLine: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overOdds">Коэфф. Больше</Label>
              <Input
                id="overOdds"
                type="number"
                step="0.01"
                placeholder="1.85"
                value={currentMatch.overOdds || ''}
                onChange={(e) => setCurrentMatch({ ...currentMatch, overOdds: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="underOdds">Коэфф. Меньше</Label>
              <Input
                id="underOdds"
                type="number"
                step="0.01"
                placeholder="2.05"
                value={currentMatch.underOdds || ''}
                onChange={(e) => setCurrentMatch({ ...currentMatch, underOdds: parseFloat(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trueProbability">
              Ваша оценка вероятности "Больше {currentMatch.totalLine}" (%): {currentMatch.trueProbability}%
            </Label>
            <Input
              id="trueProbability"
              type="range"
              min="0"
              max="100"
              value={currentMatch.trueProbability}
              onChange={(e) =>
                setCurrentMatch({ ...currentMatch, trueProbability: parseFloat(e.target.value) })
              }
              className="cursor-pointer"
            />
          </div>

          <Button onClick={addMatch} className="w-full" size="lg">
            <Icon name="Plus" size={20} className="mr-2" />
            Добавить матч в список
          </Button>
        </CardContent>
      </Card>

      {(overAnalysis || underAnalysis) && (
        <div className="grid md:grid-cols-2 gap-4">
          {overAnalysis && (
            <Card className={overAnalysis.isValue ? 'border-primary' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Больше {currentMatch.totalLine}</span>
                  {overAnalysis.isValue && <Badge className="bg-primary">Валуй</Badge>}
                </CardTitle>
                <CardDescription>Коэффициент: {currentMatch.overOdds}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Вероятность букмекера:</span>
                    <span className="font-medium">{overAnalysis.impliedProbability.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ваша вероятность:</span>
                    <span className="font-medium">{currentMatch.trueProbability}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Справедливый коэфф.:</span>
                    <span className="font-medium">{overAnalysis.fairOdds.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Матожидание:</span>
                    <span
                      className={`font-bold ${overAnalysis.expectedValue > 0 ? 'text-primary' : 'text-destructive'}`}
                    >
                      {overAnalysis.expectedValue > 0 ? '+' : ''}
                      {overAnalysis.expectedValue.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium">{overAnalysis.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {underAnalysis && (
            <Card className={underAnalysis.isValue ? 'border-primary' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Меньше {currentMatch.totalLine}</span>
                  {underAnalysis.isValue && <Badge className="bg-primary">Валуй</Badge>}
                </CardTitle>
                <CardDescription>Коэффициент: {currentMatch.underOdds}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Вероятность букмекера:</span>
                    <span className="font-medium">{underAnalysis.impliedProbability.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ваша вероятность:</span>
                    <span className="font-medium">{100 - currentMatch.trueProbability}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Справедливый коэфф.:</span>
                    <span className="font-medium">{underAnalysis.fairOdds.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Матожидание:</span>
                    <span
                      className={`font-bold ${underAnalysis.expectedValue > 0 ? 'text-primary' : 'text-destructive'}`}
                    >
                      {underAnalysis.expectedValue > 0 ? '+' : ''}
                      {underAnalysis.expectedValue.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium">{underAnalysis.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="ListChecks" size={24} />
              Сохраненные матчи ({matches.length})
            </CardTitle>
            <CardDescription>Список добавленных матчей с анализом валуя</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {matches.map((match) => {
              const matchOverAnalysis = analyzeBet(match.overOdds, match.trueProbability);
              const matchUnderAnalysis = analyzeBet(match.underOdds, 100 - match.trueProbability);
              const bestBet =
                matchOverAnalysis.expectedValue > matchUnderAnalysis.expectedValue ? 'over' : 'under';
              const bestValue = Math.max(matchOverAnalysis.expectedValue, matchUnderAnalysis.expectedValue);

              return (
                <Card key={match.id} className={bestValue > 0 ? 'border-primary' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {match.team1} vs {match.team2}
                        </CardTitle>
                        <CardDescription>
                          Тотал {match.totalLine} | Оценка вероятности: {match.trueProbability}%
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeMatch(match.id)}>
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div
                        className={`p-4 rounded-lg border ${bestBet === 'over' && matchOverAnalysis.isValue ? 'bg-primary/10 border-primary' : 'bg-muted/50'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Больше {match.totalLine}</span>
                          <span className="text-lg font-bold">{match.overOdds}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">EV:</span>
                            <span
                              className={
                                matchOverAnalysis.expectedValue > 0
                                  ? 'text-primary font-bold'
                                  : 'text-muted-foreground'
                              }
                            >
                              {matchOverAnalysis.expectedValue > 0 ? '+' : ''}
                              {matchOverAnalysis.expectedValue.toFixed(2)}%
                            </span>
                          </div>
                          {bestBet === 'over' && matchOverAnalysis.isValue && (
                            <Badge className="w-full justify-center mt-2">Лучшая ставка</Badge>
                          )}
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg border ${bestBet === 'under' && matchUnderAnalysis.isValue ? 'bg-primary/10 border-primary' : 'bg-muted/50'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Меньше {match.totalLine}</span>
                          <span className="text-lg font-bold">{match.underOdds}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">EV:</span>
                            <span
                              className={
                                matchUnderAnalysis.expectedValue > 0
                                  ? 'text-primary font-bold'
                                  : 'text-muted-foreground'
                              }
                            >
                              {matchUnderAnalysis.expectedValue > 0 ? '+' : ''}
                              {matchUnderAnalysis.expectedValue.toFixed(2)}%
                            </span>
                          </div>
                          {bestBet === 'under' && matchUnderAnalysis.isValue && (
                            <Badge className="w-full justify-center mt-2">Лучшая ставка</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon name="Info" size={20} />
            Как пользоваться
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Введите названия команд и коэффициенты букмекера на тотал голов</p>
          <p>2. Укажите вашу оценку вероятности того, что будет больше голов, чем линия тотала</p>
          <p>3. Система рассчитает математическое ожидание (EV) и покажет валуйные ставки</p>
          <p>
            4. <strong>Валуй</strong> — это когда ваша оценка вероятности выше, чем вероятность, заложенная в
            коэффициенте букмекера
          </p>
          <p>5. Положительное EV означает, что ставка математически выгодна в долгосрочной перспективе</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FootballValueBets;
