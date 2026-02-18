export interface HistoryItem {
    id: number;
    url: string;
    title: string;
    visitTime: number; // timestamp
    visitCount: number;
    typedCount: number;
}

export interface AnalyzedData {
    totalVisits: number;
    topDomains: { domain: string; count: number; category: string }[];
    visitsByHour: { hour: number; count: number }[];
    visitsByDayOfWeek: { day: string; count: number }[];
    visitsByDate: { date: string; count: number }[]; // For heatmap
    categories: { name: string; count: number }[];
    gems: { domain: string; count: number; category: string }[];
}

export interface WorkerMessage {
    type: 'PARSE';
    payload: File; // or Text
}

export interface WorkerResponse {
    type: 'RESULT' | 'ERROR';
    payload: AnalyzedData | string;
}
