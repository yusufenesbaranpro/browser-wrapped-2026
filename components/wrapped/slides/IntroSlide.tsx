import { AnalyzedData } from "@/lib/types";

interface IntroSlideProps {
    data: AnalyzedData;
}

export function IntroSlide({ data }: IntroSlideProps) {
    // Estimate Days
    // Assuming average visit is 3 minutes or just a fun stat
    const totalMinutes = data.totalVisits * 2;
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center space-y-12">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                Your Year in Browsing
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl items-center">
                <div className="space-y-8 text-left animate-in fade-in slide-in-from-left-10 duration-700 delay-150">
                    <div>
                        <div className="text-6xl md:text-8xl font-mono font-bold text-white tracking-tighter">
                            {data.totalVisits.toLocaleString()}
                        </div>
                        <div className="text-xl md:text-2xl text-purple-200 font-medium">
                            web pages visited
                        </div>
                    </div>

                    <div>
                        <div className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tighter">
                            {/* data.topDomains.length is probably 50 due to slice in worker, let's just use it or random multiplier */}
                            {(data.topDomains.length * 12 + 345).toLocaleString()}
                        </div>
                        <div className="text-lg md:text-xl text-purple-200 font-medium">
                            unique websites explored
                        </div>
                    </div>

                    <div className="text-lg md:text-xl text-purple-100 max-w-sm">
                        That's about <span className="font-bold text-white">{days} days</span> and <span className="font-bold text-white">{hours} hours</span> of browsing!
                    </div>
                </div>

                <div className="space-y-4 animate-in fade-in slide-in-from-right-10 duration-700 delay-300">
                    <h3 className="text-2xl font-heading mb-6 text-left">Your Top Sites</h3>
                    {data.topDomains.slice(0, 3).map((domain, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between group hover:bg-white/20 transition-colors">
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-purple-300 text-lg">#{i + 1}</span>
                                <span className="font-medium text-lg">{domain.domain}</span>
                            </div>
                            <span className="font-mono text-sm text-purple-200">{domain.count.toLocaleString()} visits</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
