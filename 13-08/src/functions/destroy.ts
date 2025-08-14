import { Request, Response } from "express";
import { clientes } from "../interfaces";

export async function destroy(req: Request, res: Response) {
    try {
        if(!req.params.cpf) {
            return res.status(200).json({message: "cpf não fornecido"})
        }

        const clientecpf = req.params.cpf
        const cliente = clientes.findIndex(u => u.Cpf == clientecpf)

        clientes.splice(cliente, 1)

        return res.status(200).json('Usuario deletado')
    } catch (error) {
        
    }
}