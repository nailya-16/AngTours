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