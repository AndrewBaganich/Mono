import { sumOfTransactions } from "../src/secondaryFunctions";

const data = [{
    "id": "ZuHWzqkKGVo=",
    "time": 1554466347,
    "description": "Покупка щастя",
    "mcc": 7997,
    "originalMcc": 7997,
    "hold": false,
    "amount": -95000,
    "operationAmount": -95000,
    "currencyCode": 980,
    "commissionRate": 0,
    "cashbackAmount": 19000,
    "balance": 10050000,
    "comment": "за каву",
    "receiptId": "XXXX-XXXX-XXXX-XXXX",
    "invoiceId": "2103.в.27",
    "counterEdrpou": "3096889974",
    "counterIban": "UA898999980000355639201001404",
    "counterName": "ТОВАРИСТВО з ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «ВОРОНА»"
},
{
    "id": "kjljklkKGVo=",
    "time": 1554465347,
    "description": "Покупка щастя",
    "mcc": 7997,
    "originalMcc": 7997,
    "hold": false,
    "amount": 100000,
    "operationAmount": -95000,
    "currencyCode": 980,
    "commissionRate": 0,
    "cashbackAmount": 19000,
    "balance": 10050000,
    "comment": "за каву",
    "receiptId": "XXXX-XXXX-XXXX-XXXX",
    "invoiceId": "2103.в.27",
    "counterEdrpou": "3096889974",
    "counterIban": "UA898999980000355639201001404",
    "counterName": "ТОВАРИСТВО з ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «ВОРОНА»"
},
]

test('the function maps the array and returns the sum', ()=>{
    const result = sumOfTransactions(data)
    expect(result).toBe(195000);
})