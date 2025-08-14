import { Request, Response } from "express";
import { clientes } from "../interfaces";

export async function update(req: Request, res: Response){
    if(!req.params.cpf) {
        return res.status(200).json({message: "cpf não forneccpfo"})
    }
    try {
        const clientecpf = req.params.cpf
        const cliente = clientes.findIndex(u => u.Cpf == clientecpf)

        const updatedcliente = req.body
        clientes[cliente] = updatedcliente

        return res.status(200).json(updatedcliente)
    } catch (error) {
        res.status(500).json({error: error})
    }
}