import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const teamData = [
  { id: 1, name: 'Лейкерс', wins: 28, losses: 14, avgPoints: 112.4, avgOppPoints: 108.2, trend: 'up' },
  { id: 2, name: 'Вориорз', wins: 26, losses: 16, avgPoints: 115.8, avgOppPoints: 110.5, trend: 'up' },
  { id: 3, name: 'Селтикс', wins: 30, losses: 12, avgPoints: 118.2, avgOppPoints: 106.8, trend: 'up' },
  { id: 4, name: 'Хит', wins: 22, losses: 20, avgPoints: 106.5, avgOppPoints: 105.3, trend: 'down' },
];

const performanceData = [
  { game: '1', total: 220, line: 215 },
  { game: '2', total: 218, line: 217 },
  { game: '3', total: 225, line: 216 },
  { game: '4', total: 212, line: 214 },
  { game: '5', total: 228, line: 218 },
  { game: '6', total: 223, line: 219 },
  { game: '7', total: 230, line: 220 },
];

const quarterData = [
  { quarter: 'Q1', points: 28.5 },
  { quarter: 'Q2', points: 29.8 },
  { quarter: 'Q3', points: 27.2 },
  { quarter: 'Q4', points: 26.9 },
];

const TeamStats = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Поиск команды..." 
            className="bg-input border-border text-foreground"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-48 bg-input border-border">
            <SelectValue placeholder="Лига" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все лиги</SelectItem>
            <SelectItem value="nba">NBA</SelectItem>
            <SelectItem value="euroleague">Евролига</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="season">
          <SelectTrigger className="w-full md:w-48 bg-input border-border">
            <SelectValue placeholder="Период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="season">Сезон</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
            <SelectItem value="week">Неделя</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teamData.map((team) => (
          <Card key={team.id} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{team.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {team.wins}W - {team.losses}L
                </p>
              </div>
              <div className={`p-2 rounded-lg ${team.trend === 'up' ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                <Icon 
                  name={team.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={20} 
                  className={team.trend === 'up' ? 'text-primary' : 'text-destructive'}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Среднее очков</p>
                <p className="text-2xl font-bold text-foreground">{team.avgPoints}</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Пропускает</p>
                <p className="text-2xl font-bold text-foreground">{team.avgOppPoints}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Тотал больше</span>
                <span className="text-sm font-medium text-primary">65%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="LineChart" size={20} className="text-primary" />
            Динамика тоталов
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
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
              <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={3} />
              <Line type="monotone" dataKey="line" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-secondary" />
            Очки по четвертям
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={quarterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="points" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default TeamStats;
