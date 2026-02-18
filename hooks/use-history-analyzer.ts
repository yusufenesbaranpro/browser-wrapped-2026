import { useState, useRef, useEffect } from "react";
import { AnalyzedData, WorkerResponse } from "@/lib/types";

export function useHistoryAnalyzer() {
    const [data, setData] = useState<AnalyzedData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        workerRef.current = new Worker("/worker.js");
        workerRef.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
            const { type, payload } = event.data;
            if (type === "RESULT") {
                setData(payload as AnalyzedData);
                setLoading(false);
            } else if (type === "ERROR") {
                setError(payload as string);
                setLoading(false);
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const analyze = (file: File) => {
        setLoading(true);
        setError(null);
        workerRef.current?.postMessage(file);
    };

    return { analyze, data, loading, error };
}
