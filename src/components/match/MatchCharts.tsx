import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { LiveMatchData, TimelineData } from './types';

interface MatchChartsProps {
  timelineData: TimelineData[];
  matchData: LiveMatchData;
}

export const MatchCharts = ({ timelineData, matchData }: MatchChartsProps) => {
  const radarData = [
    { stat: 'Атака', home: (matchData.shots.home / 20) * 100, away: (matchData.shots.away / 20) * 100 },
    { stat: 'Владение', home: matchData.possession.home, away: matchData.possession.away },
    { stat: 'Опасность', home: (matchData.dangerousAttacks.home / 15) * 100, away: (matchData.dangerousAttacks.away / 15) * 100 },
    { stat: 'Точность', home: matchData.shots.home > 0 ? (matchData.shotsOnTarget.home / matchData.shots.home) * 100 : 0, away: matchData.shots.away > 0 ? (matchData.shotsOnTarget.away / matchData.shots.away) * 100 : 0 },
    { stat: 'Агрессия', home: (matchData.fouls.home / 15) * 100, away: (matchData.fouls.away / 15) * 100 },
    { stat: 'xG', home: (matchData.xG.home / 3) * 100, away: (matchData.xG.away / 3) * 100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          Динамика матча
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="minute" stroke="hsl(var(--muted-foreground))" label={{ value: 'Минута', position: 'insideBottom', offset: -5 }} />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="goals" stroke="hsl(var(--primary))" strokeWidth={3} name="Голы" />
            <Line type="monotone" dataKey="xG" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" name="xG" />
            <Line type="monotone" dataKey="yellowCards" stroke="#eab308" strokeWidth={2} name="Карточки" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Radar" size={20} className="text-primary" />
          Сравнение команд
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="stat" stroke="hsl(var(--muted-foreground))" />
            <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
            <Radar name={matchData.homeTeam} dataKey="home" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
            <Radar name={matchData.awayTeam} dataKey="away" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.3} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
