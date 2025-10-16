import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получение статистики команд и игроков из NBA API
    Args: event с httpMethod, queryStringParameters (team, player, date)
    Returns: JSON с данными статистики
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters', {}) or {}
    endpoint = params.get('endpoint', 'teams')
    api_key = os.environ.get('SPORTSDATA_API_KEY', '')
    
    if not api_key:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'demo': True,
                'message': 'Демо-режим: добавьте API ключ для реальных данных',
                'data': get_demo_data(endpoint)
            })
        }
    
    try:
        real_data = fetch_real_stats(endpoint, api_key, params)
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'demo': False,
                'data': real_data
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'error': str(e),
                'demo': True,
                'data': get_demo_data(endpoint)
            })
        }

def fetch_real_stats(endpoint: str, api_key: str, params: Dict[str, Any]) -> Dict[str, Any]:
    '''Получение реальных данных из API'''
    import urllib.request
    import urllib.parse
    
    base_url = 'https://api.sportsdata.io/v3/nba/scores/json'
    
    if endpoint == 'teams':
        url = f'{base_url}/Teams'
    elif endpoint == 'games':
        date = params.get('date', '2025-10-22')
        url = f'{base_url}/GamesByDate/{date}'
    elif endpoint == 'standings':
        url = f'{base_url}/Standings/2025'
    else:
        url = f'{base_url}/Teams'
    
    headers = {
        'Ocp-Apim-Subscription-Key': api_key
    }
    
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
    
    return data

def get_demo_data(endpoint: str) -> Dict[str, Any]:
    '''Демо-данные для показа работы системы'''
    if endpoint == 'teams':
        return {
            'teams': [
                {'id': 1, 'name': 'Lakers', 'wins': 28, 'losses': 14, 'avgPoints': 112.4},
                {'id': 2, 'name': 'Warriors', 'wins': 26, 'losses': 16, 'avgPoints': 115.8},
            ]
        }
    elif endpoint == 'games':
        return {
            'games': [
                {
                    'id': 1,
                    'homeTeam': 'Lakers',
                    'awayTeam': 'Warriors',
                    'date': '2025-10-22',
                    'predictedTotal': 228.5
                }
            ]
        }
    return {'message': 'No demo data available'}
