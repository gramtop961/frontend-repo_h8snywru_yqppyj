import React from 'react';
import { Activity, Apple, Target, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-lg"
  >
    <div className="pointer-events-none absolute -inset-10 opacity-30" style={{ background: `radial-gradient(circle at 30% 30%, ${accent}, transparent 60%)` }} />
    <div className="relative z-10 flex items-center gap-4">
      <div className="h-11 w-11 grid place-items-center rounded-xl bg-white/10">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <div className="text-slate-300 text-sm">{label}</div>
        <div className="text-xl font-semibold text-white">{value}</div>
      </div>
    </div>
  </motion.div>
);

const StatsPanel = ({ stats }) => {
  const cards = [
    { icon: Flame, label: 'Calories Today', value: `${stats.calories} kcal`, accent: 'rgba(251,113,133,0.6)' },
    { icon: Apple, label: 'Protein', value: `${stats.protein} g`, accent: 'rgba(110,231,183,0.5)' },
    { icon: Activity, label: 'Activity', value: `${stats.activity} min`, accent: 'rgba(96,165,250,0.5)' },
    { icon: Target, label: 'Goal Progress', value: `${stats.goal}%`, accent: 'rgba(192,132,252,0.5)' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <StatCard key={i} {...c} />
      ))}
    </div>
  );
};

export default StatsPanel;
