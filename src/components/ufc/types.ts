export interface Fighter {
  name: string;
  wins: number;
  losses: number;
  draws: number;
  strikeAccuracy: number;
  takedownAccuracy: number;
  submissionRate: number;
  koRate: number;
  age: number;
  reach: number;
  weight: number;
}

export interface PredictionResult {
  winner: string;
  confidence: number;
  method: string;
  round: number;
  factors: string[];
}
