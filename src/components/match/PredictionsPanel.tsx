import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Prediction } from './types';

interface PredictionsPanelProps {
  predictions: Prediction[];
}

export const PredictionsPanel = ({ predictions }: PredictionsPanelProps) => {
  return (
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
  );
};
