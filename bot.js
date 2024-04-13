const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', { polling: true });

bot.onText(/\/price (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const cryptoSymbol = match[1];

    axios.get(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quotes/latest?symbol=${cryptoSymbol}&convert=USD`)
        .then(response => {
            const data = response.data;
            const cryptoData = data.data[cryptoSymbol];
            if (cryptoData) {
                const name = cryptoData.name;
                const symbol = cryptoData.symbol;
                const price = cryptoData.quote.USD.price;
                bot.sendMessage(chatId, `Current ${name} (${symbol}) Price: $${price}`);
            } else {
                bot.sendMessage(chatId, 'Invalid cryptocurrency symbol. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching price:', error);
            bot.sendMessage(chatId, 'Failed to fetch price. Please try again later.');
        });
});
