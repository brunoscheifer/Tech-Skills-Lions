interface IUser {
    id: Number,
    name: String,
    email: String,
    isActive: boolean
};

interface IProduct{
    id: Number,
    name: String,
    price: Number,
    inStock: boolean,
    categories: String[]
};

type UserRole = 'admin' | 'user';

interface IAdminUser extends IUser {
    role: UserRole
};

const adminUser: IAdminUser = {
    id: 9876,
    name: 'marcos',
    email: 'marcos@email.com',
    isActive: false,
    role: 'admin'
}

const user: IUser = {
    id: 1234,
    name: 'jonas',
    email: 'jonasmail@email.com',
    isActive: true,
}

const produto: IProduct = {
    id: 7654,
    name: "uva",
    price: 5.20,
    inStock: true,
    categories: ["Boa", "Ruim"]
}

console.log(adminUser, user, produto)
