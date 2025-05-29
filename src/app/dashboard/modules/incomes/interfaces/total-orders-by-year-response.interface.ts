export interface TotalOrdersByYear {
    ok:           boolean;
    totalsByYear: TotalsByYear[];
}

export interface TotalsByYear {
    date_part: number;
    total:     number;
}
