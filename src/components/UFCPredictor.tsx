import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Fighter {
  name: string;
  wins: number;
  losses: number;
  draws: number;
  strikeAccuracy: number;
  takedownAccuracy: number;
  submissionRate: number;
  koRate: number;
  age: number;
  reach: number;
  weight: number;
}

interface PredictionResult {
  winner: string;
  confidence: number;
  method: string;
  round: number;
  factors: string[];
}

const UFCPredictor = () => {
  const [fighter1, setFighter1] = useState<Fighter>({
    name: '',
    wins: 0,
    losses: 0,
    draws: 0,
    strikeAccuracy: 50,
    takedownAccuracy: 50,
    submissionRate: 0,
    koRate: 0,
    age: 25,
    reach: 180,
    weight: 70
  });

  const [fighter2, setFighter2] = useState<Fighter>({
    name: '',
    wins: 0,
    losses: 0,
    draws: 0,
    strikeAccuracy: 50,
    takedownAccuracy: 50,
    submissionRate: 0,
    koRate: 0,
    age: 25,
    reach: 180,
    weight: 70
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [weightClass, setWeightClass] = useState('welterweight');

  const calculatePrediction = () => {
    if (!fighter1.name || !fighter2.name) {
      toast.error('Введите имена обоих бойцов');
      return;
    }

    const f1Record = fighter1.wins / (fighter1.wins + fighter1.losses + fighter1.draws || 1);
    const f2Record = fighter2.wins / (fighter2.wins + fighter2.losses + fighter2.draws || 1);

    const f1Striking = (fighter1.strikeAccuracy + fighter1.koRate) / 2;
    const f2Striking = (fighter2.strikeAccuracy + fighter2.koRate) / 2;

    const f1Grappling = (fighter1.takedownAccuracy + fighter1.submissionRate) / 2;
    const f2Grappling = (fighter2.takedownAccuracy + fighter2.submissionRate) / 2;

    const ageFactor1 = fighter1.age < 30 ? 1.1 : fighter1.age > 35 ? 0.9 : 1;
    const ageFactor2 = fighter2.age < 30 ? 1.1 : fighter2.age > 35 ? 0.9 : 1;

    const reachAdvantage = Math.abs(fighter1.reach - fighter2.reach);
    const reachFactor = reachAdvantage > 10 ? (fighter1.reach > fighter2.reach ? 1.05 : 0.95) : 1;

    const f1Score = (f1Record * 40 + f1Striking * 30 + f1Grappling * 30) * ageFactor1 * reachFactor;
    const f2Score = (f2Record * 40 + f2Striking * 30 + f2Grappling * 30) * ageFactor2 * (2 - reachFactor);

    const totalScore = f1Score + f2Score;
    const f1Probability = (f1Score / totalScore) * 100;
    const f2Probability = (f2Score / totalScore) * 100;

    const winner = f1Score > f2Score ? fighter1.name : fighter2.name;
    const confidence = Math.max(f1Probability, f2Probability);

    let method = 'Решение судей';
    let round = 3;
    const winnerStats = f1Score > f2Score ? fighter1 : fighter2;

    if (winnerStats.koRate > 60) {
      method = 'Нокаут';
      round = Math.floor(Math.random() * 2) + 1;
    } else if (winnerStats.submissionRate > 50) {
      method = 'Сабмишен';
      round = Math.floor(Math.random() * 2) + 2;
    } else if (confidence > 75) {
      method = 'Единогласное решение';
      round = 3;
    }

    const factors: string[] = [];
    if (Math.abs(f1Score - f2Score) > 20) factors.push('Явное преимущество в опыте');
    if (f1Striking > 60 || f2Striking > 60) factors.push('Высокий уровень ударной техники');
    if (f1Grappling > 60 || f2Grappling > 60) factors.push('Сильная борьба');
    if (reachAdvantage > 10) factors.push(`Преимущество в размахе рук: ${reachAdvantage}см`);
    if (winnerStats.age < 28) factors.push('Молодость и скорость');
    if (winnerStats.koRate > 70) factors.push('Высокий процент нокаутов');

    setPrediction({
      winner,
      confidence: Math.round(confidence),
      method,
      round,
      factors
    });

    toast.success('Прогноз рассчитан!');
  };

  const updateFighter1 = (field: keyof Fighter, value: string | number) => {
    setFighter1(prev => ({ ...prev, [field]: value }));
  };

  const updateFighter2 = (field: keyof Fighter, value: string | number) => {
    setFighter2(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
            <Icon name="Swords" size={24} className="text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">UFC Калькулятор</h3>
            <p className="text-sm text-muted-foreground">Прогнозирование исходов поединков</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">1</span>
            </div>
            <h4 className="text-lg font-bold text-foreground">Боец 1</h4>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="f1-name">Имя бойца</Label>
              <Input
                id="f1-name"
                value={fighter1.name}
                onChange={(e) => updateFighter1('name', e.target.value)}
                placeholder="Конор МакГрегор"
                className="bg-input border-border"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="f1-wins">Победы</Label>
                <Input
                  id="f1-wins"
                  type="number"
                  value={fighter1.wins}
                  onChange={(e) => updateFighter1('wins', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f1-losses">Поражения</Label>
                <Input
                  id="f1-losses"
                  type="number"
                  value={fighter1.losses}
                  onChange={(e) => updateFighter1('losses', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f1-draws">Ничьи</Label>
                <Input
                  id="f1-draws"
                  type="number"
                  value={fighter1.draws}
                  onChange={(e) => updateFighter1('draws', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="f1-strike">Точность ударов (%)</Label>
                <Input
                  id="f1-strike"
                  type="number"
                  value={fighter1.strikeAccuracy}
                  onChange={(e) => updateFighter1('strikeAccuracy', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f1-takedown">Точность тейкдаунов (%)</Label>
                <Input
                  id="f1-takedown"
                  type="number"
                  value={fighter1.takedownAccuracy}
                  onChange={(e) => updateFighter1('takedownAccuracy', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="f1-sub">% Сабмишенов</Label>
                <Input
                  id="f1-sub"
                  type="number"
                  value={fighter1.submissionRate}
                  onChange={(e) => updateFighter1('submissionRate', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f1-ko">% Нокаутов</Label>
                <Input
                  id="f1-ko"
                  type="number"
                  value={fighter1.koRate}
                  onChange={(e) => updateFighter1('koRate', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="f1-age">Возраст</Label>
                <Input
                  id="f1-age"
                  type="number"
                  value={fighter1.age}
                  onChange={(e) => updateFighter1('age', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f1-reach">Размах (см)</Label>
                <Input
                  id="f1-reach"
                  type="number"
                  value={fighter1.reach}
                  onChange={(e) => updateFighter1('reach', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f1-weight">Вес (кг)</Label>
                <Input
                  id="f1-weight"
                  type="number"
                  value={fighter1.weight}
                  onChange={(e) => updateFighter1('weight', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-lg font-bold text-accent">2</span>
            </div>
            <h4 className="text-lg font-bold text-foreground">Боец 2</h4>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="f2-name">Имя бойца</Label>
              <Input
                id="f2-name"
                value={fighter2.name}
                onChange={(e) => updateFighter2('name', e.target.value)}
                placeholder="Хабиб Нурмагомедов"
                className="bg-input border-border"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="f2-wins">Победы</Label>
                <Input
                  id="f2-wins"
                  type="number"
                  value={fighter2.wins}
                  onChange={(e) => updateFighter2('wins', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f2-losses">Поражения</Label>
                <Input
                  id="f2-losses"
                  type="number"
                  value={fighter2.losses}
                  onChange={(e) => updateFighter2('losses', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f2-draws">Ничьи</Label>
                <Input
                  id="f2-draws"
                  type="number"
                  value={fighter2.draws}
                  onChange={(e) => updateFighter2('draws', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="f2-strike">Точность ударов (%)</Label>
                <Input
                  id="f2-strike"
                  type="number"
                  value={fighter2.strikeAccuracy}
                  onChange={(e) => updateFighter2('strikeAccuracy', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f2-takedown">Точность тейкдаунов (%)</Label>
                <Input
                  id="f2-takedown"
                  type="number"
                  value={fighter2.takedownAccuracy}
                  onChange={(e) => updateFighter2('takedownAccuracy', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="f2-sub">% Сабмишенов</Label>
                <Input
                  id="f2-sub"
                  type="number"
                  value={fighter2.submissionRate}
                  onChange={(e) => updateFighter2('submissionRate', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f2-ko">% Нокаутов</Label>
                <Input
                  id="f2-ko"
                  type="number"
                  value={fighter2.koRate}
                  onChange={(e) => updateFighter2('koRate', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="f2-age">Возраст</Label>
                <Input
                  id="f2-age"
                  type="number"
                  value={fighter2.age}
                  onChange={(e) => updateFighter2('age', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f2-reach">Размах (см)</Label>
                <Input
                  id="f2-reach"
                  type="number"
                  value={fighter2.reach}
                  onChange={(e) => updateFighter2('reach', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="f2-weight">Вес (кг)</Label>
                <Input
                  id="f2-weight"
                  type="number"
                  value={fighter2.weight}
                  onChange={(e) => updateFighter2('weight', parseInt(e.target.value) || 0)}
                  className="bg-input border-border"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label>Весовая категория</Label>
          <Select value={weightClass} onValueChange={setWeightClass}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flyweight">Наилегчайший (до 57 кг)</SelectItem>
              <SelectItem value="bantamweight">Легчайший (до 61 кг)</SelectItem>
              <SelectItem value="featherweight">Полулегкий (до 66 кг)</SelectItem>
              <SelectItem value="lightweight">Легкий (до 70 кг)</SelectItem>
              <SelectItem value="welterweight">Полусредний (до 77 кг)</SelectItem>
              <SelectItem value="middleweight">Средний (до 84 кг)</SelectItem>
              <SelectItem value="light-heavyweight">Полутяжелый (до 93 кг)</SelectItem>
              <SelectItem value="heavyweight">Тяжелый (до 120 кг)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={calculatePrediction}
          className="mt-6 gap-2"
          size="lg"
        >
          <Icon name="Calculator" size={20} />
          Рассчитать прогноз
        </Button>
      </div>

      {prediction && (
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">Прогноз</h3>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Trophy" size={24} className="text-secondary" />
              <p className="text-3xl font-bold text-primary">{prediction.winner}</p>
            </div>
            <p className="text-lg text-muted-foreground mt-2">
              Уверенность: <span className="font-bold text-foreground">{prediction.confidence}%</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card/50 p-4 rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Способ победы</p>
              <p className="text-xl font-bold text-foreground">{prediction.method}</p>
            </div>
            <div className="bg-card/50 p-4 rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Прогноз по раундам</p>
              <p className="text-xl font-bold text-foreground">Раунд {prediction.round}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Ключевые факторы:</p>
            <div className="space-y-2">
              {prediction.factors.map((factor, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary" />
                  <span className="text-sm text-foreground">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UFCPredictor;
