//подключение модулей
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const { log } = require('console');
 
// user
const userJson = "./server-data/users.json";
const toursJson = "./server-data/tours.json"
const jsonFileData =  fs.readFileSync(userJson, 'utf-8');
let  parseJsonData = JSON.parse(jsonFileData);
 
const app = express();
const port = 3000;
// cors logic
app.use(cors());
// add parser for post body
app.use(express.json());
 
 
// route logic
app.get('/', (req, res) => {
  res.send('Hello World!') 
}) 
 
//************************ */ register****************************
app.post('/register', (req, res) => {
      // find users
      if (req.body?.login) {
        const isUserExist = parseJsonData.users.find((user) => user.login === req.body?.login);
        if (!isUserExist) {
            parseJsonData.users.push(req.body);
            const json = JSON.stringify(parseJsonData);
            fs.writeFileSync(userJson, json, 'utf-8', (data) => {}, (err) => {
              console.log('err write file', err)
            });
 
            // send response
            res.send('ok');
        } else {
          throw new Error('Пользователь уже зарегестрирован');
        }
      } else {
        throw new Error('не найдено свойство login');
      }
      console.log('parseJsonData Registration', parseJsonData);
 
})

//************** */ auth**************************************
app.post('/auth', (req, res) => { 
  log('req.body', req.body);

  // Проверяем, переданы ли логин и пароль
  if (!req.body?.login || !req.body.password) {
    throw new Error('не найдено свойство login или password');
  }

  // Читаем данные пользователей из JSON файла
  try {
    const jsonFileData = fs.readFileSync(userJson, 'utf-8');
    const parseJsonData = JSON.parse(jsonFileData);
    console.log('parseJsonData auth', parseJsonData);

    // Проверяем, является ли users массивом, и находим пользователя
    if (Array.isArray(parseJsonData?.users)) {
      const isUserExist = parseJsonData.users.find(user => user.login === req.body.login && user.password === req.body.password);

      if (isUserExist) { 
        return res.send(isUserExist);
      } else {
        throw new Error('Ошибка авторизации. Попробуйте еще раз.');
      }
    } else {
      throw new Error('Ошибка - данные пользователей некорректны');
    }
  } catch (error) {
    console.error('Ошибка при аутентификации:', error);
    throw new Error('Ошибка сервера');
  }
});

//************** */ tours**************************************
 
app.get('/tours', (req, res) => { 
  const jsonFileData =  fs.readFileSync(toursJson, 'utf-8', (err, data) => {}, (err) => {
    console.log('err read file tours', err);});
  res.send(jsonFileData);
});

 /*******************get tour */
 app.get('/tour/:id', (req, res) => { 
  const jsonFileData =  fs.readFileSync(toursJson, 'utf-8', (err, data) => {}, (err) => {
    console.log('err read file tours', err);});
            // parse data
    const  parseJsonData = JSON.parse(jsonFileData);
    const paramId = req.params.id;


    const item = parseJsonData.tours.find((tour) => tour.id === paramId);
    if (item) {
      res.send(item);
    } else {
      throw new Error('Тур не найден по id:', paramId);
    }
});



/*******************get nearest tour */
app.get('/nearestTours', (req, res) => { 
  const jsonFileData =  fs.readFileSync(toursJson, 'utf-8', (err, data) => {}, (err) => {
    console.log('err read file tours', err);});

            // parse data
    const  parseJsonData = JSON.parse(jsonFileData);
    const locationId = req.query?.locationId;
    console.log('req.query', req.query)

    const items = parseJsonData.tours.filter((tour) => tour.locationId === locationId);
    res.send(items);
});

// run and listen serve
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
