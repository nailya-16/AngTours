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
}

export interface ToursServerResponse {
    tours: Tour[];
}