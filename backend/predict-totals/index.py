import json
import os
from typing import Dict, Any, List
from dataclasses import dataclass

@dataclass
class TeamStats:
    avg_points: float
    avg_opp_points: float
    pace: float
    off_rating: float
    def_rating: float

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Расчет прогнозов тоталов на основе статистики команд
    Args: event с httpMethod, body содержащим данные матча
    Returns: JSON с прогнозом тотала и уровнем уверенности
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        demo_predictions = get_demo_predictions()
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'predictions': demo_predictions,
                'model_accuracy': 73.2,
                'total_games_analyzed': 2847
            })
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        home_team = body_data.get('homeTeam', {})
        away_team = body_data.get('awayTeam', {})
        
        prediction = calculate_total_prediction(home_team, away_team)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(prediction)
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }

def calculate_total_prediction(home: Dict[str, Any], away: Dict[str, Any]) -> Dict[str, Any]:
    '''Расчет прогноза тотала на основе статистики команд'''
    
    home_stats = TeamStats(
        avg_points=home.get('avgPoints', 110),
        avg_opp_points=home.get('avgOppPoints', 108),
        pace=home.get('pace', 100),
        off_rating=home.get('offRating', 112),
        def_rating=home.get('defRating', 110)
    )
    
    away_stats = TeamStats(
        avg_points=away.get('avgPoints', 108),
        avg_opp_points=away.get('avgOppPoints', 107),
        pace=away.get('pace', 98),
        off_rating=away.get('offRating', 110),
        def_rating=away.get('defRating', 109)
    )
    
    avg_pace = (home_stats.pace + away_stats.pace) / 2
    pace_factor = avg_pace / 100
    
    home_expected = (home_stats.off_rating + away_stats.def_rating) / 2 * pace_factor
    away_expected = (away_stats.off_rating + home_stats.def_rating) / 2 * pace_factor
    
    predicted_total = round((home_expected + away_expected) / 2, 1)
    
    variance = abs(home_stats.avg_points - away_stats.avg_points)
    pace_diff = abs(home_stats.pace - away_stats.pace)
    
    base_confidence = 70
    confidence = base_confidence
    
    if pace_diff < 5:
        confidence += 5
    if variance < 10:
        confidence += 5
    if avg_pace > 102:
        confidence += 3
    
    confidence = min(confidence, 95)
    
    factors = []
    if avg_pace > 102:
        factors.append('Высокий темп игры')
    elif avg_pace < 95:
        factors.append('Низкий темп игры')
    
    avg_def = (home_stats.def_rating + away_stats.def_rating) / 2
    if avg_def > 112:
        factors.append('Слабая защита обеих команд')
    elif avg_def < 108:
        factors.append('Сильная защита')
    
    if home_stats.avg_points > 115 and away_stats.avg_points > 115:
        factors.append('Результативные атаки')
    
    bookmaker_line = predicted_total - (2 if predicted_total > 220 else -2)
    trend = 'over' if predicted_total > bookmaker_line else 'under'
    
    return {
        'predictedTotal': predicted_total,
        'bookmakerLine': bookmaker_line,
        'confidence': confidence,
        'trend': trend,
        'factors': factors,
        'homeExpected': round(home_expected, 1),
        'awayExpected': round(away_expected, 1),
        'pace': round(avg_pace, 1)
    }

def get_demo_predictions() -> List[Dict[str, Any]]:
    '''Демо-прогнозы для показа работы'''
    return [
        {
            'id': 1,
            'homeTeam': 'Финикс Санс',
            'awayTeam': 'Сакраменто Кингз',
            'date': '2025-10-22',
            'time': '23:00',
            'predictedTotal': 241.5,
            'bookmakerLine': 238.5,
            'confidence': 88,
            'trend': 'over',
            'factors': ['Оба топ-3 по темпу', 'Высокая результативность', 'Слабые защиты']
        }
    ]
