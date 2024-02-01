# Документация

## Запуск

1. Создать Service-Workers на клиенте и всю необходимую логику для подписки на PUSH уведомление.
2. Сгенерировать публичный и приватный ключ. Для этого можете воспользоваться данным [сайтом](https://web-push-codelab.glitch.me)
3. Заполнить все переменные окружения в файле .env
4. Выполнить следующие команды
```bash
npm install
npm run start
```

## Запросы

POST-запрос /subscription

В качестве body параметра надо передать на сервер:
```bash
body: {
  subscription: "<await registration.pushManager.subscribe>"
  data: {
    title: "<String>"
    options: {
      "//": "Visual Options",
      "body": "<String>",
      "icon": "<URL String>",
      "image": "<URL String>",
      "badge": "<URL String>",
      "vibrate": "<Array of Integers>",
      "sound": "<URL String>",
      "dir": "<String of 'auto' | 'ltr' | 'rtl'>",
    
      "//": "Behavioural Options",
      "tag": "<String>",
      "data": "<Anything>",
      "requireInteraction": "<boolean>",
      "renotify": "<Boolean>",
      "silent": "<Boolean>",
    
      "//": "Both Visual & Behavioural Options",
      "actions": "<Array of Strings>",
    
      "//": "Information Option. No visual affect.",
      "timestamp": "<Long>"
    }
  }
}
```

Обратно POSH-запрос вернёт, в случае успешной отправки уведомления через webPush.sendNotification (по факту вам результат этого запроса вообще не нужен):
```bash
{ success: true }
```
webPush.sendNotification передаст вашему событию в Service-Worker следующие данные:
```bash
data: {
    title: "<String>"
    options: {
      "//": "Visual Options",
      "body": "<String>",
      "icon": "<URL String>",
      "image": "<URL String>",
      "badge": "<URL String>",
      "vibrate": "<Array of Integers>",
      "sound": "<URL String>",
      "dir": "<String of 'auto' | 'ltr' | 'rtl'>",
    
      "//": "Behavioural Options",
      "tag": "<String>",
      "data": "<Anything>",
      "requireInteraction": "<boolean>",
      "renotify": "<Boolean>",
      "silent": "<Boolean>",
    
      "//": "Both Visual & Behavioural Options",
      "actions": "<Array of Strings>",
    
      "//": "Information Option. No visual affect.",
      "timestamp": "<Long>"
    }
  }
```
