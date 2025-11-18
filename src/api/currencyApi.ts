import axios from 'axios';

const RATES_API = 'https://api.exchangerate-api.com/v4/latest';
const CURRENCIES_API = 'https://openexchangerates.org/api/currencies.json';
export const FLAG_API = 'https://flagcdn.com/w40/';


export const fetchExchangeRates = (base: string) => 
    axios.get(`${RATES_API}/${base}`).then(res => res.data);

export const fetchCurrencyNames = () => 
    axios.get(CURRENCIES_API).then(res => res.data);

