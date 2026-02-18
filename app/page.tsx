"use client";

import { useState } from "react";
import { useHistoryAnalyzer } from "@/hooks/use-history-analyzer";
import { WrappedPresentation } from "@/components/wrapped/WrappedPresentation";
import { StatsDashboard } from "@/components/wrapped/StatsDashboard";
import { ExportInstructions } from "@/components/wrapped/ExportInstructions";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Lock, Activity, FileJson, Sparkles, Globe, Clock, PieChart, Calendar, Github } from "lucide-react";

type ViewState = "upload" | "analyzing" | "presentation" | "dashboard";

export default function Home() {
  const { analyze, data, loading, error } = useHistoryAnalyzer();
  const [view, setView] = useState<ViewState>("upload");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setView("analyzing");
      analyze(e.target.files[0]);
    }
  };

  if (view === "analyzing" && data && !loading) {
    setTimeout(() => setView("presentation"), 500);
  }

  const handleReset = () => {
    setFile(null);
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30 overflow-x-hidden relative font-heading">

      {/* Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/40 to-black -z-20" />
      <div className="fixed top-0 -left-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob" />
      <div className="fixed top-0 -right-4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-2000" />
      <div className="fixed -bottom-8 left-20 w-96 h-96 bg-rose-600 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob animation-delay-4000" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />

      <AnimatePresence mode="wait">

        {/* VIEW: UPLOAD & ANALYZING */}
        {(view === "upload" || view === "analyzing") && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-start min-h-screen p-6 relative"
          >
            <div className="relative z-10 max-w-5xl w-full text-center space-y-12 py-12">

              {/* ── HERO TITLE ── */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6 flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-300">
                  <Sparkles className="w-3 h-3" />
                  <span>2026 Edition</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
                  Echo <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Browse</span>
                </h1>

                <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
                  Unlock insights from your digital journey. <br />
                  <span className="text-white font-medium">100% Private. Client-side Analysis.</span>
                </p>
              </motion.div>

              {/* ── FEATURES GRID (Moved Below Title) ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors text-left">
                  <Lock className="w-6 h-6 text-emerald-400 mb-3" />
                  <h4 className="font-bold mb-1">Privacy First</h4>
                  <p className="text-xs text-zinc-400">Data never leaves your device. Analysis runs in your browser.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors text-left">
                  <Activity className="w-6 h-6 text-blue-400 mb-3" />
                  <h4 className="font-bold mb-1">Deep Analytics</h4>
                  <p className="text-xs text-zinc-400">Discover peak hours, top categories, and browsing habits.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors text-left">
                  <FileJson className="w-6 h-6 text-amber-400 mb-3" />
                  <h4 className="font-bold mb-1">Universal Support</h4>
                  <p className="text-xs text-zinc-400">Works with Chrome, Firefox, Edge, and Brave exports.</p>
                </div>
              </div>

              {/* ── UPLOAD BOX ── */}
              <div className="relative group max-w-lg mx-auto">
                <input
                  type="file"
                  accept=".json,.csv,.txt"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  disabled={loading || view === "analyzing"}
                />
                <div className={`
                  relative z-10 flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl transition-all duration-500
                  ${view === "analyzing"
                    ? "border-purple-500 bg-purple-500/10 scale-95"
                    : "border-white/10 hover:border-purple-500/50 hover:bg-white/5 hover:scale-105 shadow-2xl shadow-black/50"
                  }
                `}>
                  {view === "analyzing" ? (
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Activity className="w-8 h-8 text-purple-400 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white font-mono text-lg animate-pulse tracking-widest uppercase">Analyzing History</p>
                        <p className="text-zinc-500 text-xs">Crunching data locally...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center mb-6 shadow-xl group-hover:rotate-6 transition-transform duration-300 group-hover:shadow-purple-500/20">
                        <Upload className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Upload History File</h3>
                      <p className="text-zinc-400 text-sm font-mono group-hover:text-purple-300 transition-colors">
                        Drag &amp; Drop JSON or CSV
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* ── HOW TO EXPORT (directly below upload) ── */}
              <ExportInstructions />

              {/* ── DISCOVER YOUR BROWSING PATTERNS ── */}
              <div className="w-full pt-12 border-t border-white/5">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
                  Discover Your Browsing Patterns
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {[
                    {
                      icon: <Globe className="w-7 h-7" />,
                      title: "Website Analytics",
                      desc: "Discover your most visited websites and browsing patterns",
                    },
                    {
                      icon: <Clock className="w-7 h-7" />,
                      title: "Time Insights",
                      desc: "Understand your daily browsing rhythms and peak hours",
                    },
                    {
                      icon: <PieChart className="w-7 h-7" />,
                      title: "Category Breakdown",
                      desc: "See how you spend time across different website categories",
                    },
                    {
                      icon: <Calendar className="w-7 h-7" />,
                      title: "Yearly Overview",
                      desc: "Visualize your browsing habits throughout the year",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 text-left"
                    >
                      <div className="text-purple-300">{item.icon}</div>
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="https://github.com/abishek77s/web-wrapped"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-300 hover:text-white underline underline-offset-4 transition-colors font-medium text-sm"
                >
                  <Github className="w-4 h-4" />
                  Check out on Github
                </a>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm font-mono"
                >
                  Error: {error}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW: PRESENTATION */}
        {view === "presentation" && data && (
          <motion.div
            key="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-20"
          >
            <WrappedPresentation
              data={data}
              onReset={handleReset}
              onComplete={() => setView("dashboard")}
            />
          </motion.div>
        )}

        {/* VIEW: DASHBOARD */}
        {view === "dashboard" && data && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative min-h-screen bg-[#050505]"
          >
            <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Echo Browse
                </span>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors border border-white/5"
              >
                Start Over
              </button>
            </header>
            <div className="pt-24 px-4 pb-20">
              <StatsDashboard data={data} />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
