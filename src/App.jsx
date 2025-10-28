import React, { useState } from 'react';
import AuraHero from './components/AuraHero';
import StatsPanel from './components/StatsPanel';
import AICamera from './components/AICamera';
import MacroBreakdown from './components/MacroBreakdown';

function App() {
  const [stats, setStats] = useState({ calories: 0, protein: 0, activity: 0, goal: 12 });

  const handleAnalyze = (analysis) => {
    const totals = analysis.items.reduce(
      (acc, i) => ({
        calories: acc.calories + i.calories,
        protein: acc.protein + i.protein,
      }),
      { calories: 0, protein: 0 }
    );
    setStats((s) => ({ ...s, calories: totals.calories, protein: totals.protein }));
  };

  return (
    <div className="min-h-screen bg-[#080910] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        <AuraHero />

        <StatsPanel
          stats={{
            calories: stats.calories || 0,
            protein: stats.protein || 0,
            activity: 42,
            goal: 68,
          }}
        />

        <AICamera onAnalyze={handleAnalyze} />

        <MacroBreakdown />

        <footer className="py-10 text-center text-slate-400">
          <div className="text-sm">EatLens — the neon-futuristic AI fitness tracker</div>
          <div className="text-xs mt-1">Dark mode • Glassmorphism • Motion-native</div>
        </footer>
      </div>
    </div>
  );
}

export default App;
