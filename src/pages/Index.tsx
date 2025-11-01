import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import FootballMatches from '@/components/FootballMatches';
import FootballTotals from '@/components/FootballTotals';
import FootballStats from '@/components/FootballStats';
import FootballCards from '@/components/FootballCards';

const Index = () => {
  const [activeTab, setActiveTab] = useState('matches');

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
                <h1 className="text-2xl font-bold text-foreground">⚽ FootballAnalytics</h1>
                <p className="text-xs text-muted-foreground">Прогнозы тоталов в футболе</p>
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
            Футбольная аналитика
          </h2>
          <p className="text-muted-foreground">
            ИИ-анализ матчей: тоталы голов, желтые и красные карточки
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="matches" className="gap-2">
              <Icon name="CalendarDays" size={16} />
              Матчи
            </TabsTrigger>
            <TabsTrigger value="totals" className="gap-2">
              <Icon name="Target" size={16} />
              Тоталы
            </TabsTrigger>
            <TabsTrigger value="cards" className="gap-2">
              <Icon name="AlertTriangle" size={16} />
              Карточки
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Icon name="BarChart3" size={16} />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            <FootballMatches />
          </TabsContent>

          <TabsContent value="totals" className="space-y-6">
            <FootballTotals />
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <FootballCards />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <FootballStats />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 FootballAnalytics. Анализ футбольных матчей</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Лиги</a>
              <a href="#" className="hover:text-foreground transition-colors">Команды</a>
              <a href="#" className="hover:text-foreground transition-colors">API</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;