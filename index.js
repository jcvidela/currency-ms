const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');

const app = express();
const port = 3000;

const BASE_URL = 'https://api.exchangerate-api.com';
const BACKDROP_URL = '/v4/latest/USD'
const updateInterval = '0 */4 * * *'; // Cada 4 horas

let exchangeRates = {};

async function updateExchangeRates() {
    try {
      // consultamos
      const response = await axios.get(BASE_URL + BACKDROP_URL);
      exchangeRates = response.data.rates;

      // escribimos el exchange rates (archivo json)
      fs.writeFileSync('exchange-rates.json', JSON.stringify(exchangeRates, null, 2));
      console.log('Tasas de cambio actualizadas:', exchangeRates);
    } catch (error) {
      console.error('Error al obtener tasas de cambio:', error.message);
    }
  }

// inicializamos el ms
updateExchangeRates();
cron.schedule(updateInterval, updateExchangeRates);


/**
 * @amount monto
 * @from la moneda desde la que quiero convertir
 * @to la moneda hacia la que quiero convertir
 */
app.get('/api/convert', (req, res) => {
    const { amount, from, to } = req.query;
  
    if (!amount || !from || !to) {
      return res.status(400).json({ error: 'Incomplete parameters. amount, from, and to are required.' });
    }
  
    if (!exchangeRates[from] || !exchangeRates[to]) {
      return res.status(400).json({ error: 'Currency not found in exchange rates.' });
    }
  
    const convertedAmount = (amount * exchangeRates[to]) / exchangeRates[from];
    res.json({ amount, from, to, convertedAmount });
  });
  

  // levantamos la app
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
