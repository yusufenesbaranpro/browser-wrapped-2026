"use client";

import { useState, useEffect } from "react";
import { AnalyzedData } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigLeft, ArrowBigRight, Download } from "lucide-react";
import { IntroSlide } from "./slides/IntroSlide";
import { TopSitesSlide } from "./slides/TopSitesSlide";
import { CategoriesSlide } from "./slides/CategoriesSlide";
import { HourlySlide } from "./slides/HourlySlide";
import { CalendarSlide } from "./slides/CalendarSlide";
import { GemsSlide } from "./slides/GemsSlide";
import { FinalSummarySlide } from "./slides/FinalSummarySlide";

interface WrappedPresentationProps {
    data: AnalyzedData;
    onReset: () => void;
    onComplete: () => void;
}

const SLIDES = [
    { id: "intro", label: "Intro" },
    { id: "topsites", label: "Top Sites" },
    { id: "cats", label: "Categories" },
    { id: "rhythms", label: "Daily Rhythms" },
    { id: "calendar", label: "Year at a Glance" },
    { id: "gems", label: "Hidden Gems" },
    { id: "summary", label: "Year in Review" },
];

export function WrappedPresentation({ data, onReset, onComplete }: WrappedPresentationProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (newDirection: number) => {
        const next = currentSlide + newDirection;
        if (next >= 0 && next < SLIDES.length) {
            setDirection(newDirection);
            setCurrentSlide(next);
        }
    };

    const goTo = (idx: number) => {
        setDirection(idx > currentSlide ? 1 : -1);
        setCurrentSlide(idx);
    };

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 1000 : -1000, opacity: 0 }),
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") paginate(1);
            if (e.key === "ArrowLeft") paginate(-1);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentSlide]);

    const isFirst = currentSlide === 0;
    const isLast = currentSlide === SLIDES.length - 1;

    return (
        <div className="fixed inset-0 w-full h-full bg-black text-white overflow-hidden font-heading">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#8b5cf6_0%,_#6d28d9_40%,_#4c1d95_80%,_#1e1b4b_100%)] z-0" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 z-0 pointer-events-none" />
            <div className="absolute top-10 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-blob" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-blob animation-delay-2000" />

            {/* Prev button */}
            <button
                onClick={() => paginate(-1)}
                disabled={isFirst}
                className={`fixed left-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all ${isFirst ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
                <ArrowBigLeft className="w-8 h-8 text-white" />
            </button>

            {/* Next button */}
            <button
                onClick={() => paginate(1)}
                disabled={isLast}
                className={`fixed right-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all ${isLast ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
                <ArrowBigRight className="w-8 h-8 text-white" />
            </button>

            {/* Slide content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-12 pt-16 pb-20">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="w-full max-w-5xl h-full flex flex-col items-center justify-center overflow-y-auto"
                    >
                        {currentSlide === 0 && <IntroSlide data={data} />}
                        {currentSlide === 1 && <TopSitesSlide data={data} />}
                        {currentSlide === 2 && <CategoriesSlide data={data} />}
                        {currentSlide === 3 && <HourlySlide data={data} />}
                        {currentSlide === 4 && <CalendarSlide data={data} />}
                        {currentSlide === 5 && <GemsSlide data={data} />}
                        {currentSlide === 6 && <FinalSummarySlide data={data} onComplete={onComplete} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom progress dots + slide name */}
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    {SLIDES[currentSlide].label}
                </span>
                <div className="flex gap-2">
                    {SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goTo(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Top right controls */}
            <div className="fixed top-4 right-4 z-50 flex gap-3">
                <button
                    onClick={onReset}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-sm font-mono transition-colors"
                >
                    Start Over
                </button>
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors">
                    <Download className="w-5 h-5" />
                </button>
            </div>

            {/* Slide counter top left */}
            <div className="fixed top-4 left-4 z-50 text-xs font-mono text-white/30">
                {currentSlide + 1} / {SLIDES.length}
            </div>
        </div>
    );
}
