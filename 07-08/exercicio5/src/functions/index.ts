import { Request, Response } from 'express';
import { user} from '../data';


export async function index(req: Request, res: Response) {
    return res.status(200).json(user)
}