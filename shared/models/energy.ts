export interface Energy {
    startTime: string;
    settlementPeriod: number;
    data: Fuel[];
}

export interface Fuel {
    fuelType: string;
    generation: number;
}