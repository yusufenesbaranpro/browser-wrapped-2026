import { AnalyzedData } from "@/lib/types";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

interface GemsSlideProps {
    data: AnalyzedData;
}

export function GemsSlide({ data }: GemsSlideProps) {
    // Use worker-provided gems, or fallback to random selection from top domains if needed
    // The worker logic ensures we get low-visit sites if available
    const gems = data.gems && data.gems.length > 0
        ? data.gems
        : data.topDomains.slice(-5).reverse(); // Fallback: least visited among top 100

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl space-y-12 px-4">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4 animate-in zoom-in duration-700">
                    <Sparkles className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-heading animate-in fade-in slide-in-from-top-10 duration-700">
                    Hidden Gems
                </h2>
                <p className="text-purple-200/60 font-mono text-sm max-w-md mx-auto">
                    The obscure corners of the web you visited just a few times. Forgotten tabs, one-off searches, and brief encounters.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {gems.slice(0, 6).map((gem, i) => (
                    <motion.a
                        key={i}
                        href={`https://${gem.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="group relative flex flex-col gap-3 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <img
                                src={`https://www.google.com/s2/favicons?domain=${gem.domain}&sz=32`}
                                alt=""
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                className="w-6 h-6 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-amber-400 transition-colors" />
                        </div>

                        <div className="min-w-0">
                            <div className="font-bold text-white truncate group-hover:text-amber-200 transition-colors">
                                {gem.domain}
                            </div>
                            <div className="text-xs font-mono text-white/40 mt-1 flex items-center justify-between">
                                <span>{gem.category || "Unknown"}</span>
                                <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-amber-500/80">
                                    {gem.count} visit{gem.count !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

            {gems.length === 0 && (
                <div className="text-center text-white/30 font-mono text-sm mt-8">
                    No hidden gems found! You seem to stick to the beaten path.
                </div>
            )}
        </div>
    );
}
