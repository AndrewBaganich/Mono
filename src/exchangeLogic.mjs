import { getCurr } from "./prismaclient/getFromData.js";
// import {monobankRequest} from "./monoRequest.mjs";
import cc from 'currency-codes';
// import monoUrls from './constants.mjs';


async function convertCurrency(amount, from, to) {
  let fromCurrency;
  let toCurrency;

  if(cc.code(from) && cc.code(to)){
    fromCurrency = Number(cc.code(from).number)
    toCurrency = Number(cc.code(to).number)
  } else {
    return 'No such currency'
  }
  
  let data = await getCurr();

  const perfectCurrencyMatch = data.find(item => {
    return (item.currencyCodeA === fromCurrency && item.currencyCodeB === toCurrency) ||
    (item.currencyCodeA === toCurrency && item.currencyCodeB === fromCurrency)
  })

  if(perfectCurrencyMatch){
    return amount * getRateIfExisting(perfectCurrencyMatch, fromCurrency, toCurrency)
  } else {
    const currencyAtoUahEntry = data.find(item => {
      return (item.currencyCodeA === fromCurrency && item.currencyCodeB === 980) ||
      (item.currencyCodeA === 980 && item.currencyCodeB === fromCurrency)
    })
    const currencyAtoUahRate = getRateIfExisting(currencyAtoUahEntry, fromCurrency, 980)
    
    const uahAmount = currencyAtoUahRate * amount

    const currencyBtoUahEntry = data.find(item => {
      return (item.currencyCodeA === 980 && item.currencyCodeB === toCurrency) ||
      (item.currencyCodeA === toCurrency && item.currencyCodeB === 980)
    })

    const convertedAmount = uahAmount * getRateIfExisting(currencyBtoUahEntry, 980, toCurrency)

    return convertedAmount
  }
}

function getRateIfExisting(dataEntry, from, to) {
  if(dataEntry.currencyCodeA === from && dataEntry.currencyCodeB === to){
    if(dataEntry.rateCross){
      return dataEntry.rateCross
    } else {
      return dataEntry.rateBuy
    }
  } else {
    if(dataEntry.rateCross){
      return 1/dataEntry.rateCross
    } else {
      return 1/dataEntry.rateSell
    }
  }
};

export default convertCurrency






  

