import cc from 'currency-codes';
import DatabaseHandler from "./prismaclient/getFromData.mjs";
import { getInverseRate, getRate, isCurr } from "./secondaryFunctions.js";

const databaseHandler = new DatabaseHandler();

async function convertCurrency(amount, from, to) {
  const currencies = await databaseHandler.getCurrencies();
  const fromCurrency = Number(cc.code(from).number);
  const toCurrency = Number(cc.code(to).number);

  isCurr(fromCurrency,toCurrency)

  const perfectCurrencyMatch = findCurrencyMatch(currencies, fromCurrency, toCurrency);

  if (perfectCurrencyMatch) {
    return amount * getRateIfExisting(perfectCurrencyMatch, fromCurrency, toCurrency);
  }

  const uahAmount = convertToUah(currencies, amount, fromCurrency);

  const convertedAmount = convertFromUah(currencies, uahAmount, toCurrency);

  return convertedAmount;
}

function findCurrencyMatch(currencies, fromCurrency, toCurrency) {
  return currencies.find(item =>
    (item.currencyCodeA === fromCurrency && item.currencyCodeB === toCurrency) ||
    (item.currencyCodeA === toCurrency && item.currencyCodeB === fromCurrency)
  );
}

function convertToUah(currencies, amount, fromCurrency) {
  const currencyAtoUahEntry = currencies.find(item =>
    (item.currencyCodeA === fromCurrency && item.currencyCodeB === 980) ||
    (item.currencyCodeA === 980 && item.currencyCodeB === fromCurrency)
  );

  const currencyAtoUahRate = getRateIfExisting(currencyAtoUahEntry, fromCurrency, 980);
  const uahAmount = currencyAtoUahRate * amount;

  return uahAmount;
}

function convertFromUah(currencies, uahAmount, toCurrency) {
  const currencyBtoUahEntry = currencies.find(item =>
    (item.currencyCodeA === 980 && item.currencyCodeB === toCurrency) ||
    (item.currencyCodeA === toCurrency && item.currencyCodeB === 980)
  );

  const convertedAmount = uahAmount * getRateIfExisting(currencyBtoUahEntry, 980, toCurrency);

  return convertedAmount;
}


export function getRateIfExisting(dataEntry, from, to) {
  if (dataEntry.currencyCodeA === from && dataEntry.currencyCodeB === to) {
    return getRate(dataEntry, from, to);
  } else {
    return getInverseRate(dataEntry, from, to);
  }
}

export default convertCurrency






  

