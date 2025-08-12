import {IUser, IProduct} from "./interfaces";

const user: IUser[] = [{
    id: 1234,
    name: 'jonas',
    email: 'jonasmail@email.com',
    isActive: true,
},
{
    id: 9875,
    name: 'msd',
    email: 'asd@email.com',
    isActive: false,
}];

const produto: IProduct[] = [{
    id: 7654,
    name: "uva",
    price: 5.20,
    inStock: true,
    categories: ["Boa", "Ruim"]
},
{
    id: 14,
    name: "melao",
    price: 12.20,
    inStock: false,
    categories: ["Bom", "Ruim"]
}];

function getData<T>(itens: T[]): T[] {
    return itens;
};

console.log(getData<string>(['oi','tchau',' não sei mais']));
console.log(getData<number>([1, 9, 0]));
console.log(getData<IUser>(user));



function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id)
};

console.log(getById(user, 1234));
console.log(getById(produto, 14));