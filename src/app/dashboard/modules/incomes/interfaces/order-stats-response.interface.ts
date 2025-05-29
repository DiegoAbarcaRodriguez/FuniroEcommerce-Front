export interface OrderStatsResponse {
    ok:           boolean;
    incomesStats: IncomesStat[];
}

export interface IncomesStat {
    key:        string;
    percentage: number;
    total:      number;
}
