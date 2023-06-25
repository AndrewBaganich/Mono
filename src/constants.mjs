const monoUrls = {
    monoUrl : 'https://api.monobank.ua',
    monoToken : "ucO1XCz80H6l3p7oI6VPk4JCkIvbPlsIWgVN2OUZnpjo",
};

monoUrls.userUrl = `${monoUrls.monoUrl}/personal/client-info`;
monoUrls.exchangeUrl = `${monoUrls.monoUrl}/bank/currency`;
monoUrls.turnoverUrl = `${monoUrls.monoUrl}/personal/statement`;
monoUrls.mainCardId = 'gHNFrGUVnK1qWI9d2CTEGQ';

const mainUserId = '9adFH8M5Tr'
export default { monoUrls, mainUserId };