export interface TotalAverage {
    ok: boolean;
    total: number;
    average: Average;
}

export interface Average {
    _avg: Avg;
}

export interface Avg {
    grade: number;
}
