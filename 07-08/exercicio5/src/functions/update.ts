import { Request, Response } from "express";
import { user } from '../data'

export async function update(req: Request, res: Response){
    if(!req.params.id) {
        return res.status(200).json({message: "Id não fornecido"})
    }
    try {
        const userId = parseInt(req.params.id)
        const users = user.findIndex(u => u.id == userId)

        const updatedUser = req.body
        user[users] = updatedUser

        return res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({error: error})
    }
}