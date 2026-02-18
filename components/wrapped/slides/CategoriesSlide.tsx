import { AnalyzedData } from "@/lib/types";
import { useState, useEffect } from "react";
import {
    Search,
    Video,
    ShoppingBag,
    Code,
    MessageCircle,
    Globe,
    Briefcase,
    BookOpen,
    Music,
    Gamepad2,
    Newspaper,
    LayoutGrid,
} from "lucide-react";

interface CategoriesSlideProps {
    data: AnalyzedData;
}

const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('search') || lower.includes('productivity')) return <Search className="w-6 h-6" />;
    if (lower.includes('video') || lower.includes('streaming')) return <Video className="w-6 h-6" />;
    if (lower.includes('shopping')) return <ShoppingBag className="w-6 h-6" />;
    if (lower.includes('dev') || lower.includes('software')) return <Code className="w-6 h-6" />;
    if (lower.includes('social')) return <MessageCircle className="w-6 h-6" />;
    if (lower.includes('work') || lower.includes('business')) return <Briefcase className="w-6 h-6" />;
    if (lower.includes('learn') || lower.includes('education')) return <BookOpen className="w-6 h-6" />;
    if (lower.includes('music') || lower.includes('audio')) return <Music className="w-6 h-6" />;
    if (lower.includes('game') || lower.includes('gaming')) return <Gamepad2 className="w-6 h-6" />;
    if (lower.includes('news')) return <Newspaper className="w-6 h-6" />;
    return <Globe className="w-6 h-6" />;
};

export function CategoriesSlide({ data }: CategoriesSlideProps) {
    const sortedCategories = [...data.categories].sort((a, b) => b.count - a.count);
    const topCategories = sortedCategories.slice(0, 6);

    // Initialize with the top category
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        if (topCategories.length > 0 && !selectedCategory) {
            setSelectedCategory(topCategories[0].name);
        }
    }, [topCategories]);

    const currentCategory = selectedCategory || topCategories[0]?.name;

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl space-y-8 animate-in fade-in zoom-in-95 duration-700 p-6">
            <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-full mb-2 border border-purple-500/20">
                    <LayoutGrid className="w-6 h-6 text-purple-300" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Your Internet Universe
                </h2>
                <p className="text-purple-300/60 font-mono text-sm">Tap a category to explore</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {topCategories.map((cat, i) => {
                    const isSelected = currentCategory === cat.name;
                    return (
                        <button
                            key={i}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`
                                relative group p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300
                                ${isSelected
                                    ? 'bg-indigo-600/90 shadow-2xl shadow-indigo-500/20 scale-105 border-indigo-400 ring-1 ring-indigo-400/50'
                                    : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10 hover:scale-[1.02]'}
                                border
                            `}
                        >
                            <div className={`
                                p-3 rounded-xl transition-colors duration-300
                                ${isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-purple-200 group-hover:bg-white/10'}
                            `}>
                                {getCategoryIcon(cat.name)}
                            </div>

                            <div className="space-y-1">
                                <div className={`text-base font-heading font-medium transition-colors ${isSelected ? 'text-white' : 'text-purple-100'}`}>
                                    {cat.name}
                                </div>
                                <div className={`text-2xl font-mono font-bold ${isSelected ? 'text-white' : 'text-white/80'}`}>
                                    {cat.count.toLocaleString()}
                                </div>
                            </div>

                            {isSelected && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {currentCategory && (
                <div className="w-full bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                    <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-200">
                                {getCategoryIcon(currentCategory)}
                            </div>
                            <h3 className="text-lg font-heading text-purple-100">
                                Top Sites in <span className="text-white font-bold">{currentCategory}</span>
                            </h3>
                        </div>
                        <span className="text-xs font-mono text-purple-400 bg-white/5 px-2 py-1 rounded">
                            {data.categories.find(c => c.name === currentCategory)?.count} total visits
                        </span>
                    </div>

                    <div className="p-4 flex flex-col gap-3 max-h-[220px] overflow-y-auto custom-scrollbar">
                        {data.topDomains
                            .filter(d => d.category === currentCategory || (currentCategory === 'Other' && (!d.category || d.category === 'Other')))
                            .slice(0, 5)
                            .map((d, i) => {
                                const maxCount = data.topDomains.filter(x => x.category === currentCategory)[0]?.count || 1;
                                const pct = Math.round((d.count / maxCount) * 100);
                                return (
                                    <div key={i} className="flex items-center gap-3 group">
                                        <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 text-xs font-mono text-purple-300">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium text-sm text-purple-100 truncate group-hover:text-white transition-colors">
                                                    {d.domain}
                                                </span>
                                                <span className="font-mono text-xs text-purple-400 ml-2 whitespace-nowrap">
                                                    {d.count.toLocaleString()} visits
                                                </span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        {data.topDomains.filter(d => d.category === currentCategory).length === 0 && (
                            <div className="col-span-full py-8 text-center text-purple-400/50 flex flex-col items-center gap-2">
                                <Search className="w-8 h-8 opacity-50" />
                                <span className="text-sm">No specific sites found for this category</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
