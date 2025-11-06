import { MatchHeader } from './match/MatchHeader';
import { MatchCharts } from './match/MatchCharts';
import { PredictionsPanel } from './match/PredictionsPanel';
import { LiveRecommendations } from './match/LiveRecommendations';
import { useMatchSimulation } from './match/useMatchSimulation';

const LiveMatchAnalysis = () => {
  const {
    isLive,
    autoUpdate,
    matchData,
    predictions,
    timelineData,
    startSimulation,
    stopSimulation,
    toggleAutoUpdate
  } = useMatchSimulation();

  return (
    <div className="space-y-6">
      <MatchHeader
        isLive={isLive}
        autoUpdate={autoUpdate}
        matchData={matchData}
        onToggleAutoUpdate={toggleAutoUpdate}
        onStartSimulation={startSimulation}
        onStopSimulation={stopSimulation}
      />

      <MatchCharts
        timelineData={timelineData}
        matchData={matchData}
      />

      <PredictionsPanel predictions={predictions} />

      <LiveRecommendations matchData={matchData} />
    </div>
  );
};

export default LiveMatchAnalysis;
