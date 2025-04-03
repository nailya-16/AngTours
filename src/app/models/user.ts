export interface IUser {
    login: string
    password?: string
}

export interface IUserRegister {
    login: string;
    password?: string;
    email: string;
}

export interface Tour {
    id: string;
    name: string;
    img: string;
    description?: string;
    price: number;
  }
  
  