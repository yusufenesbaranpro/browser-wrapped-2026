import { AnalyzedData } from "@/lib/types";

interface TopSitesSlideProps {
    data: AnalyzedData;
}

export function TopSitesSlide({ data }: TopSitesSlideProps) {
    const maxVisits = Math.max(...data.topDomains.map(d => d.count), 1);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8 animate-in fade-in slide-in-from-top-10 duration-700">
                Your Top Destinations
            </h2>

            <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10 animate-in zoom-in-95 duration-700">
                <div className="flex items-center justify-between mb-8 text-purple-200">
                    <h3 className="text-xl font-heading flex items-center gap-2">
                        <span className="text-2xl">🌐</span>
                        Your Digital Time
                    </h3>
                    <span className="text-sm font-mono opacity-60">Estimated Time</span>
                </div>

                <div className="space-y-8">
                    {data.topDomains.slice(0, 5).map((domain, i) => {
                        const percentage = (domain.count / data.totalVisits) * 100;
                        // Fake hours per user preference
                        const hours = Math.round(domain.count * 3 / 60);

                        // Deterministik dakika hesabı (hydration hatasını önlemek için)
                        // Karakter kodlarını toplayıp mod alarak "rastgele" ama sabit bir sayı üret
                        const minutes = domain.domain.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 60;

                        return (
                            <div key={i} className="group relative">
                                <div className="flex items-end justify-between mb-2">
                                    <span className="text-lg md:text-xl font-bold font-mono text-white flex items-center gap-2">
                                        {domain.domain}
                                        <span className="text-xs font-normal text-purple-300 ml-2">{domain.count.toLocaleString()} visits</span>
                                    </span>
                                    <span className="text-sm md:text-md font-mono text-purple-200">
                                        {hours}h {minutes}m
                                    </span>
                                </div>

                                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative">
                                    {/* Width based on absolute scaling max */}
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${(domain.count / maxVisits) * 100}%` }}
                                    />
                                </div>

                                <div className="mt-1 text-xs text-purple-400 font-mono">
                                    {percentage > 1 ? Math.round(percentage) : '< 1'}% of total activity
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
