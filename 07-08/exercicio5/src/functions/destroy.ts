import { Request, Response } from "express";
import { user } from '../data'

export async function destroy(req: Request, res: Response) {
    try {
        if(!req.params.id) {
            return res.status(200).json({message: "Id não fornecido"})
        }

        const userId = parseInt(req.params.id)
        const users = user.findIndex(u => u.id == userId)

        user.splice(users, 1)

        return res.status(200).json('Usuario deletado')
    } catch (error) {
        res.status(400).json({message: error})
    }
}