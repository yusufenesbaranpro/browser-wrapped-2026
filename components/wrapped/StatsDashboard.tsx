import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
} from "recharts";
import { AnalyzedData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatsDashboardProps {
    data: AnalyzedData;
}

const COLORS = [
    "#8b5cf6", // purple-500
    "#ec4899", // pink-500
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
    "#06b6d4", // cyan-500
    "#a855f7", // violet-500
];

export function StatsDashboard({ data }: StatsDashboardProps) {
    // ── Heatmap: use actual date range from data ──────────────────────────────
    const dates = data.visitsByDate;
    const dateMap = new Map(dates.map((v) => [v.date, v.count]));

    // Determine year from data
    const yearCounts: Record<number, number> = {};
    dates.forEach(d => {
        const y = new Date(d.date).getFullYear();
        yearCounts[y] = (yearCounts[y] || 0) + d.count;
    });
    const dominantYear = dates.length > 0
        ? parseInt(Object.entries(yearCounts).sort((a, b) => b[1] - a[1])[0][0])
        : new Date().getFullYear();

    const startOfYear = new Date(dominantYear, 0, 1);
    const endOfYear = new Date(dominantYear, 11, 31);

    // Build week-aligned grid (GitHub-style)
    // Pad start to Sunday
    const startDay = startOfYear.getDay(); // 0=Sun
    const gridDays: { date: string; count: number; isCurrentYear: boolean }[] = [];
    for (let i = 0; i < startDay; i++) {
        gridDays.push({ date: "", count: 0, isCurrentYear: false });
    }
    for (let d = new Date(startOfYear); d <= endOfYear; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split("T")[0];
        gridDays.push({ date: dateStr, count: dateMap.get(dateStr) || 0, isCurrentYear: true });
    }

    const maxCount = Math.max(...dates.map(v => v.count), 1);

    const getHeatColor = (count: number, isCurrentYear: boolean) => {
        if (!isCurrentYear) return "bg-transparent";
        if (count === 0) return "bg-white/5";
        const intensity = count / maxCount;
        if (intensity < 0.15) return "bg-purple-900/70";
        if (intensity < 0.35) return "bg-purple-700";
        if (intensity < 0.60) return "bg-purple-500";
        if (intensity < 0.80) return "bg-purple-400";
        return "bg-pink-400 shadow-[0_0_6px_rgba(244,114,182,0.5)]";
    };

    // Month labels for heatmap
    const monthLabels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    gridDays.forEach((d, i) => {
        if (!d.date) return;
        const m = new Date(d.date).getMonth();
        if (m !== lastMonth) {
            monthLabels.push({
                label: new Date(d.date).toLocaleString("default", { month: "short" }),
                col: Math.floor(i / 7),
            });
            lastMonth = m;
        }
    });

    const totalWeeks = Math.ceil(gridDays.length / 7);

    // ── Summary stats ─────────────────────────────────────────────────────────
    const peakHour = data.visitsByHour.reduce(
        (p, c) => (c.count > p.count ? c : p),
        { hour: 0, count: 0 }
    );
    const peakDay = data.visitsByDayOfWeek.reduce(
        (p, c) => (c.count > p.count ? c : p),
        { day: "Mon", count: 0 }
    );
    const activeDays = dates.filter(d => d.count > 0).length;

    const summaryCards = [
        { title: "Total Visits", value: data.totalVisits.toLocaleString(), grad: "from-purple-500 to-indigo-500" },
        { title: "Top Category", value: data.categories[0]?.name || "N/A", grad: "from-pink-500 to-rose-500" },
        { title: "Top Domain", value: data.topDomains[0]?.domain || "N/A", grad: "from-blue-500 to-cyan-500" },
        { title: "Peak Hour", value: `${peakHour.hour}:00`, grad: "from-amber-500 to-orange-500" },
        { title: "Busiest Day", value: peakDay.day, grad: "from-emerald-500 to-teal-500" },
        { title: "Active Days", value: activeDays.toLocaleString(), grad: "from-violet-500 to-purple-500" },
    ];

    // Day-of-week chart — ensure correct order
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayChartData = dayOrder.map(day => {
        const found = data.visitsByDayOfWeek.find(d => d.day === day);
        return { day, count: found?.count ?? 0 };
    });

    return (
        <div className="space-y-6 w-full max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-10 duration-700 pb-20">

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {summaryCards.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden relative group">
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.grad} opacity-10 group-hover:opacity-20 transition-opacity`} />
                            <CardHeader className="pb-1 pt-4 px-4">
                                <CardTitle className="text-zinc-400 text-[10px] uppercase tracking-wider font-mono">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pb-4">
                                <div className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.grad} truncate`}>
                                    {item.value}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Activity Heatmap — GitHub style */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white font-heading text-base">
                        Activity Heatmap · {dominantYear}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        {/* Month labels */}
                        <div
                            className="grid mb-1"
                            style={{ gridTemplateColumns: `repeat(${totalWeeks}, minmax(0, 1fr))` }}
                        >
                            {Array.from({ length: totalWeeks }).map((_, wi) => {
                                const label = monthLabels.find(m => m.col === wi);
                                return (
                                    <div key={wi} className="text-[9px] font-mono text-purple-400 text-center">
                                        {label?.label ?? ""}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Day grid — 7 rows × N weeks */}
                        <div
                            className="grid gap-[3px]"
                            style={{
                                gridTemplateColumns: `repeat(${totalWeeks}, minmax(0, 1fr))`,
                                gridTemplateRows: "repeat(7, 1fr)",
                                gridAutoFlow: "column",
                            }}
                        >
                            {gridDays.map((day, i) => (
                                <div
                                    key={i}
                                    title={day.date ? `${day.date}: ${day.count} visits` : ""}
                                    className={`w-full aspect-square rounded-[2px] ${getHeatColor(day.count, day.isCurrentYear)} hover:scale-125 transition-transform cursor-default`}
                                />
                            ))}
                        </div>
                        {/* Legend */}
                        <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-purple-400">
                            <span>Less</span>
                            {["bg-white/5", "bg-purple-900/70", "bg-purple-700", "bg-purple-500", "bg-purple-400", "bg-pink-400"].map((c, i) => (
                                <div key={i} className={`w-3 h-3 rounded-[2px] ${c}`} />
                            ))}
                            <span>More</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Hourly */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm lg:col-span-2">
                    <CardHeader><CardTitle className="text-white text-base">Visits by Hour</CardTitle></CardHeader>
                    <CardContent style={{ height: 220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.visitsByHour} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                                <XAxis dataKey="hour" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false}
                                    tickFormatter={h => `${h}h`} interval={3} />
                                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                    contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px", color: "#fff", fontSize: 12 }}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    formatter={(v: any) => [Number(v).toLocaleString(), "visits"]}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    labelFormatter={(h: any) => `${h}:00`}
                                />
                                <Bar dataKey="count" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Day of week */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader><CardTitle className="text-white text-base">By Day of Week</CardTitle></CardHeader>
                    <CardContent style={{ height: 220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dayChartData} layout="vertical" margin={{ top: 4, right: 40, left: 0, bottom: 0 }}>
                                <XAxis type="number" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis type="category" dataKey="day" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} width={28} />
                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                    contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px", color: "#fff", fontSize: 12 }}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    formatter={(v: any) => [Number(v).toLocaleString(), "visits"]}
                                />
                                <Bar dataKey="count" fill="#ec4899" radius={[0, 3, 3, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Category pie + top domains */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie chart */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader><CardTitle className="text-white text-base">Category Breakdown</CardTitle></CardHeader>
                    <CardContent style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.categories.slice(0, 8)}
                                    cx="50%" cy="45%"
                                    innerRadius={60} outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="count"
                                    nameKey="name"
                                >
                                    {data.categories.slice(0, 8).map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px", color: "#fff", fontSize: 12 }}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    formatter={(v: any, name: any) => [Number(v).toLocaleString() + " visits", String(name)]}
                                />
                                <Legend
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(value: string) => <span style={{ color: "#a78bfa", fontSize: 11 }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Top domains list */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white text-base">
                            Top Sites
                            <span className="ml-2 text-xs font-mono text-zinc-500">({data.topDomains.length} tracked)</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
                            {data.topDomains.slice(0, 20).map((domain, i) => {
                                const pct = data.totalVisits > 0
                                    ? (domain.count / data.totalVisits) * 100
                                    : 0;
                                return (
                                    <div key={i} className="group">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="text-purple-400 font-mono text-xs w-5 text-right flex-shrink-0">
                                                    {i + 1}
                                                </span>
                                                <span className="font-medium text-sm text-zinc-200 truncate group-hover:text-white transition-colors">
                                                    {domain.domain}
                                                </span>
                                            </div>
                                            <span className="font-mono text-xs text-zinc-400 flex-shrink-0 ml-2">
                                                {domain.count.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="ml-7 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                                                style={{ width: `${Math.min(pct * 5, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Full domain table */}
            {data.topDomains.length > 20 && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white text-base">All Tracked Sites</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                            {data.topDomains.map((domain, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <span className="text-purple-400 font-mono text-xs w-6 text-right opacity-60 group-hover:opacity-100 flex-shrink-0">
                                            #{i + 1}
                                        </span>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="font-medium text-sm text-zinc-200 truncate">{domain.domain}</span>
                                            {domain.category && (
                                                <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{domain.category}</span>
                                            )}
                                        </div>
                                    </div>
                                    <span className="font-mono text-xs text-zinc-400 flex-shrink-0 ml-2">
                                        {domain.count.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
