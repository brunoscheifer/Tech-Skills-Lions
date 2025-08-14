interface IPessoa {
    Cpf: string,
    Nome: string,
    Rg: number
}

interface IEndereco {
    Cep: string, 
    Rua: string, 
    Bairro: string, 
    Cidade: string, 
    Estado: string
}

export interface ICliente extends IPessoa, IEndereco {
    Email: string
}

export let clientes: ICliente[] = [
    {
        Email: 'junin@email.com', 
        Cpf: '11122233344', 
        Nome: 'Junin', 
        Rg: 9312343214, 
        Cep: '1234564', 
        Rua: 'de mentira', 
        Bairro: 'iue', 
        Cidade: 'aquela famosa', 
        Estado: 'aquele famoso'
    },
    {
        Email: 'dalton@email.com', 
        Cpf: '89489489489', 
        Nome: 'dalton', 
        Rg: 48941494984, 
        Cep: '7894561', 
        Rua: 'rua ficticia', 
        Bairro: 'bairro delá', 
        Cidade: 'uma aí', 
        Estado: 'nsei'
    }
]