export interface IProduct{
    id: number,
    name: string,
    price: number,
    inStock: boolean,
    categories: string[]
};

export interface IUser{
    id: number,
    name: string,
    email: string,
    isActive: boolean
};