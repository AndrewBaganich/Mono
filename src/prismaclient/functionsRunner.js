import convertCurrency from "../exchangeLogic.mjs";
import { getCurr, getTurnoverByUserId, getTurnoverByUserIdInTime, getUserBalanceByUserId } from "./getFromData";
import mainUserId from '../constants.mjs';

console.log(await getCurr())
console.log(await getUserBalanceByUserId(mainUserId.mainUserId))
console.log(await getTurnoverByUserId(mainUserId.mainUserId))
console.log(await convertCurrency(await getTurnoverByUserId(mainUserId.mainUserId), 'UAH', 'USD'))
console.log(await getTurnoverByUserIdInTime(mainUserId.mainUserId, '2023-06-12', '2023-06-19'))

