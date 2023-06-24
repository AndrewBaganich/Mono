import { PrismaClient } from '@prisma/client';
import mainUserId from '../constants.mjs';
import convertCurrency from '../exchangeLogic.mjs';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

export async function getCurr(){
    const curr = await prisma.currency.findMany()
    return curr
}

export async function getUserBalanceByUserId(id){
    const accounts = await prisma.accounts.findMany({
        where:{
            userId: id
        }
    })
    const balance = accounts.reduce((acc,element) => {
        acc[element.maskedPan] = element.balance
        return acc
    },{})
    return balance
}

export async function getTurnoverByUserId(id){
    const transactions = await prisma.transactions.findMany({
        where:{
            userId: id
        }
    })
    const turnover = transactions.reduce((acc,element) => {
        if (element.amount < 0) {
            return acc + element.amount * -1;
          }
          return acc + element.amount;
    },0)
    return turnover/100
}

export async function getTurnoverByUserIdInTime(id, from, to){
    const unixTimeFrom = DateTime.fromISO(from).toUnixInteger()
    const unixTimeTo = DateTime.fromISO(to).toUnixInteger()
    const transactions = await prisma.transactions.findMany({
        where:{
            userId: id,
            time: {
                gte: unixTimeFrom,
                lte: unixTimeTo,
            }
        }
    })
    const turnover = transactions.reduce((acc,element) => {
        if (element.amount < 0) {
            return acc + element.amount * -1;
          }
          return acc + element.amount;
    },0)
    return turnover/100
}

// console.log(await getCurr())
// console.log(await getUserBalanceByUserId(mainUserId.mainUserId))
// console.log(await getTurnoverByUserId(mainUserId.mainUserId))
// console.log(await convertCurrency(await getTurnoverByUserId(mainUserId.mainUserId), 'UAH', 'USD'))
console.log(await getTurnoverByUserIdInTime(mainUserId.mainUserId, '2023-06-12', '2023-06-19'))