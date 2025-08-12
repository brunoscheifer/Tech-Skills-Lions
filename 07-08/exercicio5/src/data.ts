export interface IUser{
    id: number,
    name: string,
    email: string,
    isActive: boolean
};

export const user: IUser[] = [{
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