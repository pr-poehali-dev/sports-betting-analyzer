import { useState, useEffect } from 'react';
import { LiveMatchData, Prediction, TimelineData } from './types';

const INITIAL_MATCH_DATA: LiveMatchData = {
  minute: 0,
  score: '0-0',
  homeTeam: 'Спартак',
  awayTeam: 'Локомотив',
  goals: 0,
  yellowCards: 0,
  homeYellowCards: 0,
  awayYellowCards: 0,
  possession: { home: 50, away: 50 },
  shots: { home: 0, away: 0 },
  shotsOnTarget: { home: 0, away: 0 },
  corners: { home: 0, away: 0 },
  fouls: { home: 0, away: 0 },
  xG: { home: 0, away: 0 },
  dangerousAttacks: { home: 0, away: 0 }
};

const INITIAL_PREDICTIONS: Prediction[] = [
  {
    type: 'ТБ 2.5 голов',
    probability: 68,
    currentOdds: 2.05,
    value: 39,
    trend: 'stable',
    status: 'waiting'
  },
  {
    type: 'Обе забьют',
    probability: 76,
    currentOdds: 1.68,
    value: 28,
    trend: 'stable',
    status: 'waiting'
  },
  {
    type: 'ЖК ТБ 4.5',
    probability: 74,
    currentOdds: 1.85,
    value: 37,
    trend: 'stable',
    status: 'waiting'
  },
  {
    type: 'ТБ 3.5 голов',
    probability: 38,
    currentOdds: 3.40,
    value: 29,
    trend: 'stable',
    status: 'waiting'
  }
];

