import express from 'express'
import validationBR from 'validation-br'
import {Request, Response} from 'express'
import cep from 'cep-promise';

import { index } from './functions/index';
import { show } from './functions/show';
import { store } from './functions/store';
import { update } from './functions/update';
import { destroy } from './functions/destroy';

const app = express();
const port: number = 3000;

app.use(express.json());

app.get('/valida-cpf/:cpf', (req: Request , res: Response) =>  {
    if(validationBR.isCPF(req.params.cpf!)) {
        return res.send('CPF Valido')
    } else {
        res.send('CPF Invalido')
    }
})

app.get('/valida-cep/:cep', async (req: Request, res: Response)=> {
    const dados = await cep(req.params.cep!)
        .then((data) => {return data})
        .catch((error) => {return error});

    return res.json({dados: dados && console.log(dados)});
})

app.get('/clientes', index)
app.get('/clientes/:cpf', show)
app.post('/clientes', store)
app.put('/clientes/:cpf', update)
app.delete('/clientes/:cpf', destroy)

cep('84031340')
  .catch(console.log)
	
app.listen(port, () => {
    console.log("Api iniciada na porta: " + port);
});