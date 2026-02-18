"use client";
import { AnalyzedData } from "@/lib/types";
import { motion } from "framer-motion";

interface HourlySlideProps {
    data: AnalyzedData;
}

export function HourlySlide({ data }: HourlySlideProps) {
    // Ensure all 24 hours exist (worker already does this, but guard anyway)
    const hours = Array.from({ length: 24 }, (_, h) => {
        const found = data.visitsByHour.find(d => d.hour === h);
        return { hour: h, count: found?.count ?? 0 };
    });

    const maxVisits = Math.max(...hours.map(d => d.count), 1);

    const peakEntry = hours.reduce(
        (prev, cur) => (cur.count > prev.count ? cur : prev),
        { hour: 0, count: 0 }
    );
    const peakHour = peakEntry.hour;

    // Day-of-week
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayData = dayOrder.map(day => {
        const found = data.visitsByDayOfWeek.find(d => d.day === day);
        return { day, count: found?.count ?? 0 };
    });
    const maxDay = Math.max(...dayData.map(d => d.count), 1);
    const peakDay = dayData.reduce((p, c) => (c.count > p.count ? c : p), { day: "Mon", count: 0 });

    let persona = "Night Owl 🦉";
    if (peakHour >= 5 && peakHour < 12) persona = "Morning Bird 🐦";
    else if (peakHour >= 12 && peakHour < 17) persona = "Afternoon Achiever ☀️";
    else if (peakHour >= 17 && peakHour < 22) persona = "Evening Explorer 🌙";

    const fmt = (h: number) => {
        const suffix = h >= 12 ? "PM" : "AM";
        const display = h % 12 === 0 ? 12 : h % 12;
        return `${display}${suffix}`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl space-y-6 animate-in fade-in slide-in-from-right-10 duration-700 px-4">
            <div className="text-center space-y-1">
                <h2 className="text-4xl md:text-5xl font-bold font-heading">
                    Your Daily Rhythms
                </h2>
                <p className="text-purple-300/70 font-mono text-sm">When do you browse the most?</p>
            </div>

            {/* Persona + Peak */}
            <div className="flex gap-4 flex-wrap justify-center">
                <div className="bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-center">
                    <div className="text-2xl font-heading font-bold text-white">{persona}</div>
                    <div className="text-xs text-purple-300 font-mono mt-1">Your browsing persona</div>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-center">
                    <div className="text-2xl font-mono font-bold text-white">{fmt(peakHour)}</div>
                    <div className="text-xs text-purple-300 font-mono mt-1">Peak hour · {peakEntry.count.toLocaleString()} visits</div>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-center">
                    <div className="text-2xl font-heading font-bold text-white">{peakDay.day}</div>
                    <div className="text-xs text-purple-300 font-mono mt-1">Busiest day · {peakDay.count.toLocaleString()} visits</div>
                </div>
            </div>

            {/* Hourly Bar Chart */}
            <div className="w-full">
                <div className="text-xs text-purple-400 font-mono mb-2 text-center">Visits by Hour</div>
                <div className="w-full flex items-end justify-between gap-[2px]" style={{ height: "120px" }}>
                    {hours.map((h) => {
                        const heightPct = maxVisits > 0 ? (h.count / maxVisits) * 100 : 0;
                        const isPeak = h.hour === peakHour;
                        return (
                            <div key={h.hour} className="flex-1 flex flex-col items-center justify-end group relative" style={{ height: "100%" }}>
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                    {fmt(h.hour)}: {h.count}
                                </div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.max(heightPct, h.count > 0 ? 2 : 0)}%` }}
                                    transition={{ duration: 0.6, delay: h.hour * 0.02, ease: "easeOut" }}
                                    className={`w-full rounded-t-sm ${isPeak ? "bg-white" : "bg-purple-500/60 group-hover:bg-purple-400"} transition-colors`}
                                />
                            </div>
                        );
                    })}
                </div>
                {/* X-axis labels */}
                <div className="w-full flex justify-between mt-1 px-0">
                    {[0, 6, 12, 18, 23].map(h => (
                        <span key={h} className="text-[9px] text-purple-400 font-mono">{fmt(h)}</span>
                    ))}
                </div>
            </div>

            {/* Day-of-week bar chart */}
            <div className="w-full">
                <div className="text-xs text-purple-400 font-mono mb-2 text-center">Visits by Day of Week</div>
                <div className="w-full flex items-end justify-between gap-2" style={{ height: "80px" }}>
                    {dayData.map((d) => {
                        const heightPct = maxDay > 0 ? (d.count / maxDay) * 100 : 0;
                        const isPeak = d.day === peakDay.day;
                        return (
                            <div key={d.day} className="flex-1 flex flex-col items-center justify-end gap-1 group relative" style={{ height: "100%" }}>
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                    {d.count}
                                </div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.max(heightPct, d.count > 0 ? 4 : 0)}%` }}
                                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                    className={`w-full rounded-t-sm ${isPeak ? "bg-pink-400" : "bg-indigo-500/60 group-hover:bg-indigo-400"} transition-colors`}
                                />
                                <span className={`text-[10px] font-mono ${isPeak ? "text-pink-300 font-bold" : "text-purple-400"}`}>{d.day}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
