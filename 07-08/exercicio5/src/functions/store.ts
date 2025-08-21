import { Request, Response } from "express";
import { user } from '../data'

export async function store(req: Request, res: Response) {
    const newUser = req.body
    try {
        if(!newUser.id || !newUser.name || !newUser.email || !newUser.isActive) {
        return res.status(400).json({message: 'Dados incompletos'})
    }

        user.push(newUser)
        return res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({message: error})
    }
}