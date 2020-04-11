Для логирования используется console.log()

Процесс логирования осуществляется единственным модулем (app.js)

Для проверки обработки и логирования ошибок на событие uncaughtException и событие unhandledRejection
вставьте в app.js следующий код:

setInterval(() => {
  console.log('Still working...');
}, 1000);

setTimeout(() => {
  Promise.reject(new Error('Oops!'))
}, 1500);
