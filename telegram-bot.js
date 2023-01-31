const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6053851081:AAFh4O0SSlJcKQWwsYrTBlgTVC6Uuqxhos0';
const bot = new TelegramBot(token, {polling: true});

// Function to get temperature from an API
async function getTemperature() {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Haldwani,IN&appid=bce78781ad4557b0e88f6114f5963b0e');
        const temperature = response.data.main.temp;
        return temperature;
    } catch (error) {
        console.error(error);
    }
}

// Function to send temperature message to subscribers every hour
async function sendTemperature() {
    const temperature = await getTemperature()-273;
    bot.sendMessage(1200129106, `The current temperature in Haldwani is ${temperature}°C`);
}

// Schedule the sendTemperature function to run every hour
setInterval(sendTemperature, 60*60*3600);
