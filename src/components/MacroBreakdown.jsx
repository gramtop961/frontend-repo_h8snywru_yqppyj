import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const sampleMeals = [
  { id: 1, label: 'Breakfast', protein: 28, carbs: 52, fats: 16 },
  { id: 2, label: 'Snack', protein: 12, carbs: 24, fats: 9 },
  { id: 3, label: 'Lunch', protein: 42, carbs: 60, fats: 18 },
  { id: 4, label: 'Snack', protein: 18, carbs: 20, fats: 10 },
  { id: 5, label: 'Dinner', protein: 40, carbs: 45, fats: 22 },
];

const Bar = ({ color, value, label }) => (
  <div className="flex-1">
    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6 }}
        className="h-full"
        style={{ background: color }}
      />
    </div>
    <div className="mt-1 text-xs text-slate-300/90">{label}: {value}%</div>
  </div>
);

const MacroBreakdown = () => {
  const [idx, setIdx] = useState(2);
  const current = sampleMeals[idx];
  const total = current.protein + current.carbs + current.fats;
  const pct = useMemo(() => ({
    protein: Math.round((current.protein / total) * 100),
    carbs: Math.round((current.carbs / total) * 100),
    fats: Math.round((current.fats / total) * 100),
  }), [idx]);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Macro Breakdown</h2>
          <p className="text-slate-300 mt-2">Drag across meals to explore how your macros shift through the day.</p>
        </div>
        <div className="flex gap-2 text-slate-300">
          {sampleMeals.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setIdx(i)}
              className={`px-3 py-1.5 rounded-full border ${i === idx ? 'border-white/60 bg-white/10 text-white' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <Bar color="linear-gradient(90deg, #34d399, #10b981)" value={pct.protein} label="Protein" />
        <Bar color="linear-gradient(90deg, #60a5fa, #06b6d4)" value={pct.carbs} label="Carbs" />
        <Bar color="linear-gradient(90deg, #f472b6, #fb7185)" value={pct.fats} label="Fats" />
      </div>

      <div className="mt-6 text-slate-300">
        <div className="text-sm">Selected Meal: <span className="text-white font-medium">{current.label}</span></div>
        <div className="text-xs mt-1">P {current.protein}g • C {current.carbs}g • F {current.fats}g</div>
      </div>
    </section>
  );
};

export default MacroBreakdown;
