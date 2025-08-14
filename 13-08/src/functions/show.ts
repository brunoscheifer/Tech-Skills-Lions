import { Request, Response } from "express";
import { clientes } from "../interfaces";

export async function show(req: Request, res: Response) {
    try{    
        if(!req.params.cpf) {
            return res.status(400).json({ message: 'Id não fornecido'})
        }
        
        const clienteCPF = req.params.cpf
        const cliente = clientes.find(u => u.Cpf == clienteCPF)

        if(!cliente) {
            return res.status(400).json({message: 'Usuario não encontrado'})
        }

        return res.status(200).json(cliente)
    } catch(error) {
        res.status(500).json({error: error})
    }
}