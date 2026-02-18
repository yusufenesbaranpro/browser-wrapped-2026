"use client";

import { ExternalLink, Chrome } from "lucide-react";

export function ExportInstructions() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-24 p-6 animate-in fade-in slide-in-from-bottom-10 duration-700" id="export-instructions">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-16 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white">
                How to Export Your History?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Chromium / Extension Method */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                    <div className="w-16 h-16 mb-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Chrome className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Google Chrome</h3>
                    <p className="text-sm text-zinc-400 mb-6 font-mono">Also Brave, Opera, Vivaldi</p>

                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 w-full mb-6">
                        <div className="text-xs text-left mb-2 text-zinc-500 font-mono">RECOMMENDED METHOD</div>
                        <p className="text-sm text-zinc-300 mb-4">Use the "Export Chrome History" extension for the best results.</p>
                        <a
                            href="https://chromewebstore.google.com/detail/export-chrome-history/dihloblpkeiddiaojbagoecedbfpifdj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all font-medium text-sm shadow-lg shadow-blue-500/20"
                        >
                            <span>Get Extension</span>
                            <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                    </div>

                    <div className="text-xs text-zinc-500 leading-relaxed">
                        1. Install Extension<br />
                        2. Click icon & select "All Time"<br />
                        3. Download <strong>JSON</strong> or <strong>CSV</strong>
                    </div>
                </div>

                {/* Firefox Method */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                    <div className="w-16 h-16 mb-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5c0-5 5-5 5-5" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Firefox</h3>
                    <p className="text-sm text-zinc-400 mb-6 font-mono">Mozilla Firefox</p>

                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 w-full mb-6">
                        <p className="text-sm text-zinc-300 mb-4">Use the generic export tool or copy history file.</p>
                        <div className="text-xs text-zinc-500 italic">
                            Firefox export extensions are limited.
                        </div>
                    </div>

                    <div className="text-xs text-zinc-500 leading-relaxed">
                        Alternative: Press <strong>Ctrl+Shift+H</strong><br />
                        Import and Backup &gt; Export HTML
                    </div>
                </div>

                {/* Edge / Native Method */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                    <div className="w-16 h-16 mb-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M12 2v2" /><path d="M12 22v-2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M22 12h-2" /><path d="m4.93 19.07 1.41-1.41" /><path d="m17.66 6.34 1.41-1.41" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Microsoft Edge</h3>
                    <p className="text-sm text-zinc-400 mb-6 font-mono">Native Feature</p>

                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 w-full mb-6">
                        <p className="text-sm text-zinc-300 mb-4">Edge has a built-in CSV export feature.</p>
                        <button className="w-full px-4 py-2 bg-white/10 rounded-lg text-xs font-mono text-zinc-400 cursor-default">
                            edge://history
                        </button>
                    </div>

                    <div className="text-xs text-zinc-500 leading-relaxed">
                        1. Go to History (<strong>Ctrl+H</strong>)<br />
                        2. Click "..." (More options)<br />
                        3. Select "Export browsing data" (CSV)
                    </div>
                </div>
            </div>
        </div>
    );
}
