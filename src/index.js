require('dotenv').config();
const { CultivationBot } = require('./core/CultivationBot');

const bot = new CultivationBot();
bot.start();
