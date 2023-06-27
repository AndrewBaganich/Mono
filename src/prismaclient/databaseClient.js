import { monoUrls } from './constants.mjs';
import { monobankServise } from './monobankRequestService'
import { PrismaClient } from '@prisma/client';
import { monobankRequest } from './monoRequest.mjs';


const prisma = new PrismaClient();


const clientInfo = await monobank.clientInformation(monoUrls.userUrl);
const transactions = await monobank.cardTurnover(monoUrls.turnoverUrl, monoUrls.mainCardId);
const currencyData = await monobankRequest(monoUrls.exchangeUrl)

function dataProcessing (data){
  data.map((transaction) => ({
    //вывести в отедльную функцию
    transactionId: transaction.id,
    time: transaction.time,
    description: transaction.description,
    mcc: transaction.mcc,
    originalMcc: transaction.originalMcc,
    hold: transaction.hold,
    amount: transaction.amount,
    operationAmount: transaction.operationAmount,
    currencyCode: transaction.currencyCode,
    commissionRate: transaction.commissionRate,
    cashbackAmount: transaction.cashbackAmount,
    balance: transaction.balance,
    comment: transaction.comment || '',
    receiptId: transaction.receiptId || '',
    invoiceId: transaction.invoiceId || '',
    counterEdrpou: transaction.counterEdrpou || '',
    counterIban: transaction.counterIban || '',
    counterName: transaction.counterName || ''
  }))
}


async function addUserInfoToDatabase(userData, transactionsData) {
  try {
    await prisma.user.create({
      data: {
        clientId: userData.clientId,
        name: userData.name,
        webHookUrl: userData.webHookUrl,
        permissions: userData.permissions,
        accounts: {
          createMany: {
            data: userData.accounts
          },
        },
        jars: {
          createMany: {
            data: userData.jars
          },
        },
        transactions: {
          createMany: {
            data: dataProcessing(transactionsData)
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function addCurrencyDataToDatabase(currData) {
  try {
    await prisma.currency.createMany({
      data: currData
    });
  } catch (error) {
    console.error(error);
  }
}

addUserInfoToDatabase(clientInfo, transactions);
addCurrencyDataToDatabase(currencyData);









