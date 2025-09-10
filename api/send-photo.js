const axios = require('axios');
const FormData = require('form-data');

module.exports = async (req, res) => {
    try {
        const { photo } = req.query; // ¡Ahora obtenemos la foto de los parámetros de la URL!

        const TELEGRAM_BOT_TOKEN = '8312820058:AAGF_5rI1JuoRo-bi8PNoQHn41jcojCiqds';
        const CHAT_ID = '-4954765764';

        if (!photo) {
            return res.status(400).json({ message: 'No se recibió ninguna foto.' });
        }

        const base64Data = decodeURIComponent(photo).replace(/^data:image\/png;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);
        formData.append('photo', imageBuffer, { filename: 'photo.png', contentType: 'image/png' });

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

        const telegramResponse = await axios.post(telegramUrl, formData, {
            headers: formData.getHeaders()
        });

        if (telegramResponse.data.ok) {
            res.status(200).json({ message: '¡Foto enviada a Telegram!' });
        } else {
            console.error('Error de Telegram:', telegramResponse.data);
            res.status(500).json({ message: 'Error al enviar la foto a Telegram.', error: telegramResponse.data.description });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};