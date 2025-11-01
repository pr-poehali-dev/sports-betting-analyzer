import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import PlayerStats from '@/components/PlayerStats';
import TotalsPrediction from '@/components/TotalsPrediction';
import UFCPredictor from '@/components/UFCPredictor';
import FootballValueBets from '@/components/FootballValueBets';

const Index = () => {
  const [activeTab, setActiveTab] = useState('players');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="TrendingUp" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">BetAnalyzer</h1>
                <p className="text-xs text-muted-foreground">Анализ спортивных тоталов</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Card className="px-4 py-2 bg-primary/10 border-primary/20">
                <div className="flex items-center gap-2">
                  <Icon name="Activity" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Live</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Аналитика и прогнозы
          </h2>
          <p className="text-muted-foreground">
            Профессиональный анализ статистики для прогнозирования тоталов
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="players" className="gap-2">
              <Icon name="User" size={16} />
              Игроки
            </TabsTrigger>
            <TabsTrigger value="prediction" className="gap-2">
              <Icon name="LineChart" size={16} />
              Тоталы
            </TabsTrigger>
            <TabsTrigger value="football" className="gap-2">
              <Icon name="TrendingUp" size={16} />
              Валуй
            </TabsTrigger>
            <TabsTrigger value="ufc" className="gap-2">
              <Icon name="Swords" size={16} />
              UFC
            </TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="space-y-6">
            <PlayerStats />
          </TabsContent>

          <TabsContent value="prediction" className="space-y-6">
            <TotalsPrediction />
          </TabsContent>

          <TabsContent value="football" className="space-y-6">
            <FootballValueBets />
          </TabsContent>

          <TabsContent value="ufc" className="space-y-6">
            <UFCPredictor />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 BetAnalyzer. Аналитика спортивных ставок</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Статистика</a>
              <a href="#" className="hover:text-foreground transition-colors">API</a>
              <a href="#" className="hover:text-foreground transition-colors">Поддержка</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;