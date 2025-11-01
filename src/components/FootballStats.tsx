import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const teamsData = [
  {
    id: 1,
    name: 'Манчестер Сити',
    league: 'АПЛ',
    avgGoalsScored: 2.8,
    avgGoalsConceded: 0.9,
    avgTotalGoals: 3.7,
    form: ['W', 'W', 'D', 'W', 'W'],
    overRate: 75
  },
  {
    id: 2,
    name: 'Бавария',
    league: 'Бундеслига',
    avgGoalsScored: 3.2,
    avgGoalsConceded: 1.1,
    avgTotalGoals: 4.3,
    form: ['W', 'W', 'W', 'W', 'W'],
    overRate: 88
  },
  {
    id: 3,
    name: 'Реал Мадрид',
    league: 'Ла Лига',
    avgGoalsScored: 2.6,
    avgGoalsConceded: 1.0,
    avgTotalGoals: 3.6,
    form: ['W', 'W', 'W', 'D', 'W'],
    overRate: 72
  },
  {
    id: 4,
    name: 'ПСЖ',
    league: 'Лига 1',
    avgGoalsScored: 2.9,
    avgGoalsConceded: 0.8,
    avgTotalGoals: 3.7,
    form: ['W', 'W', 'D', 'W', 'W'],
    overRate: 71
  },
  {
    id: 5,
    name: 'Интер',
    league: 'Серия А',
    avgGoalsScored: 2.3,
    avgGoalsConceded: 0.7,
    avgTotalGoals: 3.0,
    form: ['W', 'W', 'W', 'W', 'D'],
    overRate: 65
  }
];

const lastGamesData = [
  { game: 'Игра 1', goalsFor: 3, goalsAgainst: 1, total: 4 },
  { game: 'Игра 2', goalsFor: 4, goalsAgainst: 2, total: 6 },
  { game: 'Игра 3', goalsFor: 2, goalsAgainst: 1, total: 3 },
  { game: 'Игра 4', goalsFor: 3, goalsAgainst: 0, total: 3 },
  { game: 'Игра 5', goalsFor: 2, goalsAgainst: 2, total: 4 },
];

const teamProfileData = [
  { stat: 'Атака', value: 92 },
  { stat: 'Защита', value: 85 },
  { stat: 'Владение', value: 78 },
  { stat: 'Удары', value: 88 },
  { stat: 'Точность', value: 82 },
  { stat: 'Дисциплина', value: 75 },
];

const leagueStatsData = [
  { league: 'Бундеслига', avgGoals: 3.2 },
  { league: 'Серия А', avgGoals: 2.6 },
  { league: 'АПЛ', avgGoals: 2.8 },
  { league: 'Ла Лига', avgGoals: 2.7 },
  { league: 'Лига 1', avgGoals: 2.5 },
];

const FootballStats = () => {
  const getFormColor = (result: string) => {
    switch(result) {
      case 'W': return 'bg-green-500';
      case 'D': return 'bg-yellow-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

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
            <SelectItem value="epl">АПЛ</SelectItem>
            <SelectItem value="laliga">Ла Лига</SelectItem>
            <SelectItem value="seriea">Серия А</SelectItem>
            <SelectItem value="bundesliga">Бундеслига</SelectItem>
            <SelectItem value="ligue1">Лига 1</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="goals">
          <SelectTrigger className="w-full md:w-48 bg-input border-border">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="goals">По голам</SelectItem>
            <SelectItem value="attack">По атаке</SelectItem>
            <SelectItem value="defense">По защите</SelectItem>
            <SelectItem value="over">По тоталам больше</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {teamsData.map((team) => (
          <Card key={team.id} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {team.name.substring(0, 3).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{team.name}</h3>
                    <Badge variant="outline" className="mt-1">{team.league}</Badge>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {team.form.map((form, idx) => (
                    <div key={idx} className={`w-7 h-7 rounded ${getFormColor(form)} flex items-center justify-center text-xs font-bold text-white`}>
                      {form}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 grid grid-cols-3 gap-3">
                <div className="bg-green-500/10 p-4 rounded-lg text-center border border-green-500/20">
                  <p className="text-xs text-muted-foreground mb-1">Забито</p>
                  <p className="text-2xl font-bold text-green-600">{team.avgGoalsScored}</p>
                  <p className="text-xs text-muted-foreground mt-1">за игру</p>
                </div>
                <div className="bg-red-500/10 p-4 rounded-lg text-center border border-red-500/20">
                  <p className="text-xs text-muted-foreground mb-1">Пропущено</p>
                  <p className="text-2xl font-bold text-red-600">{team.avgGoalsConceded}</p>
                  <p className="text-xs text-muted-foreground mt-1">за игру</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg text-center border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-1">Тотал</p>
                  <p className="text-2xl font-bold text-primary">{team.avgTotalGoals}</p>
                  <p className="text-xs text-muted-foreground mt-1">за игру</p>
                </div>
              </div>

              <div className="lg:w-1/4 flex items-center">
                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Тотал больше</span>
                    <span className="text-sm font-bold text-primary">{team.overRate}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all" 
                      style={{ width: `${team.overRate}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {team.overRate > 70 ? 'Высокая результативность' : 'Средняя результативность'}
                  </p>
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
            Результативность по лигам
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leagueStatsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="league" stroke="hsl(var(--muted-foreground))" width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="avgGoals" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Icon name="LineChart" size={20} className="text-secondary" />
            Последние 5 матчей
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
              <Bar dataKey="goalsFor" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Забито" />
              <Bar dataKey="goalsAgainst" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} name="Пропущено" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Target" size={20} className="text-accent" />
          Профиль команды
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={teamProfileData}>
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
  );
};

export default FootballStats;
