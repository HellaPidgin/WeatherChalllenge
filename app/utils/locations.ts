export const locations = [
    {
        name: "London",
        latitude: 51.5072,
        longitude: 0.1276
    },
    {
        name: "Lagos",
        latitude: 6.4627, 
        longitude: 3.3997
    },
    {
        name: "Warsaw",
        latitude: 52.2297, 
        longitude: 21.0122
    },
    {
        name: "San Fransisco",
        latitude: 37.7749, 
        longitude: 122.4194
    }
]

export interface LocationType {
    name: string;
    latitude: number;
    longitude: number;
}