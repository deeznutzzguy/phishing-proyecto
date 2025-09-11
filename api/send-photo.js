const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const { photo } = req.body;

        const TELEGRAM_BOT_TOKEN = '8312820058:AAGF_5rI1JuoRo-bi8PNoQHn41jcojCiqds';
        const CHAT_ID = '-4954765764';

        if (!photo) {
            return res.status(400).json({ message: 'No se recibió ninguna foto.' });
        }

        const base64Data = photo.replace(/^data:image\/png;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

        const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            body: {
                chat_id: CHAT_ID,
                photo: imageBuffer
            },
        });

        const data = await telegramResponse.json();

        if (data.ok) {
            res.status(200).json({ message: '¡Foto enviada a Telegram!' });
        } else {
            console.error('Error de Telegram:', data);
            res.status(500).json({ message: 'Error al enviar la foto a Telegram.', error: data.description });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};