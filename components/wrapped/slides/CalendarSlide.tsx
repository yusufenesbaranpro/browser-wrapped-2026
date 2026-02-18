import { AnalyzedData } from "@/lib/types";

interface CalendarSlideProps {
    data: AnalyzedData;
}

export function CalendarSlide({ data }: CalendarSlideProps) {
    // Calendar Heatmap Logic
    const today = new Date();
    // Default to current year to match requested "revert" state
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    // Group by date map
    const dateMap = new Map(
        data.visitsByDate.map((v) => [v.date, v.count])
    );

    // Generate days
    const days: { date: Date, count: number }[] = [];
    for (let d = new Date(startOfYear); d <= endOfYear; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split("T")[0];
        days.push({
            date: new Date(d),
            count: dateMap.get(dateStr) || 0,
        });
    }

    const maxCount = Math.max(...data.visitsByDate.map(v => v.count), 1);

    const getColor = (count: number) => {
        if (count === 0) return "bg-white/5 opacity-50";
        const intensity = count / maxCount;
        if (intensity < 0.2) return "bg-purple-900";
        if (intensity < 0.4) return "bg-purple-800";
        if (intensity < 0.6) return "bg-purple-600";
        if (intensity < 0.8) return "bg-purple-500";
        return "bg-purple-300 shadow-lg shadow-purple-500/50";
    };

    // Group by month
    const months: { name: string, days: typeof days }[] = [];
    let currentMonth = -1;
    days.forEach(day => {
        const m = day.date.getMonth();
        if (m !== currentMonth) {
            months.push({
                name: day.date.toLocaleString('default', { month: 'long' }),
                days: []
            });
            currentMonth = m;
        }
        months[months.length - 1].days.push(day);
    });

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-center">
                Your Year at a Glance
            </h2>

            <div className="flex items-center gap-4 text-xs font-mono text-purple-300">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-white/5" />
                    <div className="w-3 h-3 bg-purple-900" />
                    <div className="w-3 h-3 bg-purple-600" />
                    <div className="w-3 h-3 bg-purple-300" />
                </div>
                <span>More</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full overflow-y-auto max-h-[60vh] p-4">
                {months.map((month, i) => (
                    <div key={i} className="flex flex-col gap-2 bg-white/5 rounded-xl p-4 border border-white/5 hover:border-purple-500/30 transition-colors">
                        <h3 className="font-mono text-sm font-bold text-white mb-2">{month.name}</h3>
                        <div className="grid grid-cols-7 gap-1">
                            {/* Day headers */}
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, k) => (
                                <div key={k} className="text-[8px] text-purple-400 text-center">{d}</div>
                            ))}

                            {/* Empty cells for start of month alignment */}
                            {Array.from({ length: month.days[0].date.getDay() }).map((_, k) => (
                                <div key={`empty-${k}`} />
                            ))}

                            {/* Days */}
                            {month.days.map((day, j) => (
                                <div
                                    key={j}
                                    title={`${day.date.toDateString()}: ${day.count} visits`}
                                    className={`aspect-square rounded-sm ${getColor(day.count)} transition-all hover:scale-150 tooltip`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
