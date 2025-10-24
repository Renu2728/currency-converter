export const fetchExchangeRates = async (base: string) => {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
  return response.json();
};

export const fetchCurrencyNames = async () => {
  const response = await fetch('https://openexchangerates.org/api/currencies.json');
  return response.json();
};