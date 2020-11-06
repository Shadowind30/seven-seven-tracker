export interface Coords {
    latitude: number;
    longitude: number;
}

export interface History {
    location: Coords,
    time: string,
    message?: string
}