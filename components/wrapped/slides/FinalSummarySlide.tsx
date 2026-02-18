"use client";
import { AnalyzedData } from "@/lib/types";
import { motion } from "framer-motion";
import { Globe, Clock, LayoutGrid, Flame, Star, Calendar, ChevronRight } from "lucide-react";

interface FinalSummarySlideProps {
    data: AnalyzedData;
    onComplete: () => void;
}

export function FinalSummarySlide({ data, onComplete }: FinalSummarySlideProps) {
    const peakHour = data.visitsByHour.reduce(
        (p, c) => (c.count > p.count ? c : p),
        { hour: 0, count: 0 }
    );
    const peakDay = data.visitsByDayOfWeek.reduce(
        (p, c) => (c.count > p.count ? c : p),
        { day: "Mon", count: 0 }
    );
    const topCategory = data.categories[0];
    const topDomain = data.topDomains[0];
    const uniqueDomains = data.topDomains.length;
    const gemsCount = data.topDomains.filter(d => d.count === 1).length;

    // Date range from visitsByDate
    const dates = data.visitsByDate;
    const firstDate = dates.length > 0 ? dates[0].date : null;
    const lastDate = dates.length > 0 ? dates[dates.length - 1].date : null;

    const fmt12 = (h: number) => {
        const suffix = h >= 12 ? "PM" : "AM";
        const d = h % 12 === 0 ? 12 : h % 12;
        return `${d}:00 ${suffix}`;
    };

    const stats = [
        {
            icon: <Globe className="w-5 h-5" />,
            label: "Total Visits",
            value: data.totalVisits.toLocaleString(),
            color: "text-blue-300",
            bg: "bg-blue-500/10 border-blue-500/20",
        },
        {
            icon: <Star className="w-5 h-5" />,
            label: "Top Site",
            value: topDomain?.domain ?? "—",
            sub: `${topDomain?.count.toLocaleString()} visits`,
            color: "text-yellow-300",
            bg: "bg-yellow-500/10 border-yellow-500/20",
        },
        {
            icon: <LayoutGrid className="w-5 h-5" />,
            label: "Top Category",
            value: topCategory?.name ?? "—",
            sub: `${topCategory?.count.toLocaleString()} visits`,
            color: "text-purple-300",
            bg: "bg-purple-500/10 border-purple-500/20",
        },
        {
            icon: <Clock className="w-5 h-5" />,
            label: "Peak Hour",
            value: fmt12(peakHour.hour),
            sub: `${peakHour.count.toLocaleString()} visits`,
            color: "text-pink-300",
            bg: "bg-pink-500/10 border-pink-500/20",
        },
        {
            icon: <Flame className="w-5 h-5" />,
            label: "Busiest Day",
            value: peakDay.day,
            sub: `${peakDay.count.toLocaleString()} visits`,
            color: "text-orange-300",
            bg: "bg-orange-500/10 border-orange-500/20",
        },
        {
            icon: <Globe className="w-5 h-5" />,
            label: "Unique Sites",
            value: uniqueDomains.toLocaleString() + "+",
            color: "text-emerald-300",
            bg: "bg-emerald-500/10 border-emerald-500/20",
        },
        {
            icon: <Star className="w-5 h-5" />,
            label: "Hidden Gems",
            value: gemsCount.toLocaleString(),
            sub: "visited only once",
            color: "text-amber-300",
            bg: "bg-amber-500/10 border-amber-500/20",
        },
        ...(firstDate && lastDate ? [{
            icon: <Calendar className="w-5 h-5" />,
            label: "Date Range",
            value: firstDate,
            sub: `→ ${lastDate}`,
            color: "text-cyan-300",
            bg: "bg-cyan-500/10 border-cyan-500/20",
        }] : []),
    ];

    // Persona
    const h = peakHour.hour;
    let persona = "Night Owl 🦉";
    if (h >= 5 && h < 12) persona = "Morning Bird 🐦";
    else if (h >= 12 && h < 17) persona = "Afternoon Achiever ☀️";
    else if (h >= 17 && h < 22) persona = "Evening Explorer 🌙";

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl space-y-6 animate-in fade-in zoom-in-95 duration-700 px-4 py-6">
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-2"
            >
                <div className="text-5xl mb-2">🎉</div>
                <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 bg-clip-text text-transparent">
                    Your Year in Review
                </h2>
                <p className="text-purple-300/70 font-mono text-sm">
                    Here&apos;s everything we learned about your browsing habits
                </p>
            </motion.div>

            {/* Persona banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-indigo-600/30 border border-purple-500/30 rounded-2xl px-6 py-4 text-center"
            >
                <div className="text-2xl font-heading font-bold text-white">{persona}</div>
                <div className="text-sm text-purple-300/70 font-mono mt-1">
                    Most active at {fmt12(peakHour.hour)} on {peakDay.day}s
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                        className={`flex flex-col gap-1 p-4 rounded-2xl border ${s.bg} backdrop-blur-sm`}
                    >
                        <div className={`${s.color} mb-1`}>{s.icon}</div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{s.label}</div>
                        <div className="text-lg font-bold text-white font-heading leading-tight truncate">{s.value}</div>
                        {s.sub && <div className="text-[10px] font-mono text-white/40 truncate">{s.sub}</div>}
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                onClick={onComplete}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-900/30 hover:scale-105 group"
            >
                See Full Dashboard
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
        </div>
    );
}
