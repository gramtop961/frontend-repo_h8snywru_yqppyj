import React, { useRef, useState } from 'react';
import { Camera, ScanLine, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockAnalyze = async (file) => {
  // Simulate an AI analysis response
  await new Promise((r) => setTimeout(r, 1600));
  return {
    imageUrl: URL.createObjectURL(file),
    items: [
      { name: 'Grilled Chicken', portion: '150g', calories: 248, protein: 40, carbs: 0, fats: 7 },
      { name: 'Quinoa', portion: '120g', calories: 222, protein: 8, carbs: 39, fats: 4 },
      { name: 'Broccoli', portion: '100g', calories: 35, protein: 3, carbs: 7, fats: 0 },
    ],
  };
};

const ItemTile = ({ item, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, rotateX: -10 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-lg"
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className="text-white/90 font-medium">{item.name}</div>
    <div className="text-slate-300 text-sm">{item.portion}</div>
    <div className="mt-2 flex gap-3 text-xs text-slate-300/90">
      <span className="px-2 py-1 rounded-full bg-white/10">{item.calories} kcal</span>
      <span className="px-2 py-1 rounded-full bg-white/10">P {item.protein}g</span>
      <span className="px-2 py-1 rounded-full bg-white/10">C {item.carbs}g</span>
      <span className="px-2 py-1 rounded-full bg-white/10">F {item.fats}g</span>
    </div>
  </motion.div>
);

const AICamera = ({ onAnalyze }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFiles = async (files) => {
    if (!files || !files[0]) return;
    setLoading(true);
    const analysis = await mockAnalyze(files[0]);
    setResult(analysis);
    setLoading(false);
    onAnalyze?.(analysis);
  };

  return (
    <section className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 md:p-8 overflow-hidden">
      <div className="pointer-events-none absolute -inset-24 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(129,140,248,0.25),transparent_60%)]" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            AI Camera
          </h2>
          <p className="text-slate-300 mt-2">Drag & drop or upload a meal photo. Our model detects foods, estimates portions, and calculates macros in seconds.</p>

          <div
            className="mt-6 rounded-2xl border border-dashed border-white/20 bg-black/20 p-6 text-center cursor-pointer hover:border-white/40 transition-colors"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="h-8 w-8 text-white/90" />
              <div className="text-white">Drop image here or click to upload</div>
              <div className="text-xs text-slate-400">JPG, PNG — instant analysis</div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 text-slate-300">
            <Camera className="h-4 w-4" />
            <span className="text-sm">Live camera support coming soon</span>
          </div>
        </div>

        <div className="relative min-h-[260px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full grid place-items-center text-slate-300"
              >
                Your analysis will appear here
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-full"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_60%)]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex flex-col items-center">
                    <ScanLine className="h-10 w-10 text-cyan-300 animate-pulse" />
                    <div className="mt-2 text-cyan-200">Scanning holographic plate…</div>
                  </div>
                </div>
                <div className="absolute inset-x-0 top-1/3 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-pulse" />
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 grid gap-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  {result.items.map((it, idx) => (
                    <ItemTile key={idx} item={it} delay={idx * 0.08} />
                  ))}
                </div>
                <div className="relative mt-2 overflow-hidden rounded-xl border border-white/10">
                  <img src={result.imageUrl} alt="meal" className="w-full h-48 object-cover" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AICamera;
