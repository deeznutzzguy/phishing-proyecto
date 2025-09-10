const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

app.use(express.json({ limit: '10mb' }));

const token = '8312820058:AAFG_5r1JuRo-bi8PN0QHn41jcojCjdq'; // Tu token
const chatId = '123456789'; // Tu chat ID 123456789 




const bot = new TelegramBot(token);

app.post('/api/send-photo', (req, res) => {
  const { photo } = req.body;

  const base64Data = photo.replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  bot.sendPhoto(chatId, buffer, { caption: 'Foto de prueba' })
    .then(() => {
      res.json({ message: 'Foto enviada' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error al enviar' });
    });
});

module.exports = app;