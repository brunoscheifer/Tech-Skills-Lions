import { Request, Response } from "express";
import { clientes, ICliente } from "../interfaces";
import {isCPF} from 'validation-br'

function isICliente(obj: any): obj is ICliente {
    return (
        typeof obj.Nome === 'string' &&
        typeof obj.Cpf === 'string' &&
        typeof obj.Rua === 'string' &&
        typeof obj.Cidade === 'string' &&
        typeof obj.Cep === 'string' &&
        typeof obj.Bairro === 'string' &&
        typeof obj.Email === 'string' &&
        typeof obj.Rg === 'number' &&
        typeof obj.Estado === 'string'
    );
}

export async function store(req: Request, res: Response) {
    const newCliente = req.body
    try {
        if(!newCliente) {
            return res.status(400).json({ error: "O corpo da requisição está vazio." });
        }

        if(!isICliente(newCliente)) {
            return res.status(400).json({ error: "O corpo da requisição não contém todas as informações necessárias para um cliente." });
        }
        
        if(!isCPF(newCliente.Cpf)){
            return res.status(400).json({ error: "O CPF é invalido"})
        }

        const newClientes: ICliente = newCliente;

        clientes.push(newClientes)

        return res.status(200).json({message: newClientes})
    } catch (error) {
        res.status(500).json({error: error})
    }
}