import { Request, Response } from "express";
import { user } from '../data'

export async function show(req: Request, res: Response) {
    try{    
        if(!req.params.id) {
            return res.status(400).json({ message: 'Id não fornecido'})
        }
        
        const userId = parseInt(req.params.id)
        const users = user.find(u => u.id == userId)

        if(!users) {
            return res.status(400).json({message: 'Usuario não encontrado'})
        }

        return res.status(200).json(users)
    } catch(error) {
        res.status(500).json({error: error})
    }
}