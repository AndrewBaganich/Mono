import { DateTime } from 'luxon';
import { monobankRequest} from "./monoRequest.mjs";
import covertCurrency from '../exchangeLogic.mjs'
import { sumOfTransactions } from '../secondaryFunctions';

class MonobankService {
    async getUserBalanceMainCard(userUrl) {
      let userData = await monobankRequest(userUrl);
      monoUrls.mainCardId = userData.accounts[0].id
      return userData.accounts[0].balance/100;
    }
  
    async cardTurnoverLastWeek(turnoverUrl, id) {
      let oneWeekAgoUnixTime = DateTime.now().minus({ days: 7 }).toUnixInteger();
      let response = await monobankRequest(turnoverUrl + `/${id}/${oneWeekAgoUnixTime}/`);
      let turnover = sumOfTransactions(response)
      return turnover / 100;
    }

    async cardTurnover(turnoverUrl, id) {
      let customUnixTime = DateTime.now().minus({ days: 30 }).toUnixInteger();
      let response = await monobankRequest(turnoverUrl + `/${id}/${customUnixTime}/`);
      return response
    }
  
    async getTurnoverLastWeekInCurr(turnoverUrl, id, to) {
      const turnover = await this.cardTurnoverLastWeek(turnoverUrl, id);
      return covertCurrency(turnover, 'UAH', to);
    }
  
    async userBalanceInCurr(toCurr, userurl) {
      let userBalance = await this.getUserBalanceMainCard(userurl);
      return covertCurrency(userBalance, 'UAH', toCurr);
    }

    async clientInformation (userUrl){
      let userData = await monobankRequest(userUrl);
      return userData
    }
  }
  
export default MonobankService;




