import { getInverseRate } from "../src/secondaryFunctions";

const testData = {
    currencyCodeA: 980,
    currencyCodeB: 840,
    rateBuy: 2,
    rateCross: 0,
    rateSell: 5
}
const testData2 = {
    currencyCodeA: 980,
    currencyCodeB: 840,
    rateBuy: 0,
    rateCross: 2,
    rateSell: 0
}

test('test function if condition is true', ()=>{
    const result = getInverseRate(testData, 980, 840);
    expect(result).toBe(0.2);
})

test('test function if condition is false', ()=>{
    const result = getInverseRate(testData2, 980, 840);
    expect(result).toBe(0.5);
})