export const useMatchSimulation = () => {
  const [isLive, setIsLive] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [matchData, setMatchData] = useState<LiveMatchData>(INITIAL_MATCH_DATA);
  const [predictions, setPredictions] = useState<Prediction[]>(INITIAL_PREDICTIONS);
  const [timelineData, setTimelineData] = useState<TimelineData[]>([
    { minute: 0, goals: 0, xG: 0, yellowCards: 0, intensity: 50 }
  ]);

  const simulateLiveMatch = () => {
    if (!isLive || !autoUpdate) return;

    setMatchData(prev => {
      const newMinute = Math.min(prev.minute + 1, 90);
      const newData = { ...prev, minute: newMinute };

      if (newMinute % 8 === 0 && Math.random() > 0.7) {
        const homeScores = Math.random() > 0.5;
        const [homeGoals, awayGoals] = prev.score.split('-').map(Number);
        newData.score = homeScores ? `${homeGoals + 1}-${awayGoals}` : `${homeGoals}-${awayGoals + 1}`;
        newData.goals = prev.goals + 1;
      }

      if (newMinute % 5 === 0 && Math.random() > 0.65) {
        newData.yellowCards = prev.yellowCards + 1;
        if (Math.random() > 0.5) {
          newData.homeYellowCards = prev.homeYellowCards + 1;
        } else {
          newData.awayYellowCards = prev.awayYellowCards + 1;
        }
      }

      if (newMinute % 3 === 0) {
        newData.possession = {
          home: Math.floor(45 + Math.random() * 15),
          away: 0
        };
        newData.possession.away = 100 - newData.possession.home;

        newData.shots = {
          home: prev.shots.home + (Math.random() > 0.6 ? 1 : 0),
          away: prev.shots.away + (Math.random() > 0.6 ? 1 : 0)
        };

        newData.shotsOnTarget = {
          home: prev.shotsOnTarget.home + (Math.random() > 0.8 ? 1 : 0),
          away: prev.shotsOnTarget.away + (Math.random() > 0.8 ? 1 : 0)
        };

        newData.corners = {
          home: prev.corners.home + (Math.random() > 0.85 ? 1 : 0),
          away: prev.corners.away + (Math.random() > 0.85 ? 1 : 0)
        };

        newData.fouls = {
          home: prev.fouls.home + (Math.random() > 0.75 ? 1 : 0),
          away: prev.fouls.away + (Math.random() > 0.75 ? 1 : 0)
        };

        newData.xG = {
          home: parseFloat((prev.xG.home + (Math.random() * 0.15)).toFixed(2)),
          away: parseFloat((prev.xG.away + (Math.random() * 0.15)).toFixed(2))
        };

        newData.dangerousAttacks = {
          home: prev.dangerousAttacks.home + (Math.random() > 0.7 ? 1 : 0),
          away: prev.dangerousAttacks.away + (Math.random() > 0.7 ? 1 : 0)
        };
      }

      return newData;
    });
  };

  const updatePredictions = () => {
    setPredictions(prev => prev.map(pred => {
      let newProb = pred.probability;
      let newValue = pred.value;
      let trend: 'up' | 'down' | 'stable' = 'stable';
      let status: 'waiting' | 'winning' | 'losing' = 'waiting';

      if (pred.type === 'ТБ 2.5 голов') {
        const timeLeft = 90 - matchData.minute;
        const goalsNeeded = Math.max(0, 3 - matchData.goals);
        const currentPace = matchData.goals / (matchData.minute / 90);
        const projectedGoals = currentPace * (90 / matchData.minute);

        newProb = Math.min(95, Math.max(5, (projectedGoals > 2.5 ? 70 : 40) + (matchData.xG.home + matchData.xG.away) * 5));
        trend = newProb > pred.probability ? 'up' : (newProb < pred.probability ? 'down' : 'stable');
        status = projectedGoals > 2.5 ? 'winning' : (timeLeft < 20 && goalsNeeded > 1 ? 'losing' : 'waiting');
      }

      if (pred.type === 'Обе забьют') {
        const [homeGoals, awayGoals] = matchData.score.split('-').map(Number);
        if (homeGoals > 0 && awayGoals > 0) {
          newProb = 100;
          status = 'winning';
          trend = 'up';
        } else {
          const bothScoring = (matchData.xG.home > 0.5 && matchData.xG.away > 0.5);
          newProb = bothScoring ? 65 : 45;
          trend = newProb > pred.probability ? 'up' : 'down';
        }
      }

      if (pred.type === 'ЖК ТБ 4.5') {
        const cardsNeeded = Math.max(0, 5 - matchData.yellowCards);
        const timeLeft = 90 - matchData.minute;
        const currentPace = matchData.yellowCards / (matchData.minute / 90);
        const projectedCards = currentPace * (90 / matchData.minute);

        newProb = Math.min(95, Math.max(10, projectedCards > 4.5 ? 75 : 50));
        newValue = Math.floor((newProb / 100) * pred.currentOdds * 100 - 100);
        trend = newProb > pred.probability ? 'up' : (newProb < pred.probability ? 'down' : 'stable');
        status = projectedCards > 4.5 ? 'winning' : (timeLeft < 15 && cardsNeeded > 2 ? 'losing' : 'waiting');
      }

      if (pred.type === 'ТБ 3.5 голов') {
        const goalsNeeded = Math.max(0, 4 - matchData.goals);
        const currentPace = matchData.goals / (matchData.minute / 90);
        const projectedGoals = currentPace * (90 / matchData.minute);

        newProb = Math.min(90, Math.max(5, projectedGoals > 3.5 ? 60 : 25));
        trend = newProb > pred.probability ? 'up' : (newProb < pred.probability ? 'down' : 'stable');
        status = projectedGoals > 3.5 ? 'winning' : (matchData.minute > 70 && goalsNeeded > 2 ? 'losing' : 'waiting');
      }

      return {
        ...pred,
        probability: Math.round(newProb),
        value: newValue,
        trend,
        status
      };
    }));
  };

  useEffect(() => {
    if (!isLive || !autoUpdate) return;

    const interval = setInterval(() => {
      simulateLiveMatch();
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive, autoUpdate]);

  useEffect(() => {
    if (matchData.minute % 5 === 0 && matchData.minute > 0) {
      setTimelineData(prev => [...prev, {
        minute: matchData.minute,
        goals: matchData.goals,
        xG: matchData.xG.home + matchData.xG.away,
        yellowCards: matchData.yellowCards,
        intensity: matchData.fouls.home + matchData.fouls.away + matchData.yellowCards * 5
      }]);

      updatePredictions();
    }
  }, [matchData.minute]);

  const startSimulation = () => {
    setIsLive(true);
    setMatchData(INITIAL_MATCH_DATA);
    setTimelineData([{ minute: 0, goals: 0, xG: 0, yellowCards: 0, intensity: 50 }]);
  };

  const stopSimulation = () => {
    setIsLive(false);
  };

  const toggleAutoUpdate = () => {
    setAutoUpdate(prev => !prev);
  };

  return {
    isLive,
    autoUpdate,
    matchData,
    predictions,
    timelineData,
    startSimulation,
    stopSimulation,
    toggleAutoUpdate
  };
};
