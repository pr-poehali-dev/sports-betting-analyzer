import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { LiveMatchData } from './types';

interface MatchHeaderProps {
  isLive: boolean;
  autoUpdate: boolean;
  matchData: LiveMatchData;
  onToggleAutoUpdate: () => void;
  onStartSimulation: () => void;
  onStopSimulation: () => void;
}

export const MatchHeader = ({
  isLive,
  autoUpdate,
  matchData,
  onToggleAutoUpdate,
  onStartSimulation,
  onStopSimulation
}: MatchHeaderProps) => {
  return (
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
              onClick={onToggleAutoUpdate}
            >
              <Icon name={autoUpdate ? "PlayCircle" : "PauseCircle"} size={16} className="mr-2" />
              {autoUpdate ? 'Вкл' : 'Выкл'}
            </Button>
          </div>
          {!isLive ? (
            <Button onClick={onStartSimulation} size="lg" className="gap-2">
              <Icon name="PlayCircle" size={20} />
              Запустить Симуляцию
            </Button>
          ) : (
            <Button onClick={onStopSimulation} size="lg" variant="destructive" className="gap-2">
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
  );
};
