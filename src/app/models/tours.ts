export interface Tour {
    id: string;
    name: string;
    img: string;
    description: string;
    price: string;
    tourOperator: string;
    type?: string;
    date?: string;
    locationId: string;
    country? : ICountriesResponseItem;
    code?: string;
    inBasket?: boolean;
}

export interface ToursServerResponse {
    tours: Tour[];
}

export interface ITourType { 
    key: string;
    label: string
 }

export interface ICountriesResponseItem {
    iso_code2: string;
    iso_code3: string;
    name_ru: string;
    flag_url: string;
}

export interface ILocation {
    lat: number;
    lng: number;
}
export type Coords = {
    latlng: [number, number]
}