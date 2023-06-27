import MonobankService from "./monobankClient/monobankRequestService";

const mono = new MonobankService();

const monoUrls = {
    monoUrl : 'https://api.monobank.ua',
    monoToken : 'Token here ' + "https://api.monobank.ua/",
};

monoUrls.userUrl = `${monoUrls.monoUrl}/personal/client-info`;
monoUrls.exchangeUrl = `${monoUrls.monoUrl}/bank/currency`;
monoUrls.turnoverUrl = `${monoUrls.monoUrl}/personal/statement`;
monoUrls.mainCardId = await mono.clientInformation(monoUrls.userUrl).accounts[0].id;

const mainUserId = await mono.clientInformation(monoUrls.userUrl).clientId
export default { monoUrls, mainUserId };