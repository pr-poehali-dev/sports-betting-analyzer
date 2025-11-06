export interface LiveMatchData {
  minute: number;
  score: string;
  homeTeam: string;
  awayTeam: string;
  goals: number;
  yellowCards: number;
  homeYellowCards: number;
  awayYellowCards: number;
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  xG: { home: number; away: number };
  dangerousAttacks: { home: number; away: number };
}

export interface Prediction {
  type: string;
  probability: number;
  currentOdds: number;
  value: number;
  trend: 'up' | 'down' | 'stable';
  status: 'waiting' | 'winning' | 'losing';
}

export interface TimelineData {
  minute: number;
  goals: number;
  xG: number;
  yellowCards: number;
  intensity: number;
}
