import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import FighterCard from './ufc/FighterCard';
import PredictionCard from './ufc/PredictionCard';
import { Fighter, PredictionResult } from './ufc/types';
import { UFC_FIGHTERS } from './ufc/fightersData';
import { calculatePrediction } from './ufc/predictionLogic';

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

  const handleCalculatePrediction = () => {
    if (!fighter1.name || !fighter2.name) {
      toast.error('Введите имена обоих бойцов');
      return;
    }

    const result = calculatePrediction(fighter1, fighter2);
    if (result) {
      setPrediction(result);
      toast.success('Прогноз рассчитан!');
    }
  };

  const updateFighter1 = (field: keyof Fighter, value: string | number) => {
    setFighter1(prev => ({ ...prev, [field]: value }));
  };

  const updateFighter2 = (field: keyof Fighter, value: string | number) => {
    setFighter2(prev => ({ ...prev, [field]: value }));
  };

  const loadFighter = (fighterKey: string, fighterNum: 1 | 2) => {
    const fighter = UFC_FIGHTERS[fighterKey];
    if (fighter) {
      if (fighterNum === 1) {
        setFighter1(fighter);
        toast.success(`${fighter.name} загружен`);
      } else {
        setFighter2(fighter);
        toast.success(`${fighter.name} загружен`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
            <Icon name="Swords" size={24} className="text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">UFC 5 Калькулятор</h3>
            <p className="text-sm text-muted-foreground">Прогнозирование исходов поединков с топ-бойцами</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FighterCard
          fighter={fighter1}
          fighterNum={1}
          onUpdate={updateFighter1}
          onLoadFighter={(key) => loadFighter(key, 1)}
          availableFighters={UFC_FIGHTERS}
        />

        <FighterCard
          fighter={fighter2}
          fighterNum={2}
          onUpdate={updateFighter2}
          onLoadFighter={(key) => loadFighter(key, 2)}
          availableFighters={UFC_FIGHTERS}
        />
      </div>

      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Весовая категория</label>
            <Select value={weightClass} onValueChange={setWeightClass}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flyweight">Наилегчайший (57 кг)</SelectItem>
                <SelectItem value="bantamweight">Легчайший (61 кг)</SelectItem>
                <SelectItem value="featherweight">Полулегкий (66 кг)</SelectItem>
                <SelectItem value="lightweight">Легкий (70 кг)</SelectItem>
                <SelectItem value="welterweight">Полусредний (77 кг)</SelectItem>
                <SelectItem value="middleweight">Средний (84 кг)</SelectItem>
                <SelectItem value="light-heavyweight">Полутяжелый (93 кг)</SelectItem>
                <SelectItem value="heavyweight">Тяжелый (120 кг)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleCalculatePrediction} className="w-full" size="lg">
            <Icon name="Brain" size={20} className="mr-2" />
            Рассчитать прогноз
          </Button>
        </div>
      </Card>

      <PredictionCard prediction={prediction} />

      <Card className="p-6 bg-muted/50 border-border">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-muted-foreground mt-0.5" />
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Как работает калькулятор:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Анализирует соотношение побед/поражений</li>
              <li>Учитывает ударную технику и борцовские навыки</li>
              <li>Оценивает возрастной фактор и физические параметры</li>
              <li>Рассчитывает вероятность победы на основе статистики</li>
              <li>Прогнозирует метод победы и раунд окончания боя</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UFCPredictor;
