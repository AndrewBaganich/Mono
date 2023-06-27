import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';
import { sumOfTransactions } from '../secondaryFunctions.js';

const prisma = new PrismaClient();

class DatabaseHandler {
    async getCurrencies() {
      const curr = await prisma.currency.findMany();
      return curr;
    }

    async getUserBalanceByUserId(id) {
      const accounts = await prisma.accounts.findMany({
        where: {
          userId: id,
        },
      });
  
      const balance = accounts.reduce((acc, element) => {
        acc[element.maskedPan] = element.balance;
        return acc;
      }, {});
  
      return balance;
    }
  
    async getTurnoverByUserId(id) {
      const transactions = await prisma.transactions.findMany({
        where: {
          userId: id,
        },
      });

      const turnover = sumOfTransactions(transactions)
      return turnover / 100;
    }
  
    async getTurnoverByUserIdInTime(id, from, to) {
      const unixTimeFrom = DateTime.fromISO(from).toUnixInteger();
      const unixTimeTo = DateTime.fromISO(to).toUnixInteger();
      const transactions = await prisma.transactions.findMany({
        where: {
          userId: id,
          time: {
            gte: unixTimeFrom,
            lte: unixTimeTo,
          },
        },
      });
      const turnover = sumOfTransactions(transactions)
      return turnover / 100;
    }
}

export default DatabaseHandler;