const API_BASE = 'https://functions.poehali.dev';

const ENDPOINTS = {
  sportsStats: '79a80b12-6ea4-4cf2-8518-4d05715ac184',
  predictTotals: '4838d16e-b4de-4eae-a186-81bf7a28d570'
};

export interface TeamStats {
  avgPoints: number;
  avgOppPoints: number;
  pace: number;
  offRating: number;
  defRating: number;
}

export interface Prediction {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  predictedTotal: number;
  bookmakerLine: number;
  confidence: number;
  trend: 'over' | 'under';
  factors: string[];
}

export interface PredictionResponse {
  predictions: Prediction[];
  model_accuracy: number;
  total_games_analyzed: number;
}

export const fetchSportsStats = async (endpoint: string = 'teams'): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE}/${ENDPOINTS.sportsStats}?endpoint=${endpoint}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sports stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sports stats:', error);
    throw error;
  }
};

export const fetchPredictions = async (): Promise<PredictionResponse> => {
  try {
    const response = await fetch(`${API_BASE}/${ENDPOINTS.predictTotals}`);
    if (!response.ok) {
      throw new Error('Failed to fetch predictions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
};

export const calculatePrediction = async (
  homeTeam: TeamStats,
  awayTeam: TeamStats
): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE}/${ENDPOINTS.predictTotals}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ homeTeam, awayTeam }),
    });
    if (!response.ok) {
      throw new Error('Failed to calculate prediction');
    }
    return await response.json();
  } catch (error) {
    console.error('Error calculating prediction:', error);
    throw error;
  }
};
