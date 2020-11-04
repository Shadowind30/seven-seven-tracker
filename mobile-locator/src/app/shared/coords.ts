export interface CoordsInterface {
    latitude: number;
    longitude: number;
}

export interface HistoryInterface {
    location: CoordsInterface,
    time: string
}