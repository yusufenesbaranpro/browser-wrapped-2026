import { useState } from "react";
import { AnalyzedData } from "@/lib/types";
import { Loader2, Sparkles, BrainCircuit } from "lucide-react";

interface AiSummarySlideProps {
    data: AnalyzedData;
    onComplete: () => void;
}

export function AiSummarySlide({ data, onComplete }: AiSummarySlideProps) {
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [model, setModel] = useState("demo"); // Default to demo for ease

    const generateSummary = async () => {
        setLoading(true);
        setSummary(null);

        // Prepare prompt
        const prompt = `
      You are a witty, sarcastic, and funny digital assistant analyzing a user's browser history.
      Based on the following stats, write a "Spotify Wrapped" style summary.
      Roast the user slightly but keep it friendly and fun.
      
      Stats:
      - Total Visits: ${data.totalVisits}
      - Top Category: ${data.categories[0]?.name || "Unknown"} with ${data.categories[0]?.count} visits
      - Top 3 Sites: ${data.topDomains.slice(0, 3).map(d => d.domain).join(", ")}
      - Peak Activity Hour: ${data.visitsByHour.sort((a, b) => b.count - a.count)[0]?.hour}:00
      - Most Active Day: ${data.visitsByDayOfWeek.sort((a, b) => b.count - a.count)[0]?.day}
      
      Keep it under 150 words. Use emojis.
    `;

        try {
            if (model === "demo") {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setSummary(`Wow, ${data.totalVisits.toLocaleString()} visits? You surely lived online this year. 🤡 
        Your obsession with ${data.topDomains[0]?.domain} is slightly concerning—are you okay? 
        Spending most of your time in ${data.categories[0]?.name} suggests you're either very productive or very good at pretending to be. 
        Also, being most active at ${data.visitsByHour.sort((a, b) => b.count - a.count)[0]?.hour}:00? Go touch some grass! 🌱`);
            } else {
                if (!apiKey) {
                    setSummary("Please enter a Google Gemini API Key. It's free!");
                    setLoading(false);
                    return;
                }

                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });

                const json = await response.json();
                if (json.error) throw new Error(json.error.message || "Gemini API Error");
                const text = json.candidates?.[0]?.content?.parts?.[0]?.text;

                if (text) setSummary(text);
                else throw new Error("No response from AI.");
            }
        } catch (err: any) {
            setSummary("Failed to generate summary: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
                The Verdict
            </h2>

            {!summary ? (
                <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
                    <div className="flex flex-col gap-2 text-center items-center">
                        <BrainCircuit className="w-12 h-12 text-purple-300 mb-2" />
                        <p className="text-purple-200">Ready for your personalized roast?</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 p-2 bg-black/20 rounded-lg">
                            <button
                                onClick={() => setModel('demo')}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${model === 'demo' ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-300 hover:bg-white/5'}`}
                            >
                                Demo Mode
                            </button>
                            <button
                                onClick={() => setModel('gemini')}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${model === 'gemini' ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-300 hover:bg-white/5'}`}
                            >
                                Gemini API
                            </button>
                        </div>

                        {model === 'gemini' && (
                            <div className="space-y-2">
                                <input
                                    type="password"
                                    placeholder="Paste Google Gemini API Key"
                                    value={apiKey}
                                    onChange={e => setApiKey(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-xs text-purple-400 hover:text-white underline block text-center">
                                    Get a free key here
                                </a>
                            </div>
                        )}

                        <button
                            onClick={generateSummary}
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-purple-900/30 flex items-center justify-center gap-2 group"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="group-hover:rotate-12 transition-transform" />}
                            Generate Wrapped
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-2xl bg-gradient-to-br from-purple-900/40 to-black/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 space-y-6">
                        <div className="text-4xl md:text-5xl">❝</div>
                        <p className="text-xl md:text-2xl font-heading leading-relaxed text-purple-100 whitespace-pre-wrap">
                            {summary}
                        </p>
                        <div className="text-right text-4xl md:text-5xl">❞</div>

                        <div className="flex flex-col gap-4 justify-center pt-8">
                            <button onClick={onComplete} className="px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                                See Full Dashboard
                            </button>
                            <button onClick={() => setSummary(null)} className="text-sm text-zinc-400 hover:text-white underline mt-2 text-center">
                                Analyze Again
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
