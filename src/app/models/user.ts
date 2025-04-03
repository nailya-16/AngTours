export interface IUser {
    login: string
    password?: string
}

export interface IUserRegister {
    login: string;
    password?: string;
    email: string;
}

// models/tour.model.ts
export interface Tour {
    id: string;
    name: string;
    img: string;
    description?: string;
    price: number;
  }
  
  