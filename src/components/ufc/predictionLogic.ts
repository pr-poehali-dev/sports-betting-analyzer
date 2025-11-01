import { Fighter, PredictionResult } from './types';

export const calculatePrediction = (fighter1: Fighter, fighter2: Fighter): PredictionResult | null => {
  if (!fighter1.name || !fighter2.name) {
    return null;
  }

  const f1Record = fighter1.wins / (fighter1.wins + fighter1.losses + fighter1.draws || 1);
  const f2Record = fighter2.wins / (fighter2.wins + fighter2.losses + fighter2.draws || 1);

  const f1Striking = (fighter1.strikeAccuracy + fighter1.koRate) / 2;
  const f2Striking = (fighter2.strikeAccuracy + fighter2.koRate) / 2;

  const f1Grappling = (fighter1.takedownAccuracy + fighter1.submissionRate) / 2;
  const f2Grappling = (fighter2.takedownAccuracy + fighter2.submissionRate) / 2;

  const ageFactor1 = fighter1.age < 30 ? 1.1 : fighter1.age > 35 ? 0.9 : 1;
  const ageFactor2 = fighter2.age < 30 ? 1.1 : fighter2.age > 35 ? 0.9 : 1;

  const reachAdvantage = Math.abs(fighter1.reach - fighter2.reach);
  const reachFactor = reachAdvantage > 10 ? (fighter1.reach > fighter2.reach ? 1.05 : 0.95) : 1;

  const f1Score = (f1Record * 40 + f1Striking * 30 + f1Grappling * 30) * ageFactor1 * reachFactor;
  const f2Score = (f2Record * 40 + f2Striking * 30 + f2Grappling * 30) * ageFactor2 * (2 - reachFactor);

  const totalScore = f1Score + f2Score;
  const f1Probability = (f1Score / totalScore) * 100;
  const f2Probability = (f2Score / totalScore) * 100;

  const winner = f1Score > f2Score ? fighter1.name : fighter2.name;
  const confidence = Math.max(f1Probability, f2Probability);

  let method = 'Решение судей';
  let round = 3;
  const winnerStats = f1Score > f2Score ? fighter1 : fighter2;

  if (winnerStats.koRate > 60) {
    method = 'Нокаут';
    round = Math.floor(Math.random() * 2) + 1;
  } else if (winnerStats.submissionRate > 50) {
    method = 'Сабмишен';
    round = Math.floor(Math.random() * 2) + 2;
  } else if (confidence > 75) {
    method = 'Единогласное решение';
    round = 3;
  }

  const factors: string[] = [];
  if (Math.abs(f1Score - f2Score) > 20) factors.push('Явное преимущество в опыте');
  if (f1Striking > 60 || f2Striking > 60) factors.push('Высокий уровень ударной техники');
  if (f1Grappling > 60 || f2Grappling > 60) factors.push('Сильная борьба');
  if (reachAdvantage > 10) factors.push(`Преимущество в размахе рук: ${reachAdvantage}см`);
  if (winnerStats.age < 28) factors.push('Молодость и скорость');
  if (winnerStats.koRate > 70) factors.push('Высокий процент нокаутов');

  return {
    winner,
    confidence: Math.round(confidence),
    method,
    round,
    factors
  };
};
