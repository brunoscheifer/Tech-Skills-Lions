import { Request, Response } from "express";
import { clientes } from "../interfaces";

export async function index(req: Request, res: Response) {
    return res.send({clientes: clientes})
}