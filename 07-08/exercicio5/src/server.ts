import express from 'express'
import morgan from "morgan";
import { Request, Response, NextFunction } from 'express'

import { index } from './functions/index'
import { show } from './functions/show'
import { store } from './functions/store'
import { update } from './functions/update'
import { destroy } from './functions/destroy'

const app = express()
app.use(morgan(":method :url :status :date"));

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Algo quebrou!');
    res.json({message: err.stack})
};
app.use(errorHandler)

const port: number = 3000

app.use(express.json())

app.get('/users', index)
app.get('/users/:id', show)
app.post('/users', store)
app.put('/users/:id', update)
app.delete('/users/:id', destroy)

app.listen(port, () => {
    console.log('O servidor está rodando na porta: ' + port)
}) 