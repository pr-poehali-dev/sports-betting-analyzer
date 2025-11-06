import * as XLSX from 'xlsx';

export interface TotalAnalysisData {
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  prediction: string;
  probability: number;
  coefficient: number;
  homeForm: string;
  awayForm: string;
  homeAvgGoals: number;
  awayAvgGoals: number;
  h2hAvgGoals: number;
  homeGoalsScored: number;
  homeGoalsConceded: number;
  awayGoalsScored: number;
  awayGoalsConceded: number;
  trend: string;
  confidence: string;
  expectedGoals: number;
  overUnder: string;
}

export const generateFootballTotalsExcel = () => {
  const data: TotalAnalysisData[] = [
    {
      league: 'Лига Чемпионов',
      homeTeam: 'Ливерпуль',
      awayTeam: 'Реал Мадрид',
      date: '04.11.2025',
      time: '20:00',
      prediction: 'ТБ 2.5',
      probability: 88,
      coefficient: 1.45,
      homeForm: 'ВВВВВ',
      awayForm: 'ВНВНВ',
      homeAvgGoals: 2.8,
      awayAvgGoals: 2.4,
      h2hAvgGoals: 3.2,
      homeGoalsScored: 14,
      homeGoalsConceded: 3,
      awayGoalsScored: 12,
      awayGoalsConceded: 5,
      trend: 'Атакующий',
      confidence: 'Высокая',
      expectedGoals: 3.1,
      overUnder: 'Over'
    },
    {
      league: 'Лига Чемпионов',
      homeTeam: 'ПСЖ',
      awayTeam: 'Бавария',
      date: '04.11.2025',
      time: '20:00',
      prediction: 'ТБ 3.5',
      probability: 78,
      coefficient: 2.10,
      homeForm: 'ВВВНВ',
      awayForm: 'ВВВВВ',
      homeAvgGoals: 2.6,
      awayAvgGoals: 3.2,
      h2hAvgGoals: 3.8,
      homeGoalsScored: 13,
      homeGoalsConceded: 6,
      awayGoalsScored: 16,
      awayGoalsConceded: 4,
      trend: 'Результативный',
      confidence: 'Высокая',
      expectedGoals: 3.9,
      overUnder: 'Over'
    },
    {
      league: 'Лига Чемпионов',
      homeTeam: 'Атлетико Мадрид',
      awayTeam: 'Юнион СЖ',
      date: '04.11.2025',
      time: '20:00',
      prediction: 'ТБ 2.5',
      probability: 70,
      coefficient: 1.65,
      homeForm: 'ВВВВН',
      awayForm: 'НПНПВ',
      homeAvgGoals: 2.1,
      awayAvgGoals: 1.3,
      h2hAvgGoals: 0,
      homeGoalsScored: 11,
      homeGoalsConceded: 4,
      awayGoalsScored: 7,
      awayGoalsConceded: 11,
      trend: 'Односторонний',
      confidence: 'Средняя',
      expectedGoals: 2.8,
      overUnder: 'Over'
    },
    {
      league: 'Лига Чемпионов',
      homeTeam: 'Наполи',
      awayTeam: 'Айнтрахт',
      date: '04.11.2025',
      time: '20:00',
      prediction: 'ТБ 2.5',
      probability: 75,
      coefficient: 1.52,
      homeForm: 'ВВВВВ',
      awayForm: 'ВВВНВ',
      homeAvgGoals: 2.4,
      awayAvgGoals: 2.5,
      h2hAvgGoals: 2.7,
      homeGoalsScored: 12,
      homeGoalsConceded: 5,
      awayGoalsScored: 13,
      awayGoalsConceded: 6,
      trend: 'Атакующий',
      confidence: 'Высокая',
      expectedGoals: 2.9,
      overUnder: 'Over'
    },
    {
      league: 'Лига Чемпионов',
      homeTeam: 'Славия Прага',
      awayTeam: 'Арсенал',
      date: '04.11.2025',
      time: '17:45',
      prediction: 'ТБ 2.5',
      probability: 82,
      coefficient: 1.38,
      homeForm: 'ВНПНВ',
      awayForm: 'ВВВВВ',
      homeAvgGoals: 1.6,
      awayAvgGoals: 2.9,
      h2hAvgGoals: 2.5,
      homeGoalsScored: 8,
      homeGoalsConceded: 9,
      awayGoalsScored: 15,
      awayGoalsConceded: 3,
      trend: 'Фаворит давит',
      confidence: 'Высокая',
      expectedGoals: 3.2,
      overUnder: 'Over'
    },
    {
      league: 'Лига Чемпионов',
      homeTeam: 'Тоттенхэм',
      awayTeam: 'Копенгаген',
      date: '04.11.2025',
      time: '20:00',
      prediction: 'ТБ 2.5',
      probability: 76,
      coefficient: 1.48,
      homeForm: 'ВВВНВ',
      awayForm: 'ВПННВ',
      homeAvgGoals: 2.7,
      awayAvgGoals: 1.4,
      h2hAvgGoals: 2.0,
      homeGoalsScored: 14,
      homeGoalsConceded: 6,
      awayGoalsScored: 7,
      awayGoalsConceded: 10,
      trend: 'Односторонний',
      confidence: 'Высокая',
      expectedGoals: 3.0,
      overUnder: 'Over'
    },
    {
      league: 'Лига Чемпионов',
      homeTeam: 'Ювентус',
      awayTeam: 'Спортинг',
      date: '04.11.2025',
      time: '20:00',
      prediction: 'ТМ 2.5',
      probability: 68,
      coefficient: 1.75,
      homeForm: 'ВННВВ',
      awayForm: 'ВНВНН',
      homeAvgGoals: 1.4,
      awayAvgGoals: 1.6,
      h2hAvgGoals: 1.8,
      homeGoalsScored: 7,
      homeGoalsConceded: 4,
      awayGoalsScored: 8,
      awayGoalsConceded: 7,
      trend: 'Защитный',
      confidence: 'Средняя',
      expectedGoals: 2.0,
      overUnder: 'Under'
    },
    {
      league: 'Лига Чемпионов',
      homeTeam: 'Будё-Глимт',
      awayTeam: 'Монако',
      date: '04.11.2025',
      time: '20:00',
      prediction: 'ТБ 2.5',
      probability: 65,
      coefficient: 1.62,
      homeForm: 'ННВПВ',
      awayForm: 'ВВВНВ',
      homeAvgGoals: 1.8,
      awayAvgGoals: 2.3,
      h2hAvgGoals: 0,
      homeGoalsScored: 9,
      homeGoalsConceded: 8,
      awayGoalsScored: 12,
      awayGoalsConceded: 5,
      trend: 'Атакующий',
      confidence: 'Средняя',
      expectedGoals: 2.7,
      overUnder: 'Over'
    },
    {
      league: 'Лига Чемпионов',
      homeTeam: 'Олимпиакос',
      awayTeam: 'ПСВ',
      date: '04.11.2025',
      time: '20:00',
      prediction: 'ТБ 2.5',
      probability: 70,
      coefficient: 1.58,
      homeForm: 'ВНВНВ',
      awayForm: 'ВВВНВ',
      homeAvgGoals: 1.9,
      awayAvgGoals: 2.6,
      h2hAvgGoals: 2.3,
      homeGoalsScored: 10,
      homeGoalsConceded: 7,
      awayGoalsScored: 13,
      awayGoalsConceded: 6,
      trend: 'Атакующий',
      confidence: 'Средняя',
      expectedGoals: 2.8,
      overUnder: 'Over'
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(data, {
    header: [
      'league',
      'homeTeam',
      'awayTeam',
      'date',
      'time',
      'prediction',
      'probability',
      'coefficient',
      'homeForm',
      'awayForm',
      'homeAvgGoals',
      'awayAvgGoals',
      'h2hAvgGoals',
      'homeGoalsScored',
      'homeGoalsConceded',
      'awayGoalsScored',
      'awayGoalsConceded',
      'trend',
      'confidence',
      'expectedGoals',
      'overUnder'
    ]
  });

  XLSX.utils.sheet_add_aoa(worksheet, [
    [
      'Лига',
      'Хозяева',
      'Гости',
      'Дата',
      'Время',
      'Прогноз',
      'Вероятность %',
      'Коэффициент',
      'Форма Х',
      'Форма Г',
      'Ср. голов Х',
      'Ср. голов Г',
      'Ср. H2H',
      'Голы Х (заб.)',
      'Голы Х (проп.)',
      'Голы Г (заб.)',
      'Голы Г (проп.)',
      'Тренд матча',
      'Уверенность',
      'xG (ожидаемые)',
      'Over/Under'
    ]
  ], { origin: 'A1' });

  const columnWidths = [
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 12 },
    { wch: 8 },
    { wch: 10 },
    { wch: 14 },
    { wch: 12 },
    { wch: 10 },
    { wch: 10 },
    { wch: 13 },
    { wch: 13 },
    { wch: 10 },
    { wch: 14 },
    { wch: 15 },
    { wch: 14 },
    { wch: 15 },
    { wch: 16 },
    { wch: 14 },
    { wch: 16 },
    { wch: 12 }
  ];
  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Анализ тоталов');

  const statsSheet = XLSX.utils.aoa_to_sheet([
    ['📊 СТАТИСТИКА АНАЛИЗА'],
    [],
    ['Показатель', 'Значение'],
    ['Всего матчей проанализировано', data.length],
    ['Прогнозов ТБ 2.5+', data.filter(m => m.prediction.includes('ТБ')).length],
    ['Прогнозов ТМ 2.5', data.filter(m => m.prediction.includes('ТМ')).length],
    ['Средняя вероятность', `${(data.reduce((sum, m) => sum + m.probability, 0) / data.length).toFixed(1)}%`],
    ['Средний коэффициент', (data.reduce((sum, m) => sum + m.coefficient, 0) / data.length).toFixed(2)],
    ['Средние xG (ожидаемые голы)', (data.reduce((sum, m) => sum + m.expectedGoals, 0) / data.length).toFixed(2)],
    [],
    ['🎯 ТОП-3 ПРОГНОЗА'],
    [],
    ['Матч', 'Прогноз', 'Вероятность', 'Коэфф'],
    ...data
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3)
      .map(m => [`${m.homeTeam} - ${m.awayTeam}`, m.prediction, `${m.probability}%`, m.coefficient])
  ]);
  
  statsSheet['!cols'] = [{ wch: 35 }, { wch: 15 }, { wch: 15 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(workbook, statsSheet, 'Статистика');

  XLSX.writeFile(workbook, 'Анализ_тоталов_футбол.xlsx');
};

export const generateCustomTotalsExcel = (customData: TotalAnalysisData[]) => {
  const worksheet = XLSX.utils.json_to_sheet(customData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Анализ');
  XLSX.writeFile(workbook, `Футбол_анализ_${new Date().toISOString().split('T')[0]}.xlsx`);
};
