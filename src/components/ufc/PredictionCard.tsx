import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { PredictionResult } from './types';

interface PredictionCardProps {
  prediction: PredictionResult | null;
}

const PredictionCard = ({ prediction }: PredictionCardProps) => {
  if (!prediction) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
          <Icon name="Trophy" size={24} className="text-primary-foreground" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-foreground">Результат прогноза</h4>
          <p className="text-sm text-muted-foreground">Анализ на основе статистики</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Победитель</span>
            <Badge className="bg-primary">Фаворит</Badge>
          </div>
          <p className="text-2xl font-bold text-foreground">{prediction.winner}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Уверенность</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-primary">{prediction.confidence}%</p>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${prediction.confidence}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Метод победы</p>
            <p className="text-xl font-bold text-foreground">{prediction.method}</p>
          </div>
        </div>

        <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-1">Прогноз раунда</p>
          <p className="text-xl font-bold text-foreground">Раунд {prediction.round}</p>
        </div>

        <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-3">Ключевые факторы</p>
          <div className="space-y-2">
            {prediction.factors.map((factor, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">{factor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PredictionCard;
