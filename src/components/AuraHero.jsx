import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const AuraHero = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#0a0a12] to-[#0d0f1a] border border-white/10 shadow-xl">
      {/* Spline 3D aura */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft glow overlays that don't block Spline */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_50%_30%,rgba(88,101,242,0.35),transparent_60%)]" />
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_70%_60%,rgba(255,77,90,0.18),transparent_60%)]" />
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.15),transparent_60%)]" />
      </div>

      {/* Headline content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-sky-400 to-amber-300 drop-shadow-lg"
        >
          Upload. Eat. Evolve.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 max-w-2xl text-balance text-slate-300/90"
        >
          The AI that sees your food, feels your goals, and feeds your future.
        </motion.p>
      </div>
    </section>
  );
};

export default AuraHero;
