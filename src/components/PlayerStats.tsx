import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const playerData = [
  { 
    id: 1, 
    name: 'Леброн Джеймс', 
    team: 'Лейкерс', 
    avgPoints: 25.8, 
    avgRebounds: 7.2, 
    avgAssists: 8.5,
    overRate: 68,
    position: 'F'
  },
  { 
    id: 2, 
    name: 'Стефен Карри', 
    team: 'Вориорз', 
    avgPoints: 29.4, 
    avgRebounds: 5.1, 
    avgAssists: 6.3,
    overRate: 72,
    position: 'G'
  },
  { 
    id: 3, 
    name: 'Джейсон Тейтум', 
    team: 'Селтикс', 
    avgPoints: 27.1, 
    avgRebounds: 8.4, 
    avgAssists: 4.6,
    overRate: 65,
    position: 'F'
  },
  { 
    id: 4, 
    name: 'Джимми Батлер', 
    team: 'Хит', 
    avgPoints: 22.9, 
    avgRebounds: 5.9, 
    avgAssists: 5.3,
    overRate: 58,
    position: 'F'
  },
];

const lastGamesData = [
  { game: 'Игра 1', points: 28, assists: 7, rebounds: 8 },
  { game: 'Игра 2', points: 32, assists: 9, rebounds: 6 },
  { game: 'Игра 3', points: 24, assists: 11, rebounds: 7 },
  { game: 'Игра 4', points: 27, assists: 8, rebounds: 9 },
  { game: 'Игра 5', points: 30, assists: 10, rebounds: 5 },
];

const radarData = [
  { stat: 'Очки', value: 88 },
  { stat: 'Подборы', value: 72 },
  { stat: 'Передачи', value: 85 },
  { stat: 'Блоки', value: 45 },
  { stat: '3-очковые', value: 65 },
  { stat: 'Точность', value: 78 },
];

const PlayerStats = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Поиск игрока..." 
            className="bg-input border-border text-foreground"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-48 bg-input border-border">
            <SelectValue placeholder="Позиция" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все позиции</SelectItem>
            <SelectItem value="guard">Защитник</SelectItem>
            <SelectItem value="forward">Форвард</SelectItem>
            <SelectItem value="center">Центровой</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="points">
          <SelectTrigger className="w-full md:w-48 bg-input border-border">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="points">По очкам</SelectItem>
            <SelectItem value="assists">По передачам</SelectItem>
            <SelectItem value="rebounds">По подборам</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {playerData.map((player) => (
          <Card key={player.id} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex items-center gap-4 lg:w-1/3">
                <Avatar className="w-16 h-16 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20 text-primary font-bold text-lg">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">{player.team} • {player.position}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 lg:w-1/3">
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Очки</p>
                  <p className="text-xl font-bold text-foreground">{player.avgPoints}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Подборы</p>
                  <p className="text-xl font-bold text-foreground">{player.avgRebounds}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Передачи</p>
                  <p className="text-xl font-bold text-foreground">{player.avgAssists}</p>
                </div>
              </div>

              <div className="lg:w-1/3 flex items-center">
                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Тотал больше</span>
                    <span className="text-sm font-medium text-primary">{player.overRate}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full" 
                      style={{ width: `${player.overRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            Последние 5 игр
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lastGamesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="game" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="points" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="assists" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rebounds" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Target" size={20} className="text-secondary" />
            Профиль игрока
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="stat" stroke="hsl(var(--muted-foreground))" />
              <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
              <Radar 
                name="Показатели" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default PlayerStats;
