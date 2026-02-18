import { useState } from "react";
import { AnalyzedData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, BrainCircuit } from "lucide-react";

interface AiSummaryProps {
    data: AnalyzedData;
}

export function AiSummary({ data }: AiSummaryProps) {
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [model, setModel] = useState("gemini"); // 'gemini' | 'demo'

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
                // Mock response
                await new Promise(resolve => setTimeout(resolve, 1500));
                setSummary(`Wow, ${data.totalVisits} visits? You surely lived online this year. 🤡 
        Your obsession with ${data.topDomains[0]?.domain} is slightly concerning—are you okay? 
        Spending most of your time in ${data.categories[0]?.name} suggests you're either very productive or very good at pretending to be. 
        Also, being most active at ${data.visitsByHour.sort((a, b) => b.count - a.count)[0]?.hour}:00? Go touch some grass! 🌱`);
            } else {
                // Google Gemini API
                if (!apiKey) {
                    setSummary("Please enter a Google Gemini API Key. It's free!");
                    setLoading(false);
                    return;
                }

                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: prompt }]
                        }]
                    })
                });

                const json = await response.json();

                if (json.error) {
                    throw new Error(json.error.message || "Gemini API Error");
                }

                const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    setSummary(text);
                } else {
                    throw new Error("No response from AI.");
                }
            }
        } catch (err: any) {
            setSummary("Failed to generate summary: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-md overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/5 mask-gradient" />
            <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    <BrainCircuit className="w-5 h-5 text-purple-400" />
                    AI Roast & Insights
                </CardTitle>
                <CardDescription>
                    Get a personalized, AI-generated summary of your digital life.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
                {!summary && (
                    <div className="flex flex-col gap-4">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                            <span className="font-semibold">Tip:</span> Google Gemini API is free.
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline ml-1 hover:text-white">
                                Get your key here.
                            </a>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch gap-4">
                            <select
                                value={model}
                                onChange={e => setModel(e.target.value)}
                                className="p-2 rounded-lg bg-black/40 border border-white/10 text-sm focus:border-purple-500 outline-none transition-colors"
                            >
                                <option value="gemini">Google Gemini (Free)</option>
                                <option value="demo">Demo Mode (Mock)</option>
                            </select>

                            {model === "gemini" && (
                                <input
                                    type="password"
                                    placeholder="Paste your Gemini API Key..."
                                    value={apiKey}
                                    onChange={e => setApiKey(e.target.value)}
                                    className="flex-1 p-2 rounded-lg bg-black/40 border border-white/10 text-sm focus:border-purple-500 outline-none transition-colors"
                                />
                            )}
                        </div>

                        <button
                            onClick={generateSummary}
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                        >
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                            Generate My Wrapped
                        </button>
                    </div>
                )}

                {summary && (
                    <div className="mt-4 p-6 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
                        <p className="text-lg italic font-medium text-zinc-200 leading-relaxed whitespace-pre-wrap">
                            "{summary}"
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setSummary(null)} className="text-xs text-zinc-500 hover:text-white transition-colors">
                                Try Again
                            </button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
