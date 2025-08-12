import express from 'express'

import { index } from './functions/index'
import { show } from './functions/show'
import { store } from './functions/store'
import { update } from './functions/update'
import { destroy } from './functions/destroy'

const app= express()
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