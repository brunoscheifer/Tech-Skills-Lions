import express, { Request, Response } from 'express';
import axios from 'axios';
import { AllCountriesSchema, Regions } from './interfaces';

const API_URL = 'https://restcountries.com/v3.1/all';

const app = express();
const port: number = 3000;

app.use(express.json());

app.get('/countries', async (req: Request, res: Response) => {
  try {
    const API_URL_WITH_FIELDS = API_URL + '?fields=name,region,capital,population,flags';

    const response = await fetch(API_URL_WITH_FIELDS);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(503).json({ message: 'Erro ao buscar dados da API externa.', details: `Status ${response.status}: ${errorText}` });
    }

    const data = await response.json();
    const validationResult = AllCountriesSchema.safeParse(data);

    if (validationResult.success) {
      res.json(validationResult.data);
    } else {
      res.status(500).json({ message: 'Falha na validação dos dados da API.', details: validationResult.error.issues });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
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
      country.name
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
    const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);

    const validationResult = AllCountriesSchema.safeParse(response.data);

    if (validationResult.success) {
      res.json(validationResult.data);
    } else {
      res.status(500).json({ message: 'Falha na validação dos dados da API.', details: validationResult.error.issues });
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição para a API externa:', error.message);
      res.status(503).json({ message: 'Erro ao buscar dados da API externa.', details: error.message });
    } else {
      res.status(500).json({ message: 'Ocorreu um erro inesperado.' });
    }
  }
});

app.listen(port, () => {
  console.log("API iniciada na porta: " + port);
});