import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { LiveMatchData } from './types';

interface LiveRecommendationsProps {
  matchData: LiveMatchData;
}

export const LiveRecommendations = ({ matchData }: LiveRecommendationsProps) => {
  return (
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
                {90 - matchData.minute} минут до конца, нужно ещё {3 - matchData.goals} гола. 
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
  );
};
