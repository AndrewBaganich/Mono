import convertCurrency from "./exchangeLogic.mjs";
import mainUserId from './constants.mjs';
import {monoUrls} from './constants.mjs';
import DatabaseHandler from "./prismaclient/getFromData.mjs";
import MonobankService from "./monobankClient/monobankRequestService";




const databasehandler = new DatabaseHandler();

console.log(await databasehandler.getCurrencies());
console.log(await databasehandler.getUserBalanceByUserId(mainUserId.mainUserId));
console.log(await databasehandler.getTurnoverByUserId(mainUserId.mainUserId));
console.log(await convertCurrency(await databasehandler.getTurnoverByUserId(mainUserId.mainUserId), 'UAH', 'USD'));
console.log(await databasehandler.getTurnoverByUserIdInTime(mainUserId.mainUserId, '2023-06-12', '2023-06-19'));

const monoService = new MonobankService();
const turnoverLastWeek = await monoService.cardTurnoverLastWeek(monoUrls.turnoverUrl, monoUrls.mainCardId);

console.log( await monoService.clientInformation(monoUrls.userUrl));
console.log(await convertCurrency(turnoverLastWeek,'UAH', 'USD'));
console.log( await monoService.userBalanceInCurr('USD', monoUrls.userUrl));
