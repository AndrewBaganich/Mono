export function sumOfTransactions (data){
    return data.reduce((accum, element) => {
      if (element.amount < 0) {
        return accum + element.amount * -1;
      }
      return accum + element.amount;
    },0)
  }

export function isCurr (from, to){
    if (!from || !to) {
        return 'No such currency';
    } else {
        return true
    }
}

export function getRate(dataEntry) {
    if (dataEntry.rateCross) {
      return dataEntry.rateCross;
    } else {
      return dataEntry.rateBuy;
    }
}  

export function getInverseRate(dataEntry) {
    if (dataEntry.rateCross) {
      return 1 / dataEntry.rateCross;
    } else {
      return 1 / dataEntry.rateSell;
    }
  }