import express, { Request, Response } from 'express';
import axios from 'axios';
import { AllCountriesSchema, Regions } from './interfaces';

const API_URL = 'https://restcountries.com/v3.1/';

const app = express();
const port: number = 3000;

app.use(express.json());

// A função loadCountries não é mais necessária, pois cada rota fará a requisição

app.get('/countries', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(API_URL);
    const validationResult = AllCountriesSchema.safeParse(response.data);

    if (validationResult.success) {
      res.json(validationResult.data);
    } else {
      res.status(500).json({ message: 'Falha na validação dos dados da API.', details: validationResult.error.issues });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(503).json({ message: 'Erro ao buscar dados da API externa.', details: error.message });
    } else {
      res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }
});

app.get('/countries/search', async (req: Request, res: Response) => {
  const searchTerm = req.query.name as string;

  if (!searchTerm) {
    return res.status(400).json({ message: 'O parâmetro de busca "name" é obrigatório.' });
  }

  try {
    const response = await axios.get(API_URL);
    const validationResult = AllCountriesSchema.safeParse(response.data);

    if (!validationResult.success) {
      return res.status(500).json({ message: 'Falha na validação dos dados da API.', details: validationResult.error.issues });
    }

    const allCountries = validationResult.data;

    const filteredCountries = allCountries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.json(filteredCountries);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(503).json({ message: 'Erro ao buscar dados da API externa.', details: error.message });
    } else {
      res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }
});

app.get('/countries/filter', async (req: Request, res: Response) => {
  const region = req.query.region as string;

  if (!region) {
    return res.status(400).json({ message: 'O parâmetro de filtro "region" é obrigatório.' });
  }

  const regionValidation = Regions.safeParse(region);
  if (!regionValidation.success) {
    return res.status(400).json({ message: `Região inválida. Regiões permitidas: ${Regions.options.join(', ')}` });
  }

  try {
    const response = await axios.get(API_URL, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.26.8'
      }
    });
    const validationResult = AllCountriesSchema.safeParse(response.data);

    if (!validationResult.success) {
      return res.status(500).json({ message: 'Falha na validação dos dados da API.', details: validationResult.error.issues });
    }

    const allCountries = validationResult.data;

    const filteredCountries = allCountries.filter(country =>
      country.region.toLowerCase() === region.toLowerCase()
    );

    res.json(filteredCountries);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(503).json({ message: 'Erro ao buscar dados da API externa.', details: error.message });
    } else {
      res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }
});

app.listen(port, () => {
  console.log("API iniciada na porta: " + port);
});