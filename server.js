const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT_PUSH;

// Установите свои ключи для работы с сервисом push-уведомлений
webPush.setVapidDetails(
    'mailto:'+process.env.MAILTO,
    process.env.PUBLIC_KEY,
    process.env.PRIVATE_KEY
);

// Разрешаем парсинг JSON
app.use(bodyParser.json());

// Разрешаем запросы с других доменов (для тестов)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Обрабатываем POST запрос для симуляции подписки и отправки уведомления на клиент
app.post('/subscription', (req, res) => {
    const subscription = req.body.subscription;
    const data = req.body.data;
    console.log('Данные уведомления:', data);
    const payload = JSON.stringify(data);

    // Симуляция отправки уведомления спустя время
    setTimeout(() => {
        webPush.sendNotification(subscription, payload)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => {
                console.error('Ошибка при отправке уведомления:', error);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            });
    }, process.env.TIMEOUT)
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});