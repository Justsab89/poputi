const TelegramBot = require('node-telegram-bot-api')
const config = require('./config')
const helper = require('./helper')
const create_table = require('./create_table')
const select = require('./select')
const date_format = require('date_format')
const fs = require('fs')
const TaskTimer = require('tasktimer')


const bot = new TelegramBot(config.TOKEN, {
  polling: true
})

helper.logStart()

function debug(obj = {}) {
     return JSON.stringify(obj, null, 4)
}

bot.on('message', msg => {
  console.log('Working', msg.from.first_name)
})

bot.onText(/\/hey/, msg => {

  const text = `Здравствуйте, ${msg.from.first_name}\nВыберите команду для начала работы:`
  bot.sendMessage(helper.getChatId(msg), text)
})


function edit_profile_driver(msg) {

        var mysql  = require('mysql');
        var pool  = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var user_id = msg.chat.id

pool.getConnection(function(err, connection) {

      connection.query(' SELECT marka, nomer, tel FROM users WHERE id_user = ? AND vibor = "driver" ',[ user_id ] ,function(err, rows, fields) {
      if (err) throw err;
      var driver = JSON.parse(JSON.stringify(rows));

      var text = 'Ваши данные:\n' +
                 'Марка авто: ' + driver[0].marka + '\n' +
                 'Номер авто: ' + driver[0].nomer + '\n' +
                 'Телефон: ' + driver[0].tel + '\n\n' +
                 'Чтобы редактировать данные набирайте в строке следующие команды и затем новые данные через пробел:\n' +
                 'Например:\n' +
                 '/marka Тойота королла\n' +
                 '/nomer M 777 HAN\n' +
                 '/phone +77013334444';

      bot.sendMessage(msg.chat.id, text)
      })
})
}


function edit_profile_pass(msg) {

        var mysql  = require('mysql');
        var pool  = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var user_id = msg.chat.id

pool.getConnection(function(err, connection) {

      connection.query(' SELECT tel FROM users WHERE id_user = ? AND vibor = "passenger" ',[ user_id ] ,function(err, rows, fields) {
      if (err) throw err;
      var pass = JSON.parse(JSON.stringify(rows));

      var text = 'Ваши данные:\n' +
                 'Телефон: ' + pass[0].tel + '\n\n' +
                 'Чтобы редактировать данные набирайте в строке следующие команды и затем новые данные через пробел:\n' +
                 'Например:\n' +
                 '/tel +77013334444';

      bot.sendMessage(msg.chat.id, text)
      })
})
}


bot.onText(/\/marka (.+)/, (msg, [source, match]) => {

  const { id } = msg.chat

        var mysql  = require('mysql');
        var pool  = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var user_id = msg.chat.id

pool.getConnection(function(err, connection) {

      connection.query(' UPDATE users SET marka = ? WHERE id_user = ? ',[ match, user_id ] ,function(err, rows, fields) {
        if (err) throw err;

      var text = 'Марка вашего авто отредактирована на: ' + match;
      bot.sendMessage(msg.chat.id, text)
      })
})
})


bot.onText(/\/nomer (.+)/, (msg, [source, match]) => {

  const { id } = msg.chat

        var mysql  = require('mysql');
        var pool  = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var user_id = msg.chat.id

pool.getConnection(function(err, connection) {

      connection.query(' UPDATE users SET nomer = ? WHERE id_user = ? ',[ match, user_id ] ,function(err, rows, fields) {
      if (err) throw err;

      var text = 'Номер вашего авто отредактирован на: ' + match;
      bot.sendMessage(msg.chat.id, text)
      })
})
})


bot.onText(/\/phone (.+)/, (msg, [source, match]) => {

  const { id } = msg.chat

        var mysql  = require('mysql');
        var pool  = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var user_id = msg.chat.id

pool.getConnection(function(err, connection) {

      connection.query(' UPDATE users SET tel = ? WHERE id_user = ? ',[ match, user_id ] ,function(err, rows, fields) {
      if (err) throw err;

      var text = 'Ваш номер телефона отредактирован на: ' + match;
      bot.sendMessage(msg.chat.id, text)
      })
})
})


bot.onText(/\/tel (.+)/, (msg, [source, match]) => {

  const { id } = msg.chat

        var mysql  = require('mysql');
        var pool  = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var user_id = msg.chat.id

pool.getConnection(function(err, connection) {

      connection.query(' UPDATE users SET tel = ? WHERE id_user = ? ',[ match, user_id ] ,function(err, rows, fields) {
      if (err) throw err;

      var text = 'Ваш номер телефона отредактирован на: ' + match;
      bot.sendMessage(msg.chat.id, text)
      })
})
})



bot.onText(/\/table/, msg => {

create_table.create_table()
})


function vibor() {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
            host     : 'localhost',
    user     : 'mybd_user',
    password : 'admin123',
    database : 'sitebot'
})

connection.connect()

connection.query('SELECT * FROM interception WHERE street = "Шахтеров" ', function(err, rows, fields) {
  if (err) throw err;
for(var i = 0; i < rows.length; i++){
console.log('The solution is: ', rows[i].interception)
}
console.log('here ', rows[0].interception)
})

  connection.end()
}


function telpas(msg){
        var mysql  = require('mysql');
        var pool  = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

var phone = msg.text
var zapros = msg.chat.id

    connection.query('UPDATE users SET tel = ? WHERE id_user = ? AND pol IS NOT NULL AND tel IS NULL',[phone, zapros], function(err, rows, fields) {
      if (err) throw err;
      pass(msg);
})
})

        var mysql  = require('mysql');
        var pool  = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

var user_id = msg.chat.id
var point_type = 1
var route_passenger = 'route_p'+user_id;
var n_route = 'n_route_p'+user_id;

pool.getConnection(function(err, connection) {

      connection.query(' CREATE TABLE ?? (id INT(100) NOT NULL AUTO_INCREMENT, begend VARCHAR (5), n_zapros INT (5) NOT NULL, id_user INT(11) NOT NULL, id_route INT(11) NOT NULL, district VARCHAR (20) NOT NULL, point_type INT(11) NOT NULL, id_street INT(11) NOT NULL, street VARCHAR (100), id_interception INT(11) NOT NULL, interception VARCHAR (100), id_point VARCHAR (10) NOT NULL, busstop VARCHAR (100) NOT NULL, ordinal INT(11) NOT NULL, nearby_interception VARCHAR (80), point_parinter_min5 VARCHAR (30), point_parinter_plu5 VARCHAR (30),  time_beg DATETIME, time_end DATETIME, status VARCHAR (30), n_pass INT(11) NOT NULL, all_districts VARCHAR (60), PRIMARY KEY(id)) ',[route_passenger] ,function(err, rows, fields) {
        if (err) throw err;
        })

      connection.query(' CREATE TABLE ?? (id INT(100) NOT NULL AUTO_INCREMENT, id_user INT(11), route_name VARCHAR (100), start VARCHAR (20) NOT NULL, finish VARCHAR (20) NOT NULL, n_inter INT(11), PRIMARY KEY(id)) ',[n_route] ,function(err, rows, fields) {
        if (err) throw err;
        })

})

}


function pol(query){
        var mysql  = require('mysql');
        var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

    connection.connect()

var pol = query.data
var zapros = query.message.chat.id

    connection.query('UPDATE users SET pol = ? WHERE id_user = ? AND vibor = "passenger" AND pol IS NULL',[pol, zapros], function(err, rows, fields) {
      if (err) throw err; bot.sendMessage(query.message.chat.id, 'Ваш номер телефона\nНапишите слитно в таком формате:\n+77013331234');
})
      connection.end()
}


function tel(msg){
        var mysql  = require('mysql');
        var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

    connection.connect()

var phone = msg.text
var zapros = msg.chat.id

    connection.query('UPDATE users SET tel = ? WHERE id_user = ? AND nomer IS NOT NULL AND tel IS NULL',[phone, zapros], function(err, rows, fields) {
      if (err) throw err;
      driv(msg);
      create_route_driver(msg);
})
      connection.end()
}


function nomer(msg){
        var mysql  = require('mysql');
        var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

    connection.connect()

var nomer = msg.text
var zapros = msg.chat.id

    connection.query('UPDATE users SET nomer = ? WHERE id_user = ? AND nomer IS NULL AND marka IS NOT NULL',[nomer, zapros], function(err, rows, fields) {
      if (err) throw err; bot.sendMessage(msg.chat.id, 'Ваш номер телефона\nНапишите слитно в таком формате:\n+77013331234');
      console.log(marka);
})
      connection.end()
}


function marka(msg){
        var mysql  = require('mysql');
        var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

    connection.connect()

var marka = msg.text
var zapros = msg.chat.id

    connection.query('UPDATE users SET marka = ? WHERE id_user = ? AND marka IS NULL',[marka, zapros], function(err, rows, fields) {
      if (err) throw err; bot.sendMessage(msg.chat.id, 'Номер вашего автомобиля\nНапишите в таком формате:\nM 456 BNM');
      console.log(rows);
})
      connection.end()
}


function pass(msg){

    const chatId = msg.chat.id

    if (msg.text === 'Вы сейчас пассажир'){bot.sendMessage(chatId, 'asd', {
                                                 reply_markup: {remove_keyboard:true}})}

    else {
    const chatId = msg.chat.id
    const text_keyboard = 'Вы успешно зарегистрировались\nТеперь можете находить себе попутное авто\nЧтобы изменить номер телефона зайдите в раздел "Мои данные"\nЧтобы перейти в режим водителя нажмите "Вы сейчас пассажир"'
    bot.sendMessage(chatId, text_keyboard, main_menu_passenger)
    }
}

var main_menu_passenger = {
      reply_markup: {
        keyboard: [
          [{
            text: 'Найти авто'
          }],
          ['Мои данные.'],
          [{
            text: 'Вы сейчас пассажир'
          }]
        ],
      }
}



function pass_again(query){

    const chatId = query.message.chat.id

    bot.sendMessage(chatId, 'Добро пожаловать опять!', {
      reply_markup: {
        keyboard: [
          [{
            text: 'Найти авто'
          }],
          ['Мои данные.'],
          [{
            text: 'Вы сейчас пассажир'
          }]
        ],
      }
    })
}



function choose_direction(msg) {
const chatId = msg.chat.id
const text = 'Маршрут создается в три шага\n1) Вы выбираете направление\n2) Выбираете пересечение откуда вы начинаете свой маршрут\nВторой и третий шаг объясню на примере\nНапример вы начинаете свой маршрут с ДК "Майкудук" с перекрестка Магнитогорская - Архитектурная и едите по Магнитогорской до Таттимбета и далее по маршруту... Сначала указываете Архитектурную. Затем из списка выбираете Магнитогорскую.\n3) Потом выбираете улицу (Таттимбета), до которой едите по Магнитогорской и так далее до конца вашего маршрута\n4) Когда заканчиваете свой маршрут нажмите на "Завершить маршрут"'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Назад на прежний перекресток'
                         }],

                         [{
                           text: 'Завершить маршрут'
                         }],

                         [{
                           text: 'Назад'
                         }]

                       ]
                     }
                   })

bot.sendMessage(chatId, 'Выберите направление', {
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Из Майкудука в центр',
                           callback_data: 'mkdk'
                         }],
                         [{
                           text: 'Из центра в Майкудук',
                           callback_data: 'grd'
                         }],
                         [{
                         text: 'Из центра в центр',
                         callback_data: 'grd'
                         }],
                         [{
                         text: 'Из Майкудука в Майкудук',
                         callback_data: 'mkdk'
                         }]
                       ]
                     }
                   })
}



function findpas(msg){
const chatId = msg.chat.id
    const omenu = 'Чтобы найти попутного пассажира сначала укажите свой маршрут. Если вы прежде сохранили этот маршрут можете просто активизировать'
            bot.sendMessage(chatId, omenu, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Создать новый маршрут'
                         }],

                         [{
                           text: 'Активизировать сохраненные маршруты'
                         }],

                         [{
                           text: 'Назад на главное меню'
                         }]
                       ],
                     }
                   })
}


function driv(msg){
    const chatId = msg.chat.id
    const omenu = 'Вы успешно зарегистрировались\nТеперь можете находить себе попутчиков\nЧтобы изменить марку авто или номер авто или номер телефона зайдите в раздел "Мои данные"\nЧтобы перейти в режим пассажира нажмите "Вы сейчс водитель"'
            bot.sendMessage(chatId, omenu, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Найти попутчиков'
                         }],
                         ['Мои данные'],
                         [{
                           text: 'Вы сейчас водитель'
                         }]
                       ],
                     }
                   })
}


function driv_again(query){
   const chatId = query.message.chat.id
   const omenu = 'вы на главном меню'
            bot.sendMessage(chatId, omenu, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Найти попутчиков'
                         }],
                         ['Мои данные'],
                         [{
                           text: 'Вы сейчас водитель'
                         }]
                       ],
                     }
                   })
}



function create_user(query){
        var mysql  = require('mysql');
        var connection = mysql.createConnection({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

    connection.connect()
    var vibor = query.data
    var user_id = query.message.chat.id
    var fname = query.message.chat.first_name
    var lname = query.message.from.last_name

    connection.query('INSERT INTO users (vibor, id_user, fname) VALUES(?,?,?) ',[vibor, user_id, fname], function(err, rows, fields) {
      if (err) throw err;

    console.log('inserted');

    })

      connection.end()
}



function choose_street(query) {
 var mysql  = require('mysql');
        var connection = mysql.createConnection({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_driver'
    })

    connection.connect()

var zapros = query.data
var user_id = query.message.chat.id
var route_driver = 'route'+user_id;
var n_route_driver = 'n_route'+user_id;

    connection.query('INSERT INTO ?? (id_user, start) VALUES(?,?) ',[n_route_driver, user_id, zapros], function(err, rows, fields) {
                           if (err) throw err;})

    connection.query('INSERT INTO ?? (begend, n_zapros, id_user, id_route) VALUES(?,?,?,(SELECT id FROM ?? WHERE id_user = ? AND id = (SELECT MAX(id) FROM ??) )) ',
    [ route_driver, 'beg', 1, user_id, n_route_driver, user_id, n_route_driver ], function(err, rows, fields) {
    if (err) throw err;
    })

    connection.query('SELECT * FROM kowe WHERE district1 = ? OR district2 = ? ', [ zapros, zapros ], function(err, rows, fields) {
    if (err) throw err;
    var interception = JSON.parse(JSON.stringify(rows));

//    var goods = [];
//
//    for(var i = 0; i < rows.length; i++){
//    goods[goods.length] = rows[i].streetname;
//    }
//      bot.sendMessage(query.message.chat.id, 'Выберите пересекающую улицу', { reply_markup: JSON.stringify({
//                                                        inline_keyboard: goods.map((x, xi) => ([{
//                                                            text: x,
//                                                            callback_data: 'beg_inter1 ' + zapros + ' ' + x,
//                                                        }])),
//
//                                           }),})
    var keyboard = [];
    for(var i = 0; i < rows.length; i++){
    keyboard.push([{'text': ( interception[i].streetname ) , 'callback_data': ('beg_inter1#' + interception[i].district1 + '#' + interception[i].id_str)}]);
    }

     bot.sendMessage( query.message.chat.id, 'Выберите пересекающую улицу стартового пересечения',
     {
     'reply_markup': JSON.stringify({
     inline_keyboard: keyboard
                                    })
     }
     )

    })

      connection.end()
}


function choose_beg_inter(query) {

 var mysql  = require('mysql');
        var pool  = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_driver'
    })

var zapros = query.data
var user_id = query.message.chat.id
var route_driver = 'route'+user_id;
var n_route_driver = 'n_route'+user_id;
  var str = query.data;
  var res = str.split("#");
  console.log('Район', res[1]);

pool.getConnection(function(err, connection) {

connection.query('UPDATE ?? SET id_interception = ?, interception = (SELECT streetname FROM kowe WHERE id_str = ?) WHERE begend = "beg" ORDER BY id DESC LIMIT 1 ',
 [ route_driver, res[2], res[2] ], function(err, rows, fields) {
})
    connection.query('SELECT * FROM points WHERE id_street = ? AND point_type = ? ', [ res[2], 1 ], function(err, rows, fields) {
    if (err) throw err;
    var street = JSON.parse(JSON.stringify(rows));
    var keyboard = [];

    for(var i = 0; i < street.length; i++){
    keyboard.push([{'text': ( street[i].interception ) , 'callback_data': ('beg_inter2#' + street[i].id_interception)}]);
    }

    bot.sendMessage( query.message.chat.id, 'Выберите вторую улицу стартового пересечения',
    {
    'reply_markup': JSON.stringify({
    inline_keyboard: keyboard
                                   })
    }
    )
    })
})

}


function choose_beg_inter2(query) {

 var mysql  = require('mysql');
        var pool  = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_driver'
    })


var zapros = query.data
var user_id = query.message.chat.id
var route_driver = 'route'+user_id;
var n_route_driver = 'n_route'+user_id;
  var str = query.data;
  var res = str.split("#");
  console.log('Район', res[1]);

pool.getConnection(function(err, connection) {

connection.query('SELECT * FROM points WHERE id_street = ? AND id_interception = (SELECT id_interception FROM ?? WHERE begend = "beg" ORDER BY id DESC LIMIT 1) ',
[ res[1], route_driver, route_driver ], function(err, rows, fields) {
if (err) throw err;
var beg_inter = JSON.parse(JSON.stringify(rows));
console.log('Данные стрита для первого интерсепшна ', beg_inter);

connection.query(' UPDATE ?? SET street = ?, district = ?, point_type = ?, id_street = ?, id_point = ?, ordinal = ?, nearby_interception = ?, point_parinter_min5 = ?, point_parinter_plu5 = ? WHERE street IS NULL AND interception IS NOT NULL ORDER BY id DESC LIMIT 1',
[ route_driver, beg_inter[0].street, beg_inter[0].district, beg_inter[0].point_type, beg_inter[0].id_street, beg_inter[0].id_point, beg_inter[0].ordinal, beg_inter[0].nearby_interception, beg_inter[0].point_parinter_min5, beg_inter[0].point_parinter_plu5 ], function(err, rows, fields) {
})

    connection.query('SELECT * FROM points WHERE id_street = ? AND point_type = ? ', [ res[1], 1 ], function(err, rows, fields) {
    if (err) throw err;
    var street = JSON.parse(JSON.stringify(rows));
    var keyboard = [];

    for(var i = 0; i < street.length; i++){
    keyboard.push([{'text': ( street[i].interception ) , 'callback_data': ('kbd#' + street[i].interception)}]);
    }
    var text = 'Вы едите по улице ' + beg_inter[0].street + ' до улицы ...'
    bot.sendMessage( query.message.chat.id, text,
    {
    'reply_markup': JSON.stringify({
    inline_keyboard: keyboard
                                   })
    }
    )
    })
})
})
}


function kbd (query){

        var mysql  = require('mysql');
        var pool  = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_driver'
    })

var zapros = query.data
var user_id = query.message.chat.id
var point_type = 1
var route_driver = 'route'+user_id;
  var str = query.data;
  var res = str.split("#");
  console.log('Район', res[1]);


pool.getConnection(function(err, connection) {

// Выбор и ввод в БД точек пересечения между текущим и последним перекрестком
//connection.beginTransaction(function(err) {

   connection.query('SELECT n_zapros, id_route, street, ordinal FROM ?? WHERE id_user = ? ORDER BY id DESC LIMIT 1 ',
   [route_driver, user_id], function(err, rows, fields) {
   if (err && str_parse_ordinal1 !== undefined) throw err;
   var str_parse_ordinal1 = JSON.parse(JSON.stringify(rows));
   console.log('>> ordinal1: ', str_parse_ordinal1[0].ordinal);
   var street = str_parse_ordinal1[0].street;
   var ordinal_i = str_parse_ordinal1[0].ordinal;
   var di_route = str_parse_ordinal1[0].id_route;
   var n_zapros = str_parse_ordinal1[0].n_zapros+1;
   console.log('Номер запроса',n_zapros);

         connection.query('SELECT ordinal FROM points WHERE street = (SELECT street FROM ?? ORDER BY id DESC LIMIT 1) AND interception = ? ',[route_driver, res[1]], function(err, rows, fields) {
         if (err) throw err;
         var str_parse_ordinal2 = JSON.parse(JSON.stringify(rows));
         console.log('>> ordinal2: ', str_parse_ordinal2[0].ordinal);
         var ordinal_f = str_parse_ordinal2[0].ordinal;

         if (str_parse_ordinal2[0].ordinal > str_parse_ordinal1[0].ordinal) {

            // Выбор точек пересечения между текущим и последним перекрестком
            var insert1 = 'SELECT * FROM points WHERE  street = (SELECT street FROM ?? ORDER BY id DESC LIMIT 1) AND ordinal < ? AND ordinal > ? ';

            connection.query(insert1, [ route_driver, str_parse_ordinal2[0].ordinal, str_parse_ordinal1[0].ordinal ], function(err, rows, fields) {
            if (err) throw err;

            var str_vse = JSON.parse(JSON.stringify(rows));

            var test = [];
            for(var i = 0; i < rows.length; i++){
            test.push([ n_zapros, user_id, di_route, str_vse[i].district, str_vse[i].point_type, str_vse[i].id_street, str_vse[i].street, str_vse[i].id_interception, str_vse[i].interception, str_vse[i].id_point, str_vse[i].busstop, str_vse[i].ordinal, str_vse[i].nearby_interception, str_vse[i].point_parinter_min5, str_vse[i].point_parinter_plu5 ]);
            }
            console.log('TEST между текущим и последним перекрестком', test);

// На случай если между двумя точками нет ни одной точки. Чтобы не выдавало ошибку
            if( test.length !== 0 ) {
                  // Ввод в БД точек пересечения между текущим и последним перекрестком
                  connection.query('INSERT INTO ?? (n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5) VALUES ?', [ route_driver, test ], function(err, rows, fields) {
                  if (err) throw err;

                        // Выбор последнего перекрестка
                        connection.query('SELECT * FROM points WHERE  street = ? AND interception = (SELECT street FROM ?? ORDER BY id DESC LIMIT 1) ',
                        [ res[1], route_driver ], function(err, rows, fields) {
                        if (err) throw err;
                        console.log(rows);
                        var str_vse = JSON.parse(JSON.stringify(rows));

                        var test0 = [];
                        for(var i = 0; i < rows.length; i++){
                            test0.push([ n_zapros, user_id, di_route, str_vse[i].district, str_vse[i].point_type, str_vse[i].id_street, str_vse[i].street, str_vse[i].id_interception, str_vse[i].interception, str_vse[i].id_point, str_vse[i].busstop, str_vse[i].ordinal, str_vse[i].nearby_interception, str_vse[i].point_parinter_min5, str_vse[i].point_parinter_plu5 ]);
                        }
                        console.log(test0);

                               // Ввод последнего перекрестка в БД
                               connection.query('INSERT INTO ?? (n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5) VALUES ?', [ route_driver, test0 ], function(err, rows, fields) {
                               if (err) throw err;})
                        })
                  })
             }
             else{
                        // Выбор последнего перекрестка
                        connection.query('SELECT * FROM points WHERE  street = ? AND interception = (SELECT street FROM ?? ORDER BY id DESC LIMIT 1) ',
                        [ res[1], route_driver ], function(err, rows, fields) {
                        if (err) throw err;
                        console.log(rows);
                        var str_vse = JSON.parse(JSON.stringify(rows));

                        var test0 = [];
                        for(var i = 0; i < rows.length; i++){
                            test0.push([ n_zapros, user_id, di_route, str_vse[i].district, str_vse[i].point_type, str_vse[i].id_street, str_vse[i].street, str_vse[i].id_interception, str_vse[i].interception, str_vse[i].id_point, str_vse[i].busstop, str_vse[i].ordinal, str_vse[i].nearby_interception, str_vse[i].point_parinter_min5, str_vse[i].point_parinter_plu5 ]);
                        }
                        console.log(test0);

                               // Ввод последнего перекрестка в БД
                               connection.query('INSERT INTO ?? (n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5) VALUES ?', [ route_driver, test0 ], function(err, rows, fields) {
                               if (err) throw err;})
                        })
             }
            })
         }

// Если же str_parse_ordinal2[0].ordinal < str_parse_ordinal1[0].ordinal, то выполняется следующий код
         else {

         // Выбор точек пересечения между текущим и последним перекрестком
         var insert2 = 'SELECT district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception FROM points WHERE street = (SELECT street FROM ?? ORDER BY id DESC LIMIT 1) AND  ordinal > ? AND ordinal < ?  ORDER BY (CASE WHEN ? > ? THEN ordinal END) ASC, (CASE WHEN ? < ? THEN ordinal END) DESC ';

         connection.query(insert2, [ route_driver, str_parse_ordinal2[0].ordinal, str_parse_ordinal1[0].ordinal, str_parse_ordinal2[0].ordinal, str_parse_ordinal1[0].ordinal, str_parse_ordinal2[0].ordinal, str_parse_ordinal1[0].ordinal], function(err, rows, fields) {
         if (err) throw err;
console.log('ROWWWSSSS',rows);
         var str_vse2 = JSON.parse(JSON.stringify(rows));

console.log('user_id',user_id);
console.log('di_route',di_route);
         var test2 = [];
         for(var i = 0; i < rows.length; i++){
             test2.push([ n_zapros, user_id, di_route, str_vse2[i].district, str_vse2[i].point_type, str_vse2[i].id_street, str_vse2[i].street, str_vse2[i].id_interception, str_vse2[i].interception, str_vse2[i].id_point, str_vse2[i].busstop, str_vse2[i].ordinal, str_vse2[i].nearby_interception, str_vse2[i].point_parinter_min5, str_vse2[i].point_parinter_plu5 ]);
         }
         console.log('TEST2',test2);

// На случай если между двумя точками нет ни одной точки. Чтобы не выдавало ошибку
         if( test2.length !== 0 ) {
             // Ввод в БД точек пересечения между текущим и последним перекрестком
             connection.query( 'INSERT INTO ?? (n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5) VALUES ? ', [ route_driver, test2 ], function(err, rows, fields) {
             if (err) throw err;

                        // Выбор последнего перекрестка
                        connection.query('SELECT * FROM points WHERE  street = ? AND interception = (SELECT street FROM ?? ORDER BY id DESC LIMIT 1) ',
                        [ res[1], route_driver ], function(err, rows, fields) {
                        if (err) throw err;
                        console.log(rows);
                        var str_vse = JSON.parse(JSON.stringify(rows));

                        var test0 = [];
                        for(var i = 0; i < rows.length; i++){
                            test0.push([ n_zapros, user_id, di_route, str_vse[i].district, str_vse[i].point_type, str_vse[i].id_street, str_vse[i].street, str_vse[i].id_interception, str_vse[i].interception, str_vse[i].id_point, str_vse[i].busstop, str_vse[i].ordinal, str_vse[i].nearby_interception, str_vse[i].point_parinter_min5, str_vse[i].point_parinter_plu5 ]);
                        }
                        console.log(test0);

                               // Ввод последнего перекрестка в БД
                               connection.query(' INSERT INTO ?? (n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5) VALUES ? ', [ route_driver, test0 ], function(err, rows, fields) {
                               if (err) throw err;})
                        })
             })
          }
          else{
                        // Выбор последнего перекрестка
                        connection.query('SELECT * FROM points WHERE  street = ? AND interception = (SELECT street FROM ?? ORDER BY id DESC LIMIT 1) ',
                        [ res[1], route_driver ], function(err, rows, fields) {
                        if (err) throw err;
                        console.log(rows);
                        var str_vse = JSON.parse(JSON.stringify(rows));

                        var test0 = [];
                        for(var i = 0; i < rows.length; i++){
                            test0.push([ n_zapros, user_id, di_route, str_vse[i].district, str_vse[i].point_type, str_vse[i].id_street, str_vse[i].street, str_vse[i].id_interception, str_vse[i].interception, str_vse[i].id_point, str_vse[i].busstop, str_vse[i].ordinal, str_vse[i].nearby_interception, str_vse[i].point_parinter_min5, str_vse[i].point_parinter_plu5 ]);
                        }
                        console.log(test0);

                               // Ввод последнего перекрестка в БД
                               connection.query(' INSERT INTO ?? (n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5) VALUES ? ', [ route_driver, test0 ], function(err, rows, fields) {
                               if (err) throw err;})
                        })
          }
         })
         }
         })

   })
//}
//})


// Выдача списка улиц пользователю

    connection.query('SELECT * FROM points WHERE street = ? AND point_type = ? ',[res[1], point_type], function(err, rows, fields) {
    if (err) throw err;
    var user = JSON.stringify(rows);

    var goods = [];

    for(var i = 0; i < rows.length; i++){
    goods[goods.length] = rows[i].interception;
    }
      bot.sendMessage(query.message.chat.id, `Вы едите по улице ${res[1]} до ...`, { reply_markup: JSON.stringify({
                                                        inline_keyboard: goods.map((x, xi) => ([{
                                                            text: x,
                                                            callback_data: 'kbd#' + x,
                                                        }])),

                                           }),})
    })
})
}


function indicate_number_of_places(msg) {

const chatId = msg.chat.id
const text = 'Сколько пассажиров можете забрать?'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       inline_keyboard: [
                        [{
                           text: '1',
                           callback_data: 'n_place one_pass'
                         },
                         {
                           text: '2',
                           callback_data: 'n_place two_pass'
                         },
                         {
                           text: '3',
                           callback_data: 'n_place three_pass'
                         }
                          ],

                        [{
                           text: '4',
                           callback_data: 'n_place four_pass'
                         },
                         {
                           text: '5',
                           callback_data: 'n_place five_pass'
                         },
                         {
                           text: '6',
                           callback_data: 'n_place six_pass'
                         }
                          ],

                        [{
                           text: '7',
                           callback_data: 'n_place seven_pass'
                         },
                         {
                           text: '8',
                           callback_data: 'n_place eight_pass'
                         },
                         {
                           text: '9',
                           callback_data: 'n_place nine_pass'
                         }
                          ]

                       ]
                     }
                   })
}



function end_route(query){

    var mysql      = require('mysql');
//    var connection = mysql.createConnection({
    var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'mybd_user',
    password : 'admin123',
    database : 'route_driver'
    })

var user_id = query.message.chat.id;
var route_driver = 'route'+user_id;
var n_route_driver = 'n_route'+user_id;
var route_driver = 'route'+user_id;
var zapros = query.data;
var zapros_v_massiv = zapros.split(" ");
var zapros_v_massiv2 = zapros_v_massiv.shift();
var zapros_v_massiv3 = zapros_v_massiv.join(" ");


if (zapros_v_massiv3 === 'one_pass') { var limit_place = 1 }
else if (zapros_v_massiv3 === 'two_pass') { var limit_place = 2 }
else if (zapros_v_massiv3 === 'three_pass') { var limit_place = 3 }
else if (zapros_v_massiv3 === 'four_pass') { var limit_place = 4 }
else if (zapros_v_massiv3 === 'five_pass') { var limit_place = 5 }
else if (zapros_v_massiv3 === 'six_pass') { var limit_place = 6 }
else if (zapros_v_massiv3 === 'seven_pass') { var limit_place = 7 }
else if (zapros_v_massiv3 === 'eight_pass') { var limit_place = 8 }
else { var limit_place = 9 }
console.log('N-places',limit_place);

pool.getConnection(function(err, connection) {
//connection.connect()

connection.query(' UPDATE ?? SET limit_place = ?, time_beg = NOW(), time_end = ADDTIME (NOW(), "00:40:00") WHERE id_route = (SELECT MAX(id_route) FROM (SELECT * FROM ??) AS route2) ',
[ route_driver, limit_place, route_driver ], function(err, rows, fields) {
 if (err) throw err;
console.log('Добавили колво мест и установили время');



  connection.query('SELECT id FROM ?? WHERE id_user = ? ORDER BY id DESC LIMIT 1',[ route_driver , user_id ], function (err, rows, fields) {
  if (err) throw err;
  var str_vse3 = JSON.parse(JSON.stringify(rows));
  console.log(str_vse3[0].id);

     connection.query('UPDATE ?? SET begend = ? WHERE id_user = ? AND id = ?',[ route_driver , 'end', user_id, str_vse3[0].id], function (err, rows, fields) {
     if (err) throw err;

       connection.query(' SELECT DATE_ADD(time_beg, INTERVAL  "6:0:0" DAY_SECOND) AS time_beg, DATE_ADD(time_end, INTERVAL  "6:0:0" DAY_SECOND) AS time_end FROM ?? WHERE id_route = (SELECT MAX(id_route) FROM ??) ',
       [ route_driver, route_driver ], function(err, rows, fields) {
       if (err) throw err;
       var str_vse_time = JSON.parse(JSON.stringify(rows));

          connection.query(' SELECT * FROM ?? WHERE begend = "beg" OR begend = "end" ORDER BY id DESC LIMIT 2',[ route_driver ], function (err, rows, fields) {
          if (err) throw err;
          var str_vse2 = JSON.parse(JSON.stringify(rows));
          console.log(rows);
          console.log(str_vse2);
          var pp = '%' + str_vse2[0].district + '%';
          var pp1 = '%' + str_vse2[1].district + '%';

               connection.query(' SELECT DISTINCT district FROM ?? WHERE id_route = ? AND district NOT LIKE ? AND district NOT LIKE ?  ',[ route_driver, str_vse2[0].id_route, pp, pp1 ], function (err, rows, fields) {
               if (err) throw err;
               var str_vse3 = JSON.parse(JSON.stringify(rows));
               console.log('rayon', str_vse3);
                  if (str_vse3 === [] ){
                  var all_districts = str_vse2[1].district + '00' + str_vse2[0].district;
                  console.log('all distrs if', all_districts);
                  }
                  else {
                  var all_districts0 = [];
                  for(var i = 0; i < rows.length; i++){
                  all_districts0[all_districts0.length] = rows[i].district;
                  }
                  all_districts0.unshift(str_vse2[1].district);
                  all_districts0.push(str_vse2[0].district);
                  var all_districts = all_districts0.join('00')
                  console.log('all distrs else', all_districts);
                  }

                 connection.query(' UPDATE ?? SET all_districts = ? WHERE id_route = ? ',[ route_driver, all_districts, str_vse2[0].id_route ], function (err, rows, fields) {
                 if (err) throw err;

                 connection.query('SELECT * FROM ?? WHERE id_user = ? AND id BETWEEN ? AND ? ORDER BY id ',
                 [ route_driver, user_id, str_vse2[1].id, str_vse2[0].id ], function (err, rows, fields) {
                 if (err) throw err;
                  var str_vse = JSON.parse(JSON.stringify(rows));
                  var test = [];
                  for(var i = 0; i < rows.length; i++){
                  test.push([ str_vse[i].begend, user_id, str_vse[i].district, str_vse[i].id_route, str_vse[i].point_type, str_vse[i].id_street, str_vse[i].street, str_vse[i].id_interception, str_vse[i].interception, str_vse[i].id_point, str_vse[i].busstop, str_vse[i].ordinal, str_vse[i].nearby_interception, str_vse[i].point_parinter_min5, str_vse[i].point_parinter_plu5, str_vse_time[i].time_beg, str_vse_time[i].time_end, str_vse[i].status, str_vse[i].limit_place, str_vse[i].uje_seli, str_vse[i].all_districts ]);
                  }
                  console.log('TEST', test);

// Вводим маршрут водителя в общую таблицу route в БД sitebot
                      var mysql      = require('mysql');
                  //    var connection = mysql.createConnection({
                      var pool  = mysql.createPool({
                      host     : 'localhost',
                      user     : 'mybd_user',
                      password : 'admin123',
                      database : 'sitebot'
                      })

                      pool.getConnection(function(err, connection) {
                         connection.query(' SELECT DISTINCT id_user FROM route WHERE time_end > NOW() ', function (err, rows, fields) {
                         if (err) throw err;
                         var str_parse = JSON.parse(JSON.stringify(rows));
                         console.log(str_parse);
                         console.log('Сейчас столько активных водителей: ',str_parse.length);
                         if(str_parse.length == 0){
                         timer.resume();
                         console.log('Новый водитель восстановил таймер');
                              connection.query('INSERT INTO route ( begend, id_user, district, id_route, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5, time_beg, time_end, status, limit_place, uje_seli, all_districts ) VALUES ? ',[ test ], function (err, rows, fields) {
                              if (err) throw err;})
                         }
                         else{
                              connection.query('INSERT INTO route ( begend, id_user, district, id_route, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5, time_beg, time_end, status, limit_place, uje_seli, all_districts ) VALUES ? ',[ test ], function (err, rows, fields) {
                              if (err) throw err;})
                         }
                         })
                      })

                 })
             })
            })
          })
       })
     })
  })
})
//connection.destroy()
})
//connection.release()
//connection.end()
}

bot.onText(/\/start_timer_driver/, msg => {
bot.sendMessage(msg.chat.id, 'started');
start_timer_driver(msg);
})


function start_timer_driver(msg){

    var mysql      = require('mysql');
    var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'mybd_user',
    password : 'admin123',
    database : 'sitebot'
    })

//var user_id = query.message.chat.id;
var user_id = msg.chat.id;

pool.getConnection(function(err, connection) {

connection.query(' SELECT DISTINCT id_user FROM route WHERE time_end > NOW() ', function (err, rows, fields) {
if (err) throw err;
var str_parse = JSON.parse(JSON.stringify(rows));
console.log(str_parse);
console.log(str_parse.length);
if(str_parse.length == 1){
timer.start();
}
else{}
})
})
}



function back_to_prev(msg){

    var mysql      = require('mysql');
    var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'mybd_user',
    password : 'admin123',
    database : 'route_driver'
    })

var user_id = msg.chat.id;
var route_driver = 'route'+user_id;
var point_type = 1

pool.getConnection(function(err, connection) {

connection.query('SELECT * FROM ?? WHERE id_user = ? ORDER BY id DESC LIMIT 1 ',[ route_driver, user_id ], function (err, rows, fields) {
if (err) throw err;
var str_parse = JSON.parse(JSON.stringify(rows));
var last_n_zapros = str_parse[0].n_zapros;

       connection.query('DELETE FROM ?? WHERE n_zapros = ? ',[ route_driver, last_n_zapros ], function (err, rows, fields) {
       if (err) throw err;
       console.log('DELETED LAST ZAPROS');

                 connection.query('SELECT * FROM points WHERE street = (SELECT street FROM ?? ORDER BY id DESC LIMIT 1) AND point_type = ? ',[route_driver, point_type], function(err, rows, fields) {
                 if (err) throw err;
                 var str_parse2 = JSON.parse(JSON.stringify(rows));
                 var by_street = str_parse2[0].street;
                 console.log('By street', by_street);
                 console.log(str_parse2);
                 var goods = [];

                 for(var i = 0; i < rows.length; i++){
                 goods[goods.length] = rows[i].interception;
                 }
                 bot.sendMessage(msg.chat.id, `Вы едите по улице ${by_street} до ...`, { reply_markup: JSON.stringify({
                                                                       inline_keyboard: goods.map((x, xi) => ([{
                                                                           text: x,
                                                                           callback_data: 'kbd#' + x,
                                                                       }])),

                                                          }),})
                 })
       })
})
})
}



function variant(msg) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
            host     : 'localhost',
    user     : 'mybd_user',
    password : 'admin123',
    database : 'sitebot'
})

connection.connect()

connection.query('SELECT * FROM interception WHERE street = "Шахтеров" ', function(err, rows, fields) {
  if (err) throw err;
var user = JSON.stringify(rows);
console.log(user);
console.log(rows[0]);


var goods = [];

for(var i = 0; i < rows.length; i++){
goods[goods.length] = rows[i].interception;
}
const chatId = msg.chat.id

  bot.sendMessage(chatId, 'Улицы', { reply_markup: JSON.stringify({
                                                    inline_keyboard: goods.map((x, xi) => ([{
                                                        text: x,
                                                        callback_data: x,
                                                    }])),

                                       }),})


console.log(goods);

})

  connection.end()
}



function mujorjen (query){

 bot.sendMessage(query.message.chat.id, 'Выберите ваш пол:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Мужской',
            callback_data: 'man'
          },
          {
            text: 'Женский',
            callback_data: 'woman'
          }
        ]
      ]
    }
  })
}


function vodorpas (msg){

 const chatId = msg.chat.id

 bot.sendMessage(chatId, 'Выберите:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Я водитель',
            callback_data: 'driver'
          },
          {
            text: 'Я пассажир',
            callback_data: 'passenger'
          }
        ]
      ]
    }
  })
}


function vodorpas_again (msg){

 const chatId = msg.chat.id

 bot.sendMessage(chatId, 'Выберите режим:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Режим водителя',
            callback_data: 'driver_again'
          },
          {
            text: 'Режим пассажира',
            callback_data: 'passenger_again'
          }
        ]
      ]
    }
  })
}




function menumap(msg){
var menu = ['zero','one','two','three'];

 const chatId = msg.chat.id

  bot.sendMessage(chatId, 'Kkeyboard', { reply_markup: JSON.stringify({
                                                    inline_keyboard: menu.map((x, xi) => ([{
                                                        text: x,
                                                        callback_data: String(xi + 1),
                                                    }])),

                                       }),})
}

function create_route_driver(msg){

  var mysql  = require('mysql');
         var connection = mysql.createConnection({
         host     : 'localhost',
         user     : 'mybd_user',
         password : 'admin123',
         database : 'route_driver'
      })

      connection.connect()

      var user_id = msg.chat.id;
      console.log(user_id);
      var route = 'route'+user_id;
      var n_route = 'n_route'+user_id;

      connection.query(' CREATE TABLE ?? (id INT(100) NOT NULL AUTO_INCREMENT, begend VARCHAR (5), n_zapros INT (5) NOT NULL, id_user INT(11) NOT NULL, id_route INT(11) NOT NULL, district VARCHAR (20) NOT NULL, point_type INT(11) NOT NULL, id_street INT(11) NOT NULL, street VARCHAR (100), id_interception INT(11) NOT NULL, interception VARCHAR (100), id_point VARCHAR (10) NOT NULL, busstop VARCHAR (100) NOT NULL, ordinal INT(11) NOT NULL, nearby_interception VARCHAR (80), point_parinter_min5 VARCHAR (30), point_parinter_plu5 VARCHAR (30), time_beg DATETIME, time_end DATETIME, status VARCHAR (30), limit_place INT(11) NOT NULL, uje_seli INT(11) NOT NULL, all_districts VARCHAR (60), PRIMARY KEY(id)) ',[route] ,function(err, rows, fields) {
        if (err) throw err;
        })
      connection.query(' CREATE TABLE ?? (id INT(100) NOT NULL AUTO_INCREMENT, id_user INT(11), route_name VARCHAR (100), start VARCHAR (20) NOT NULL, finish VARCHAR (20) NOT NULL, n_inter INT(11), PRIMARY KEY(id)) ',[n_route] ,function(err, rows, fields) {
        if (err) throw err;
        })

      connection.end()
}


function after_choosing_district(query) {

const chatId = query.message.chat.id
const text = ' asddd '
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Указать пересечение улиц'
                         }],

                         [{
                           text: 'Назад в меню'
                         }]

                       ]
                     }
                   })
}

function after_choosing_district_msg(msg) {

const chatId = msg.chat.id
const text = ' asddd '
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Указать пересечение улиц'
                         }],

                         [{
                           text: 'Назад в меню'
                         }]

                       ]
                     }
                   })
}


function after_choosing_beg_busstop(query) {

const chatId = query.message.chat.id
const text = 'Если неправильно указали начало вашего пути, можете исправить нажав на "Исправить начало пути"'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Указать пересечение улиц.'
                         }],

                         [{
                           text: 'Исправить начало пути'
                         }],

                         [{
                           text: 'Назад в меню'
                         }]

                       ]
                     }
                   })
}


function after_choosing_beg_interception(query) {

const chatId = query.message.chat.id
const text = 'Если неправильно указали начало вашего пути, можете исправить нажав на "Исправить начало пути"'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Указать автобусную остановку'
                         }],

                         [{
                           text: 'Исправить начало пути'
                         }],

                         [{
                           text: 'Назад в меню'
                         }]

                       ]
                     }
                   })
}


function after_choosing_beg_busstop_msg(msg) {

const chatId = msg.chat.id
const text = 'Если неправильно указали начало вашего пути, можете исправить нажав на "Исправить начало пути"'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Указать пересечение улиц.'
                         }],

                         [{
                           text: 'Исправить начало пути'
                         }],

                         [{
                           text: 'Назад в меню'
                         }]

                       ]
                     }
                   })
}



function after_choosing_end_busstop(query) {

const chatId = query.message.chat.id
const text = 'Если неправильно указали конец вашего пути, можете исправить нажав на "Исправить конец пути"'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [

                         [{
                           text: 'Исправить конец пути'
                         }],

                         [{
                           text: 'Назад в меню'
                         }]

                       ]
                     }
                   })
}


function search_regime_query(query) {

const chatId = query.message.chat.id
const text = ' Сейчас БОТ ищет попутчика. Когда найдет, отправит телефон попутчика и укажет откуда забрать\nПараллельно можете сами искать попутчиков, нажав на "Показать попутчиков по району". Если вы едете с Майкудука в центр, БОТ выдаст всех пассажиров, которые едут с Майкудука в центр'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Показать попутчиков по району'
                         }],

                         [{
                           text: 'Отменить поиск попутчиков'
                         }],

                         [{
                           text: 'На главное меню'
                         }]

                       ]
                     }
                   })
}



function search_regime(msg) {

const chatId = msg.chat.id
const text = ' Сейчас БОТ ищет попутчика. Когда найдет, отправит телефон попутчика и укажет откуда забрать\nПараллельно можете сами искать попутчиков, нажав на "Показать попутчиков по району". Если вы едете с Майкудука в центр, БОТ выдаст всех пассажиров, которые едут с Майкудука в центр'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Показать попутчиков по району'
                         }],

                         [{
                           text: 'Отменить поиск попутчиков'
                         }],

                         [{
                           text: 'На главное меню'
                         }]

                       ]
                     }
                   })
}


function to_busy_regime(msg) {
const chatId = msg.chat.id

var mysql  = require('mysql');
        var pool = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

connection.query(' UPDATE route SET status = "busy" WHERE id_user = ? ',[ chatId ], function(err, rows, fields) {
                           if (err) throw err;})
})
}


function edit_beg_busstop(msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

pool.getConnection(function(err, connection) {

var user_id = msg.chat.id
var route_p = 'route_p'+user_id;
var n_route_p = 'n_route_p'+user_id;

after_choosing_district_msg(msg);

connection.query('DELETE FROM ?? WHERE id_route = (SELECT MAX(id) FROM ??) ',[ route_p, n_route_p ], function(err, rows, fields) {
                           if (err) throw err;})

    connection.query('SELECT * FROM points WHERE district = (SELECT start FROM ?? WHERE id = (SELECT MAX(id) FROM ??)) AND point_type = 0',[ n_route_p, n_route_p ], function(err, rows, fields) {
      if (err) throw err;

    var goods = [];

    for(var i = 0; i < rows.length; i++){
    goods[goods.length] = rows[i].busstop;
    }
      bot.sendMessage(msg.chat.id, 'Выберите стартовую автобусную остановку из списка ниже\nИЛИ\nУкажите пересечение улиц, нажав на "Указать пересечение улиц"', { reply_markup: JSON.stringify({
                                                        inline_keyboard: goods.map((x, xi) => ([{
                                                            text: x,
                                                            callback_data: 'busstop_beg ' + x,
                                                        }])),

                                           }),})
    })
})
}


function edit_end_busstop(msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

pool.getConnection(function(err, connection) {

var user_id = msg.chat.id
var route_p = 'route_p'+user_id;
var n_route_p = 'n_route_p'+user_id;

after_choosing_beg_busstop_msg(msg);

connection.query('DELETE FROM ?? WHERE id_route = (SELECT MAX(id) FROM ??) AND begend = ? ',[ route_p, n_route_p, 'end' ], function(err, rows, fields) {
                           if (err) throw err;})

    connection.query('SELECT * FROM points WHERE district = (SELECT finish FROM ?? WHERE id = (SELECT MAX(id) FROM ??)) AND point_type = 0',[ n_route_p, n_route_p ], function(err, rows, fields) {
      if (err) throw err;

    var goods = [];

    for(var i = 0; i < rows.length; i++){
    goods[goods.length] = rows[i].busstop;
    }
      bot.sendMessage(msg.chat.id, 'Выберите конечную автобусную остановку', { reply_markup: JSON.stringify({
                                                        inline_keyboard: goods.map((x, xi) => ([{
                                                            text: x,
                                                            callback_data: 'busstop_end ' + x,
                                                        }])),

                                           }),})
    })
})
}


function passenger_choose_time(query) {

const chatId = query.message.chat.id

bot.sendMessage(chatId, 'Теперь укажите время:', {
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Готов ехать сейчас',
                           callback_data: 'ready now'
                         }],

                         [{
                           text: 'Запланировать выезд',
                           callback_data: 'plan time'
                         }]
                       ]
                     }
                   })
}


function passenger_update_time(query){

var mysql  = require('mysql');
        var pool = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

pool.getConnection(function(err, connection) {

var user_id = query.message.chat.id
var route_p = 'route_p'+user_id;
var n_route_p = 'n_route_p'+user_id;

connection.query(' SELECT id FROM ?? ORDER BY id DESC LIMIT 1 ',
                 [ route_p ], function(err, rows, fields) {
                 if (err) throw err;
                 var str_parse = JSON.parse(JSON.stringify(rows));
                 console.log('max id1', rows);
                 console.log('max id2', str_parse);

      connection.query(' UPDATE ?? SET time_beg = NOW(), time_end = ADDTIME (NOW(), "00:40:00") WHERE id = ? AND begend = ? ',
                      [ route_p, str_parse[0].id, 'end' ], function(err, rows, fields) {
                       if (err) throw err;

           connection.query(' SELECT * FROM ?? WHERE id_route = (SELECT MAX(id_route) FROM ??) ',
                             [ route_p, route_p ], function(err, rows, fields) {
                             if (err) throw err;
                             var str_vse = JSON.parse(JSON.stringify(rows));
                             console.log('ROWS', rows);
                             console.log('STR_VSE', str_vse);

                             var all_districts = str_vse[0].district + '00' + str_vse[1].district;
                             console.log('all distrs ', all_districts);


           connection.query(' UPDATE ?? SET all_districts = ? WHERE id_route = ? ',[ route_p, all_districts, str_vse[0].id_route ], function (err, rows, fields) {
           if (err) throw err;


            connection.query(' SELECT DATE_ADD(time_beg, INTERVAL  "6:0:0" DAY_SECOND) AS time_beg, DATE_ADD(time_end, INTERVAL  "6:0:0" DAY_SECOND) AS time_end FROM ?? WHERE id_route = (SELECT MAX(id_route) FROM ??) ',
                             [ route_p, route_p ], function(err, rows, fields) {
                             if (err) throw err;
                             var str_vse_time = JSON.parse(JSON.stringify(rows));
                             console.log('Время добавили 6 часов', rows);
                             console.log('Время добавили 6 часов JSON parse', str_vse_time);

                             var test = [];
                             for(var i = 0; i < rows.length; i++){
                             test.push([ str_vse[i].begend, str_vse[i].n_zapros, user_id, str_vse[i].id_route, str_vse[i].district, str_vse[i].point_type, str_vse[i].id_street, str_vse[i].street, str_vse[i].id_interception, str_vse[i].interception, str_vse[i].id_point, str_vse[i].busstop, str_vse[i].ordinal, str_vse[i].nearby_interception, str_vse[i].point_parinter_min5, str_vse[i].point_parinter_plu5, str_vse_time[1].time_beg, str_vse_time[1].time_end, 'free', str_vse[i].n_pass, all_districts ]);
                             }
                             console.log('Данные пассажира для ввода в общую БД ', test);


                 var mysql  = require('mysql');
                         var pool = mysql.createPool({
                                 host     : 'localhost',
                         user     : 'mybd_user',
                         password : 'admin123',
                         database : 'sitebot'
                     })
                pool.getConnection(function(err, connection) {
                connection.query(' SELECT DISTINCT id_user FROM route_p WHERE time_end > NOW() ', function (err, rows, fields) {
                if (err) throw err;
                var active_passenger = JSON.parse(JSON.stringify(rows));
                console.log(active_passenger);
                console.log('Сейчас столько активных водителей: ',active_passenger.length);

                if(active_passenger.length == 0){
                timer.resume();
                console.log('Новый пассажир восстановил таймер');


                connection.query(' INSERT INTO route_p ( begend, n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5, time_beg, time_end, status, n_pass, all_districts) VALUES ? ',
                                 [ test ], function(err, rows, fields) {
                                 if (err) throw err;
                                 console.log('Время вставили в общее!', rows);

// Теперь отправляем карту
                 bot.sendPhoto(user_id, fs.readFileSync(__dirname + '/picture-map.png'))

                 })

                 }
                 else
                 {

                connection.query(' INSERT INTO route_p ( begend, n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5, time_beg, time_end, status, n_pass, all_districts) VALUES ? ',
                                 [ test ], function(err, rows, fields) {
                                 if (err) throw err;
                                 console.log('Время вставили в общее!', rows);

// Теперь отправляем карту
                 bot.sendPhoto(user_id, fs.readFileSync(__dirname + '/picture-map.png'))
                 })

                 }
            })
            })
            })
      })
})
console.log('Время вставили!');
})
})
})
//После окончания заказа на поиск авто возвращаемся в главное меню
const chatId = query.message.chat.id;
const text_keyboard = 'Сейчас бот ищет авто!\nТеперь каждые 30 секунд бот будет высылать вам варианты попутного авто\nВам нужно будет выбрать, нажав на один из вариантов';
bot.sendMessage(chatId, text_keyboard, main_menu_passenger)
}


function passenger_plan_time(query){


var user_id = query.message.chat.id
var route_p = 'route_p'+user_id;
var n_route_p = 'n_route_p'+user_id;

var now = new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var time = now.toTimeString();
console.log('Час', hours);
console.log('Минута', minutes);
console.log( time );

if(minutes<10) {var near_minute = 10;}
else if(minutes>10 && minutes<20) {var near_minute = 20;}
else if(minutes>20 && minutes<30) {var near_minute = 30;}
else if(minutes>30 && minutes<40) {var near_minute = 40;}
else if(minutes>40 && minutes<50) {var near_minute = 50;}
else {var near_minute = 0;}

var hh = hours.toString();
var hh1 = (hours+1).toString();
var mm = near_minute.toString();

console.log('Часик', hh);
console.log('час+1', hh1);
console.log('ьинутка', mm );

if(near_minute!=0) {
//var totalminutes = hours*60+near_minute;
//var ostatok = totalminutes%60;
//var chastnoe = ~~(totalminutes/60);
var massiv_time = [hh+':'+mm];
for (i = 0; i < 5; i++) {
   var near_minute = near_minute+10;
   if(near_minute>50) { var near_minute2 = near_minute-60;
     console.log('nearminute2', near_minute2);
     if(near_minute2==0){
       var hh1 = (hours+1).toString();
       var mm = near_minute2.toString();
       massiv_time.push(hh1+':'+mm+'0');
       console.log('>50+0');
     }
     else {
       var hh1 = (hours+1).toString();
       var mm = near_minute2.toString();
       massiv_time.push(hh1+':'+mm);
       console.log('>50');
     }
   }
   else {
        var hh = hours.toString();
        var mm = near_minute.toString();
        massiv_time.push(hh+':'+mm);
        console.log('<<50');}
}
console.log('qwer', massiv_time);
}
else{
var massiv_time = [hh1+':'+mm+'0'];
for (i = 0; i < 5; i++) {
   var near_minute = near_minute+10;
   var hh = hours.toString();
   var mm = near_minute.toString();
   massiv_time.push(hh1+':'+mm);
}
console.log('Neartime=0', massiv_time);
}

console.log('Ближайшая минута', near_minute);
var asddd = JSON.stringify(massiv_time);
var bbb = JSON.parse(JSON.stringify(massiv_time));

console.log('strinfy', asddd);
console.log('strinfy', bbb);
bot.sendMessage(query.message.chat.id, 'Я буду стоять на остановке или у дороги в:', { reply_markup: JSON.stringify({
                                                               inline_keyboard: massiv_time.map((x, xi) => ([{
                                                                   text: x,
                                                                   callback_data: 'time ' + x,
                                                               }])),

                                                  }),})
}


function passenger_update_plan_time(query){

  var str = query.data;
  var res = str.split(" ");
  console.log('Время выбрано!', res[1]);

//  var a = "13:15"
  var intime_format = toDate(res[1], "h:m")
  var formatted_time =  date_format(intime_format, 'Y-m-d, H-i-s')
//  alert(b);  , H-i-s
 console.log('Время отформатировано!', intime_format);
 console.log('Еще раз отформатировано!', formatted_time);

  function toDate(dStr, format) {
    var now = new Date();
    if (format == "h:m") {
      now.setHours(dStr.substr(0, dStr.indexOf(":")));
      now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
      now.setSeconds(0);
      return now;
    } else
      return "Invalid Format";
  }

var mysql  = require('mysql');
        var pool = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

pool.getConnection(function(err, connection) {

var user_id = query.message.chat.id
var route_p = 'route_p'+user_id;
var n_route_p = 'n_route_p'+user_id;

connection.query(' SELECT id FROM ?? ORDER BY id DESC LIMIT 1 ',
                 [ route_p ], function(err, rows, fields) {
                 if (err) throw err;
                 var str_parse = JSON.parse(JSON.stringify(rows));
                 console.log('max id1', rows);
                 console.log('max id2', str_parse);
//   connection.query(' SET time_zone = "+06:00" ',
//                       function(err, rows, fields) {
//                        if (err) throw err;
     connection.query(' UPDATE ?? SET time_beg = ?, time_end = ADDTIME (?, "00:40:00") WHERE id = ? AND begend = ? ',
                     [ route_p, formatted_time, formatted_time, str_parse[0].id, 'end' ], function(err, rows, fields) {
                     if (err) throw err;

            connection.query(' SELECT * FROM ?? WHERE id_route = (SELECT MAX(id_route) FROM ??) ',
                             [ route_p, route_p ], function(err, rows, fields) {
                             if (err) throw err;
                             var str_vse = JSON.parse(JSON.stringify(rows));
                             console.log('ROWS', rows);
                             console.log('STR_VSE', str_vse);

                             var all_districts = str_vse[0].district + '00' + str_vse[1].district;
                             console.log('all distrs ', all_districts);


           connection.query(' UPDATE ?? SET all_districts = ? WHERE id_route = ? ',[ route_p, all_districts, str_vse[0].id_route ], function (err, rows, fields) {
           if (err) throw err;

            connection.query(' SELECT DATE_ADD(time_beg, INTERVAL  "6:0:0" DAY_SECOND) AS time_beg, DATE_ADD(time_end, INTERVAL  "6:0:0" DAY_SECOND) AS time_end FROM ?? WHERE id_route = (SELECT MAX(id_route) FROM ??) ',
                             [ route_p, route_p ], function(err, rows, fields) {
                             if (err) throw err;
                             var str_vse_time = JSON.parse(JSON.stringify(rows));
                             console.log('Время добавили 6 часов', rows);
                             console.log('Время добавили 6 часов JSON parse', str_vse_time);

                             var test = [];
                             for(var i = 0; i < rows.length; i++){
                             test.push([ str_vse[i].begend, str_vse[i].n_zapros, user_id, str_vse[i].id_route, str_vse[i].district, str_vse[i].point_type, str_vse[i].id_street, str_vse[i].street, str_vse[i].id_interception, str_vse[i].interception, str_vse[i].id_point, str_vse[i].busstop, str_vse[i].ordinal, str_vse[i].nearby_interception, str_vse[i].point_parinter_min5, str_vse[i].point_parinter_plu5, str_vse_time[1].time_beg, str_vse_time[1].time_end, 'free', str_vse[i].n_pass, all_districts ]);
                             }
                             console.log('Тест', test);


                 var mysql  = require('mysql');
                         var pool = mysql.createPool({
                                 host     : 'localhost',
                         user     : 'mybd_user',
                         password : 'admin123',
                         database : 'sitebot'
                     })

                pool.getConnection(function(err, connection) {

                connection.query(' SELECT DISTINCT id_user FROM route_p WHERE time_end > NOW() ', function (err, rows, fields) {
                if (err) throw err;
                var active_passenger = JSON.parse(JSON.stringify(rows));
                console.log(active_passenger);
                console.log('Сейчас столько активных водителей: ',active_passenger.length);

                if(active_passenger.length == 0){
                timer.resume();
                console.log('Новый пассажир восстановил таймер');

//begend, n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, time_beg, time_end
                 connection.query(' INSERT INTO route_p ( begend, n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5, time_beg, time_end, status, n_pass, all_districts) VALUES ? ',
                                 [ test ], function(err, rows, fields) {
                                 if (err) throw err;
                                 console.log('Время вставили в общее!', rows);
//SELECT CURRENT_TIMESTAMP()   SET GLOBAL  log_timestamps  = 'SYSTEM'    SET @@session.time_zone="+00:00"    SET @@global.time_zone="+00:00"    SELECT @@global.time_zone, @@session.time_zone    SET GLOBAL time_zone = '+8:00'   SET GLOBAL time_zone = "Asia/Almaty"
// Теперь отправляем карту
                 bot.sendPhoto(user_id, fs.readFileSync(__dirname + '/picture-map.png'), {
                 caption: 'В этих местах можно останавливаться водителю'
                 })

                 })

                 }
                 else
                 {
                 connection.query(' INSERT INTO route_p ( begend, n_zapros, id_user, id_route, district, point_type, id_street, street, id_interception, interception, id_point, busstop, ordinal, nearby_interception, point_parinter_min5, point_parinter_plu5, time_beg, time_end, status, n_pass, all_districts) VALUES ? ',
                                 [ test ], function(err, rows, fields) {
                                 if (err) throw err;
                                 console.log('Время вставили в общее!', rows);
// Теперь отправляем карту
                 bot.sendPhoto(user_id, fs.readFileSync(__dirname + '/picture-map.png'), {
                 caption: 'В этих местах можно останавливаться водителю'
                 })

                 })

                 }
            })
            })
            })
            })
            })
     })
//   })
})
console.log('Время вставили!');
})
//После окончания заказа на поиск авто возвращаемся в главное меню
const chatId = query.message.chat.id;
const text_keyboard = 'Вы на главном меню';
bot.sendMessage(chatId, text_keyboard, main_menu_passenger)

}



function choose_direction_passenger(msg) {

const chatId = msg.chat.id
const text = 'Чтобы найти попутное авто вам нужно сделать 2 действия пошагово:\n1) Выбрать направление (с какого района в какой район едите)\n2) Указать перекресток или автобусную остановку начала и конца вашего пути\nИЛИ\n сделайте это все в один шаг указав ранее сохраненный маршрут нажав на "Сохраненные маршруты"  '
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Сохраненные маршруты'
                         }],

                         [{
                           text: 'Назад в меню'
                         }]

                       ]
                     }
                   })

bot.sendMessage(chatId, '1-ый шаг: Сейчас выберите направление', {
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Из Майкудука в центр',
                           callback_data: 'mkdk_pass grd'
                         }],
                         [{
                           text: 'Из центра в Майкудук',
                           callback_data: 'grd_pass mkdk'
                         }],
                         [{
                           text: 'Из центра в центр',
                           callback_data: 'grd_pass grd'
                         }],
                         [{
                           text: 'Из Майкудука в Майкудук',
                           callback_data: 'mkdk_pass mkdk'
                         }]
                       ]
                     }
                   })
}



function are_u_sure(msg) {

const chatId = msg.chat.id
const text = 'Вы уверены, что хотите отменить поиск попутчиков?'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       keyboard: [
                         [{
                           text: 'Да, я уверен'
                         }],

                         [{
                           text: 'Нет'
                         }]

                       ]
                     }
                   })
}


function choose_busstop(query) {

var mysql  = require('mysql');
        var pool = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

pool.getConnection(function(err, connection) {

var user_id = query.message.chat.id
var route_passenger = 'route_p'+user_id;
var n_route_p = 'n_route_p'+user_id;
  var str = query.data;
  var res = str.split(" ");

after_choosing_district(query);

if (res[0] == 'mkdk_pass'){ var district = 'mkdk'; var finish = res[1];}
else {var district = 'grd'; var finish = res[1];}

    connection.query('INSERT INTO ?? (id_user, start, finish) VALUES(?,?,?) ',[ n_route_p, user_id, district, finish], function(err, rows, fields) {
                           if (err) throw err;})

//    connection.query('INSERT INTO ?? (begend, n_zapros, id_user, id_route) VALUES(?,?,?,(SELECT id FROM ?? WHERE id_user = ? AND id = (SELECT MAX(id) FROM ??) )) ',[ route_passenger, 'beg', 1, user_id, n_route_p, user_id, n_route_p ], function(err, rows, fields) {
//    if (err) throw err;
//    })

    connection.query('SELECT * FROM points WHERE district = ? AND point_type = 0',[district], function(err, rows, fields) {
      if (err) throw err;

    var goods = [];

    for(var i = 0; i < rows.length; i++){
    goods[goods.length] = rows[i].busstop;
    }
      bot.sendMessage(query.message.chat.id, 'Выберите стартовую автобусную остановку из списка ниже\nИЛИ\nУкажите пересечение улиц, нажав на "Указать пересечение улиц"', { reply_markup: JSON.stringify({
                                                        inline_keyboard: goods.map((x, xi) => ([{
                                                            text: x,
                                                            callback_data: 'busstop_beg ' + x,
                                                        }])),

                                           }),})

    console.log(goods);
     console.log(query.data);
    })


})

}


function choose_end_busstop (msg) {

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

pool.getConnection(function(err, connection) {

var user_id = msg.chat.id
var route_passenger = 'route_p'+user_id;
var n_route_p = 'n_route_p'+user_id;

connection.query('SELECT * FROM points WHERE district = (SELECT finish FROM ?? ORDER BY id DESC LIMIT 1) AND point_type = 0',[ n_route_p ], function(err, rows, fields) {
if (err) throw err;

    var goods = [];

    for(var i = 0; i < rows.length; i++){
    goods[goods.length] = rows[i].busstop;
    }
      bot.sendMessage(msg.chat.id, 'Выберите конечную автобусную остановку ', { reply_markup: JSON.stringify({
                                                        inline_keyboard: goods.map((x, xi) => ([{
                                                            text: x,
                                                            callback_data: 'busstop_end ' + x,
                                                        }])),

                                           }),})
    })


})

}


function insert_busstop_beg(query) {

var mysql  = require('mysql');
        var pool = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

pool.getConnection(function(err, connection) {

var user_id = query.message.chat.id
var route_passenger = 'route_p'+user_id;
var n_route_p = 'n_route_p'+user_id;
  var str = query.data;
  var res = str.split(" ");
  var res2 = res.shift();
  var ostanovka = res.join(" ");


connection.query('INSERT INTO ?? (begend, n_zapros, id_user, id_route, district, point_type, id_street, street, id_point, busstop, ordinal, nearby_interception) VALUES(?,?,?,(SELECT id FROM ?? WHERE id_user = ? AND id = (SELECT MAX(id) FROM ??)) , (SELECT start FROM ?? WHERE id_user = ? AND id = (SELECT MAX(id) FROM ??)), ?, (SELECT id_street FROM points WHERE busstop = ?), (SELECT street FROM points WHERE busstop = ?), (SELECT id_point FROM points WHERE busstop = ?), ?, (SELECT ordinal FROM points WHERE busstop = ?), (SELECT nearby_interception FROM points WHERE busstop = ?) ) ',
    [ route_passenger, 'beg', 1, user_id, n_route_p, user_id, n_route_p, n_route_p, user_id, n_route_p, 0, ostanovka, ostanovka, ostanovka, ostanovka, ostanovka, ostanovka ], function(err, rows, fields) {
    if (err) throw err;
//    })

    connection.query('SELECT * FROM points WHERE district = (SELECT finish FROM ?? WHERE id_user = ? AND id = (SELECT MAX(id) FROM ??)) AND point_type = 0',[ n_route_p, user_id, n_route_p ], function(err, rows, fields) {
      if (err) throw err;

    var goods = [];

    for(var i = 0; i < rows.length; i++){
    goods[goods.length] = rows[i].busstop;
    }

    bot.sendMessage(query.message.chat.id, 'Выберите конечную автобусную остановку', { reply_markup: JSON.stringify({
                                                        inline_keyboard: goods.map((x, xi) => ([{
                                                            text: x,
                                                            callback_data: 'busstop_end ' + x,
                                                        }])),

                                           }),})
    })
})

})
}


function insert_busstop_end(query) {

var mysql  = require('mysql');
        var pool = mysql.createPool({
                host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

pool.getConnection(function(err, connection) {

var user_id = query.message.chat.id
var route_passenger = 'route_p'+user_id;
var n_route_p = 'n_route_p'+user_id;
  var str = query.data;
  var res = str.split(" ");
  var res2 = res.shift();
  var ostanovka = res.join(" ");


connection.query('INSERT INTO ?? (begend, n_zapros, id_user, id_route, district, point_type, id_street, street, id_point, busstop, ordinal, nearby_interception) VALUES(?,?,?,(SELECT id FROM ?? WHERE id_user = ? AND id = (SELECT MAX(id) FROM ??)) , (SELECT finish FROM ?? WHERE id_user = ? AND id = (SELECT MAX(id) FROM ??)), ?, (SELECT id_street FROM points WHERE busstop = ?), (SELECT street FROM points WHERE busstop = ?), (SELECT id_point FROM points WHERE busstop = ?), ?, (SELECT ordinal FROM points WHERE busstop = ?), (SELECT nearby_interception FROM points WHERE busstop = ?) ) ',
    [ route_passenger, 'end', 2, user_id, n_route_p, user_id, n_route_p, n_route_p, user_id, n_route_p, 0, ostanovka, ostanovka, ostanovka, ostanovka, ostanovka, ostanovka ], function(err, rows, fields) {
    if (err) throw err;
    bot.sendMessage(query.message.chat.id, 'Ваша конечная остановка: ' + ostanovka);
})

})
}


function show_interception_topass(msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

var zapros = msg.text;
var user_id = msg.chat.id;
var point_type = 1;
var route_passenger = 'n_route_p'+user_id;

pool.getConnection(function(err, connection) {

    connection.query('SELECT start FROM ?? WHERE id = (SELECT MAX(id) FROM ??) ',[route_passenger, route_passenger], function(err, rows, fields) {
    if (err) throw err;
    var district = JSON.parse(JSON.stringify(rows));
    console.log(district);

    connection.query('SELECT streetname FROM kowe WHERE district1 = ? ',[district[0].start], function(err, rows, fields) {
    if (err) throw err;
    var user = JSON.stringify(rows);

    var goods = [];

    for(var i = 0; i < rows.length; i++){
    goods[goods.length] = rows[i].streetname;
    }
    bot.sendMessage(msg.chat.id, `Выберите одну из улиц вашего пересечения`, { reply_markup: JSON.stringify({
                                                        inline_keyboard: goods.map((x, xi) => ([{
                                                            text: x,
                                                            callback_data: '11 ' + x
                                                        }])),

                                           }),})
    })
    })
})
}


function show_interception_topass_21(msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

var zapros = msg.text;
var user_id = msg.chat.id;
var point_type = 1;
var route_passenger = 'n_route_p'+user_id;

pool.getConnection(function(err, connection) {

    connection.query('SELECT start FROM ?? WHERE id = (SELECT MAX(id) FROM ??) ',[route_passenger, route_passenger], function(err, rows, fields) {
    if (err) throw err;
    var district = JSON.parse(JSON.stringify(rows));
    console.log(district);

    connection.query('SELECT streetname FROM kowe WHERE district1 = ? ',[district[0].start], function(err, rows, fields) {
    if (err) throw err;
    var user = JSON.stringify(rows);

    var goods = [];

    for(var i = 0; i < rows.length; i++){
    goods[goods.length] = rows[i].streetname;
    }
    bot.sendMessage(msg.chat.id, `Выберите одну из улиц вашего пересечения`, { reply_markup: JSON.stringify({
                                                        inline_keyboard: goods.map((x, xi) => ([{
                                                            text: x,
                                                            callback_data: '21 ' + x
                                                        }])),

                                           }),})
    })
    })
})
}


function insert_11_interception(query){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

var zapros = query.data;
var user_id = query.message.chat.id;
var point_type = 1;
var n_route_passenger = 'n_route_p'+user_id;
var route_passenger = 'route_p'+user_id;
var zapros_v_massiv = zapros.split(" ");
var zapros_v_massiv2 = zapros_v_massiv.shift();
var zapros_v_massiv3 = zapros_v_massiv.join(" ");
console.log('Запрос',zapros);
console.log('Запрос улица1',zapros_v_massiv[1]);
console.log('Запрос улица0',zapros_v_massiv[0]);
console.log('Запрос улица z',zapros_v_massiv);
console.log('Запрос улица z2',zapros_v_massiv2);
console.log('Запрос улица z3-0',zapros_v_massiv3[0]);
console.log('Запрос улица z3',zapros_v_massiv3);

pool.getConnection(function(err, connection) {

    connection.query('SELECT * FROM ?? WHERE id = (SELECT MAX(id) FROM ??) ',[n_route_passenger, n_route_passenger], function(err, rows, fields) {
    if (err) throw err;
    var district = JSON.parse(JSON.stringify(rows));
    console.log('Номер маршрута',district);
    connection.query('SELECT * FROM kowe WHERE streetname = ? ',[zapros_v_massiv3], function(err, rows, fields) {
    if (err) throw err;
    var street = JSON.parse(JSON.stringify(rows));
    console.log('Из таблицы коше',street);

       connection.query(' INSERT INTO ?? (begend, n_zapros, id_user, id_route, district, point_type, id_street, street) VALUES (?,?,?,?,?,?,?,?)',
       [route_passenger, 'beg', 1, user_id, district[0].id, district[0].start, 1, street[0].id_str, street[0].streetname ], function(err, rows, fields) {
       if (err) throw err;
       console.log('ИНсертед 11');

           connection.query('SELECT * FROM points WHERE street = ? AND point_type = 1 ',[ zapros_v_massiv3 ], function(err, rows, fields) {
           if (err) throw err;
           var user = JSON.stringify(rows);

           var goods = [];

           for(var i = 0; i < rows.length; i++){
           goods[goods.length] = rows[i].interception;
           }
           bot.sendMessage(query.message.chat.id, `Вы выбрали ${zapros}\nТеперь выберите вторую улицу вашего пересечения`, { reply_markup: JSON.stringify({
                                                               inline_keyboard: goods.map((x, xi) => ([{
                                                                   text: x,
                                                                   callback_data: '12 ' + x
                                                               }])),

                                                  }),})
           })
       })
    })
    })
})
}


function insert_12_interception(query){

after_choosing_beg_interception(query);

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

var zapros = query.data;
var user_id = query.message.chat.id;
var point_type = 1;
var n_route_passenger = 'n_route_p'+user_id;
var route_passenger = 'route_p'+user_id;
var zapros_v_massiv = zapros.split(" ");
var zapros_v_massiv2 = zapros_v_massiv.shift();
var zapros_v_massiv3 = zapros_v_massiv.join(" ");
console.log('Запрос',zapros);
console.log('Запрос улица1',zapros_v_massiv[1]);
console.log('Запрос улица0',zapros_v_massiv[0]);
console.log('Запрос улица z',zapros_v_massiv);
console.log('Запрос улица z2',zapros_v_massiv2);
console.log('Запрос улица z3-0',zapros_v_massiv3[0]);
console.log('Запрос улица z3',zapros_v_massiv3);

pool.getConnection(function(err, connection) {

    connection.query('SELECT * FROM ?? WHERE id = (SELECT MAX(id) FROM ??) ',[ route_passenger, route_passenger], function(err, rows, fields) {
    if (err) throw err;
    var street = JSON.parse(JSON.stringify(rows));
    console.log('11 street',street);

    connection.query(' SELECT * FROM points WHERE id_street = ? AND interception = ?',[street[0].id_street, zapros_v_massiv3], function(err, rows, fields) {
    if (err) throw err;
    var interception = JSON.parse(JSON.stringify(rows));
    console.log('11 interception',interception);

      connection.query(' UPDATE ?? SET id_interception = ?, interception = ?, id_point = ?, busstop = ?, nearby_interception = ?, point_parinter_min5 = ?, point_parinter_plu5 = ? WHERE id = ? ',
      [route_passenger, interception[0].id_interception, zapros_v_massiv3, interception[0].id_point, interception[0].busstop, interception[0].nearby_interception, interception[0].point_parinter_min5, interception[0].point_parinter_plu5, street[0].id], function(err, rows, fields) {
      if (err) throw err;
      console.log('12 updated');

        connection.query('SELECT finish FROM ?? WHERE id = (SELECT MAX(id) FROM ??) ',[n_route_passenger, n_route_passenger], function(err, rows, fields) {
            if (err) throw err;
            var district = JSON.parse(JSON.stringify(rows));
            console.log(district);

            connection.query('SELECT streetname FROM kowe WHERE district1 = ? ',[district[0].finish], function(err, rows, fields) {
            if (err) throw err;
            var user = JSON.stringify(rows);

            var goods = [];

            for(var i = 0; i < rows.length; i++){
            goods[goods.length] = rows[i].streetname;
            }
            bot.sendMessage(query.message.chat.id, `Ваша пункт отправления ${interception[0].street} - ${zapros_v_massiv3}\nТеперь укажите пункт назначения, указав пересечение или автобусную остановку, нажав на Указать автобусную остановку`,
                                                      { reply_markup: JSON.stringify({
                                                                inline_keyboard: goods.map((x, xi) => ([{
                                                                    text: x,
                                                                    callback_data: '21 ' + x
                                                                }])),

                                                   }),})
            })
            })

      })
    })
    })
})
}


function insert_21_interception(query){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

var zapros = query.data;
var user_id = query.message.chat.id;
var point_type = 1;
var n_route_passenger = 'n_route_p'+user_id;
var route_passenger = 'route_p'+user_id;
var zapros_v_massiv = zapros.split(" ");
var zapros_v_massiv2 = zapros_v_massiv.shift();
var zapros_v_massiv3 = zapros_v_massiv.join(" ");
console.log('Запрос',zapros);
console.log('Запрос улица1',zapros_v_massiv[1]);
console.log('Запрос улица0',zapros_v_massiv[0]);
console.log('Запрос улица z',zapros_v_massiv);
console.log('Запрос улица z2',zapros_v_massiv2);
console.log('Запрос улица z3-0',zapros_v_massiv3[0]);
console.log('Запрос улица z3',zapros_v_massiv3);

pool.getConnection(function(err, connection) {

    connection.query('SELECT * FROM ?? WHERE id = (SELECT MAX(id) FROM ??) ',[n_route_passenger, n_route_passenger], function(err, rows, fields) {
    if (err) throw err;
    var district = JSON.parse(JSON.stringify(rows));
    console.log('Номер маршрута',district);
    connection.query('SELECT * FROM kowe WHERE streetname = ? ',[zapros_v_massiv3], function(err, rows, fields) {
    if (err) throw err;
    var street = JSON.parse(JSON.stringify(rows));
    console.log('Из таблицы коше',street);

       connection.query(' INSERT INTO ?? (begend, n_zapros, id_user, id_route, district, point_type, id_street, street) VALUES (?,?,?,?,?,?,?,?)',
       [route_passenger, 'end', 1, user_id, district[0].id, district[0].finish, 1, street[0].id_str, street[0].streetname ], function(err, rows, fields) {
       if (err) throw err;
       console.log('ИНсертед 21');

           connection.query('SELECT * FROM points WHERE street = ? AND point_type = 1 ',[zapros_v_massiv3], function(err, rows, fields) {
           if (err) throw err;
           var user = JSON.stringify(rows);

           var goods = [];

           for(var i = 0; i < rows.length; i++){
           goods[goods.length] = rows[i].interception;
           }
           bot.sendMessage(query.message.chat.id, `Вы выбрали ${zapros}\nТеперь выберите вторую улицу вашего пересечения`, { reply_markup: JSON.stringify({
                                                               inline_keyboard: goods.map((x, xi) => ([{
                                                                   text: x,
                                                                   callback_data: '22 ' + x
                                                               }])),

                                                  }),})
           })
       })
    })
    })
})
}


function indicate_number_of_passengers(query) {

const chatId = query.message.chat.id
const text = 'Сколько вас человек?'
bot.sendMessage(chatId, text, {
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Я один/одна',
                           callback_data: 'n_pass one_pass'
                         }],

                         [{
                           text: 'Нас двое',
                           callback_data: 'n_pass two_pass'
                         }],

                         [{
                           text: 'Нас трое',
                           callback_data: 'n_pass three_pass'
                         }],

                         [{
                           text: 'Нас четверо',
                           callback_data: 'n_pass four_pass'
                         }]

                       ]
                     }
                   })
}



function insert_22_interception(query){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

var zapros = query.data;
var user_id = query.message.chat.id;
var point_type = 1;
var n_route_passenger = 'n_route_p'+user_id;
var route_passenger = 'route_p'+user_id;
var zapros_v_massiv = zapros.split(" ");
var zapros_v_massiv2 = zapros_v_massiv.shift();
var zapros_v_massiv3 = zapros_v_massiv.join(" ");
console.log('Запрос',zapros);
console.log('Запрос улица1',zapros_v_massiv[1]);
console.log('Запрос улица0',zapros_v_massiv[0]);
console.log('Запрос улица z',zapros_v_massiv);
console.log('Запрос улица z2',zapros_v_massiv2);
console.log('Запрос улица z3-0',zapros_v_massiv3[0]);
console.log('Запрос улица z3',zapros_v_massiv3);

pool.getConnection(function(err, connection) {

    connection.query('SELECT * FROM ?? WHERE id = (SELECT MAX(id) FROM ??) ',[ route_passenger, route_passenger], function(err, rows, fields) {
    if (err) throw err;
    var street = JSON.parse(JSON.stringify(rows));
    console.log('11 street',street);

    connection.query(' SELECT * FROM points WHERE id_street = ? AND interception = ?',[street[0].id_street, zapros_v_massiv3], function(err, rows, fields) {
    if (err) throw err;
    var interception = JSON.parse(JSON.stringify(rows));
    console.log('11 interception',interception);

      connection.query(' UPDATE ?? SET id_interception = ?, interception = ?, id_point = ?, busstop = ?, nearby_interception = ?, point_parinter_min5 = ?, point_parinter_plu5 = ?  WHERE id = ? ',
      [route_passenger, interception[0].id_interception, zapros_v_massiv3, interception[0].id_point, interception[0].busstop, interception[0].nearby_interception, interception[0].point_parinter_min5, interception[0].point_parinter_plu5, street[0].id], function(err, rows, fields) {
      if (err) throw err;
      console.log('22 updated');
// Теперь даем два варианта Сейчас или Потом
      indicate_number_of_passengers(query);
      })
    })
    })
})
}


function insert_number_of_passengers(query){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_passenger'
    })

var zapros = query.data;
var user_id = query.message.chat.id;
var point_type = 1;
var n_route_passenger = 'n_route_p'+user_id;
var route_passenger = 'route_p'+user_id;
var zapros_v_massiv = zapros.split(" ");
var zapros_v_massiv2 = zapros_v_massiv.shift();
var zapros_v_massiv3 = zapros_v_massiv.join(" ");
console.log('Запрос',zapros);
console.log('Запрос улица1',zapros_v_massiv[1]);
console.log('Запрос улица0',zapros_v_massiv[0]);
console.log('Запрос улица z',zapros_v_massiv);
console.log('Запрос улица z2',zapros_v_massiv2);
console.log('Запрос улица z3-0',zapros_v_massiv3[0]);
console.log('Запрос улица z3',zapros_v_massiv3);

if (zapros_v_massiv3 === 'one_pass') { var n_pass = 1 }
else if (zapros_v_massiv3 === 'two_pass') { var n_pass = 2 }
else if (zapros_v_massiv3 === 'three_pass') { var n_pass = 3 }
else { var n_pass = 4 }
console.log('N-pass',n_pass);

pool.getConnection(function(err, connection) {

      connection.query(' UPDATE ?? SET n_pass = ? WHERE id = (SELECT MAX(id) FROM (SELECT * FROM ??) AS route2) ',
      [ route_passenger, n_pass, route_passenger ], function(err, rows, fields) {
      if (err) throw err;
      console.log('Добавили колво пассажиров');
// Теперь даем два варианта Сейчас или Потом
      passenger_choose_time(query);
      })
})
}


//bot.on('polling_error', (error) => {
//  console.log(error.code);  // => 'EFATAL'
//})

bot.onText(/\/massiv/, msg => {massiv()})

bot.onText(/\/menumap/, msg => {menumap()})

bot.onText(/\/select/, msg => {vibor()})

bot.onText(/\/sel/, msg => {vibor()})

bot.onText(/\/outline/, msg => {inkey(msg)})

bot.onText(/\/find/, msg => {find(msg)})

bot.onText(/\/nayti_driver_poputi/, msg => {nayti_driver_poputi(msg)})

bot.onText(/\/tabu_driver_poputi/, msg => {tabu_driver_poputi(msg)})

bot.onText(/\/menu/, msg => {menumap(msg)})


bot.on('callback_query', query => {

  var str = query.data;
  var res = str.split(" ");
  console.log('res is:', res[0]);
  var res2 = str.split("#");
  console.log('res is:', res2[0]);


  if (query.data =='driver') {create_user(query);
  bot.sendMessage(query.message.chat.id, 'Марка вашего автомобиля\nНапишите в таком формате:\nToyota Camry 30')}
  else if (query.data =='passenger'){create_user(query);
  mujorjen (query)}
  else if (query.data =='man'){pol(query)}
  else if (query.data =='woman'){pol(query)}
  else if (query.data =='mkdk' || query.data =='grd') {  choose_street(query) }
  else if (query.data =='driver_again') { driv_again(query) }
  else if (query.data =='passenger_again') { pass_again(query) }
  else if (query.data =='ready now') { passenger_update_time(query) }
  else if (query.data =='plan time') { passenger_plan_time(query) }
  else if (res[0] == 'time') { passenger_update_plan_time(query) }
  else if (res[0] == '11') { insert_11_interception(query) }
  else if (res[0] == '12') { insert_12_interception(query) }
  else if (res[0] == '21') { insert_21_interception(query) }
  else if (res[0] == '22') { insert_22_interception(query) }
  else if (res[0] == 'n_pass') { insert_number_of_passengers(query) }
  else if (res[0] == 'n_place') { end_route(query); search_regime_query(query)  }
  else if (res[0] == 'map') { console.log('callback mapa: ', query.data) }
  else if (res[0] == 'driver') { console.log('driver: ', query.data); accept_driver(query) }
  else if (res[0] == 'offer_to_pass') { console.log('offer to pass ', query.data); offer_to_pass(query) }
  else if (res[0] == 'accept_offer') { console.log('accepted offer ', query.data); pass_confirmed(query) }
  else if (res2[0] == 'beg_inter1') { console.log('beg inter 1 выбран', query.data); choose_beg_inter(query); bot.deleteMessage(query.message.chat.id, query.message.message_id ) }
  else if (res2[0] == 'beg_inter2') { console.log('beg inter 2 выбран', query.data); choose_beg_inter2(query); bot.deleteMessage(query.message.chat.id, query.message.message_id) }
  else if (res2[0] == 'kbd') { console.log('kbd 2 выбран', query.data); kbd(query); bot.deleteMessage(query.message.chat.id, query.message.message_id) }
  else if (res[0] == 'confirm_pass') { console.log('confirm_pass ', query.data); offer_to_pass(query) }
  else {

   if ( res[0] == 'busstop_beg' || res[0] == 'busstop_end' ){
      console.log('БАССТОП бег или енд выбран!');
      if (res[0] == 'busstop_beg') {
      after_choosing_beg_busstop(query);
      console.log('БЕГ БАССТОП выбран!');
      var res2 = res.shift();
      var ostanovka = res.join(" ");
            console.log('res2', res2);
      bot.sendMessage(query.message.chat.id, 'Ваша начальная остановка: ' + ostanovka);
      insert_busstop_beg(query);

      }
      else {
      after_choosing_end_busstop(query);
      console.log('ЭНД БАССТОП выбран!');
      insert_busstop_end(query);
      indicate_number_of_passengers(query);
      }
   }
   else if (res[0] == 'mkdk_pass' || res[0] == 'grd_pass') { console.log('Район выбран!'); choose_busstop(query) }
   else {kbd(query)}
   }
})


bot.onText(/\/structure/, msg => {
  const {id} = msg.chat
  bot.sendMessage(id, debug(msg))
})


bot.on('message', msg => {

         var mysql  = require('mysql');
         var connection = mysql.createConnection({
         host     : 'localhost',
         user     : 'mybd_user',
         password : 'admin123',
         database : 'sitebot'
      })



      connection.connect()

      var user_id = msg.chat.id


      connection.query('SELECT * FROM users WHERE id_user = ? ',[user_id], function(err, rows, fields) {
        if (err) throw err;

        var str_parse_rows = JSON.parse(JSON.stringify(rows));

        var gender = [];

        for(var i = 0; i < rows.length; i++){
        gender[gender.length] = rows[i].pol;
        }
console.log(gender[1]);
        var rejim = [];

        for(var i = 0; i < rows.length; i++){
        rejim[rejim.length] = rows[i].vibor;
        }

        var goods = [];

        for(var i = 0; i < rows.length; i++){
        goods[goods.length] = rows[i].marka;
        }
        console.log(goods);

       var nomerok = [];

       for(var i = 0; i < rows.length; i++){
                nomerok[nomerok.length] = rows[i].nomer;
                }

        var telefon = [];

        for(var i = 0; i < rows.length; i++){
        telefon[telefon.length] = rows[i].tel;
        }

        if (msg.text === '/start') {
                   if (str_parse_rows[0] !== undefined) {
                                 if (str_parse_rows[1] !== undefined) { vodorpas_again (msg) }
                                 else { if (str_parse_rows[0].vibor === 'driver') {driv(msg)}    else {pass(msg)} }
                                 }
                   else {
                   const text = `Здравствуйте, ${msg.from.first_name}\nЭтот робот помогает водителям авто находить попутных пассажиров`
                   bot.sendMessage(helper.getChatId(msg), text)
                   vodorpas(msg)
                        }
        }

              else if (goods[0] === null && rejim[0] === 'driver') { marka(msg)}
              else if (goods[0] !== null && nomerok[0] === null) { nomer(msg)}
              else if (nomerok[0] !== null && telefon[0] === null) { tel(msg)}
              else if  (gender[0] !== null && telefon[0] === null) {telpas(msg)  }
              else if  (gender[1] !== null && gender[1] !== undefined && telefon[1] === null) {telpas(msg)  }
// Кнопки водителя
              else if (msg.text === 'Найти попутчиков'){findpas(msg)}
              else if (msg.text === 'Вы сейчас пассажир'){driv(msg)}
              else if (msg.text === 'Создать новый маршрут'){choose_direction(msg)}
              else if (msg.text === 'Завершить маршрут'){indicate_number_of_places(msg)}
              else if (msg.text === 'Назад на главное меню'){driv(msg)}
              else if (msg.text === 'На главное меню'){driv(msg)}
              else if (msg.text === 'Назад на прежний перекресток'){back_to_prev(msg)}
// Кнопки пассажира
              else if (msg.text === 'Найти авто'){choose_direction_passenger(msg)}
              else if (msg.text === 'Назад в меню'){ const chatId = msg.chat.id; const text_keyboard = 'Вы на главном меню'; bot.sendMessage(chatId, text_keyboard, main_menu_passenger) }
              else if (msg.text === 'Исправить начало пути'){edit_beg_busstop(msg)}
              else if (msg.text === 'Исправить конец пути'){edit_end_busstop(msg)}
              else if (msg.text === 'Указать пересечение улиц'){show_interception_topass(msg)}
              else if (msg.text === 'Указать пересечение улиц.'){show_interception_topass_21(msg)}
              else if (msg.text === 'Указать автобусную остановку'){choose_end_busstop(msg)}
              else if (msg.text === 'Показать попутчиков по району'){send_rayon_poputi(msg)}
              else if (msg.text === 'Отменить поиск попутчиков'){are_u_sure(msg)}
              else if (msg.text === 'Да, я уверен') { driv(msg); to_busy_regime(msg) }
              else if (msg.text === 'Нет') {search_regime(msg)}
              else if (msg.text === 'Мои данные') {edit_profile_driver(msg)}
              else if (msg.text === 'Мои данные.') {edit_profile_pass(msg)}
              else if (msg.text === 'йцукен'){create_route_driver(msg)}
        else {console.log('Hmm')

        }

})

      connection.end()

})


bot.onText(/\/stop/, msg => {
bot.sendMessage(msg.chat.id, 'stop sending to console');
timer.pause();
})

bot.onText(/\/resume/, msg => {
bot.sendMessage(msg.chat.id, 'resuming');
timer.resume();
})

//bot.onText(/\/remove/, msg => {
//bot.sendMessage(msg.chat.id, 'removing');
//timer.removeTask(task1).pause();
//})


bot.onText(/\/talk/, msg => {
bot.sendMessage(166832568, 'Я включил заново бота можете чуть попользоваться');
})


bot.onText(/\/timer/, msg => {
timer_passenger(msg)
})

function intervalFunc() {
console.log('Cant stop me now!');
}

function intervalFunc2() {
console.log('2 Cant stop me now!');
}

// Timer with 1000ms (1 second) base interval resolution.
var timer = new TaskTimer(1000);

// Add task(s) based on tick intervals.
timer.addTask({
    name: 'job1',       // unique name of the task
    tickInterval: 30,    // run every 5 ticks (5 x interval = 5000 ms)
    totalRuns: 1,      // run 10 times only. (set to 0 for unlimited times)
    callback: function (task) {
        // code to be executed on each run
//        tabu_driver_poputi2();
//        tabu_pass_on_parinter2();
//          exper();
        console.log(task.name + ' task has run ' + task.currentRuns + ' times.');
    }
});

timer.start();




function timer_passenger (msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var zapros = msg.chat.text;
var user_id = msg.chat.id;
var point_type = 1;
var n_route_passenger = 'n_route_p'+user_id;
var route_passenger = 'route_p'+user_id;


pool.getConnection(function(err, connection) {

   connection.query(' SELECT * FROM route_p WHERE time_end > NOW() ', function(err, rows, fields) {
   if (err) throw err;
   var passenger = JSON.parse(JSON.stringify(rows));
   console.log('Нашли пассажиров', passenger);
   if (passenger === []) { console.log('Сейчас нет пассажиров не плохо было бы остановить таймер', passenger); timer.pause(); }
   else{
   console.log('есть пассажиры', passenger)

   }
   })
})
}


function send_rayon_poputi (msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var zapros = msg.chat.text;
var user_id = msg.chat.id;
var n_route_driver = 'n_route'+user_id;
var route_driver = 'route'+user_id;


pool.getConnection(function(err, connection) {

// Сначала узнаем all_districts водителя
   connection.query(' SELECT all_districts FROM route WHERE time_end > NOW() AND id_user = ? ', [ user_id ],  function(err, rows, fields) {
   if (err) throw err;
   var active_drivers = JSON.parse(JSON.stringify(rows));
   console.log('Нашли водителей', active_drivers);
   if (active_drivers.length == 0) { console.log('Сейчас нет водителей не плохо было бы остановить таймер', active_drivers) }
   else{
      console.log('есть еще активные водители', active_drivers)

// Затем преобразовываем all_districts в массив с районами
             var splited = active_drivers[0].all_districts.split("00");
             if (splited.length == 2){
             var like = 'LIKE "%' + active_drivers[0].all_districts + '%"';
             }
             else if (splited.length == 3) {
             var like = 'LIKE "%' + splited[0] + '00' + splited[1] + '%" ' + 'OR LIKE "%' + splited[1] + '00' + splited[2] + '%" ' + 'OR LIKE "%' + splited[0] + '00' + splited[2] + '%" ';
             }
             else if (splited.length == 4) {
             var like = 'LIKE "%' + splited[0] + '00' + splited[1] + '%" ' + 'OR LIKE "%' + splited[1] + '00' + splited[2] + '%" ' + 'OR LIKE "%' + splited[0] + '00' + splited[2] + '%" '+ 'OR LIKE "%' + splited[2] + '00' + splited[3] + '%" '  + 'OR LIKE "%' + splited[0] + '00' + splited[3] + '%" '  + 'OR LIKE "%' + splited[1] + '00' + splited[3] + '%" ';
             }
             else{}
             console.log('лайки', like)
             var select = ' SELECT * FROM route_p WHERE time_end > NOW() AND status <> "busy" AND all_districts ' + like;
// active_drivers[i].id_user
             connection.query( select, function(err, rows, fields) {
             if (err) throw err;
             var passenger_poputi_district = JSON.parse(JSON.stringify(rows));
             console.log('passenger_poputi_district', passenger_poputi_district)
                if (passenger_poputi_district.length == 0){
                var text = 'В данный момент в вашем направлений нет пассажиров';
                console.log(' нет пассажиров', user_id)
                bot.sendMessage(user_id, text)
                }
                else {
                console.log(' есть пассажиры')

//                var keyboard = [];
                var variant = [];

                for (var i = 0; i < passenger_poputi_district.length/2; i++) {

                  if( passenger_poputi_district[2*i].interception === null && passenger_poputi_district[2*i+1].interception === null ) {
                  var number_pass = i+1;
                  var keyboard = [];
                  keyboard.push([{'text': ( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + passenger_poputi_district[2*i].busstop ) , 'callback_data': ('offer_to_pass '+ passenger_poputi_district[2*i].id_user + ' ' + user_id )}]);
                  var variant2 =  number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + passenger_poputi_district[2*i].busstop + ' ДО ост. ' + passenger_poputi_district[2*i+1].busstop ;
//                  variant.push( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + passenger_poputi_district[2*i].busstop + ' ДО ост. ' + passenger_poputi_district[2*i+1].busstop ) ;
                  }

                  else if ( passenger_poputi_district[2*i].interception === null && passenger_poputi_district[2*i+1].interception !== null ){
                  var number_pass = i+1;
                  var keyboard = [];
                  keyboard.push([{'text': ( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + passenger_poputi_district[2*i].busstop ) , 'callback_data': ('offer_to_pass '+ passenger_poputi_district[2*i].id_user + ' ' + user_id )}]);
                  var variant2 = number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + passenger_poputi_district[2*i].busstop + ' ДО ' + passenger_poputi_district[2*i+1].street + '-' + passenger_poputi_district[2*i+1].interception ;
//                  variant.push([number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + passenger_poputi_district[2*i].busstop + ' ДО ' + passenger_poputi_district[2*i+1].street + '-' + passenger_poputi_district[2*i+1].interception]);
                  }

                  else if ( passenger_poputi_district[2*i].interception !== null && passenger_poputi_district[2*i+1].interception === null ){
                  var number_pass = i+1;
                  var keyboard = [];
                  keyboard.push([{'text': ( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + passenger_poputi_district[2*i].street ) , 'callback_data': ('offer_to_pass '+ passenger_poputi_district[2*i].id_user + ' ' + user_id )}]);
                  var variant2 = number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ' + passenger_poputi_district[2*i].street + '-' + passenger_poputi_district[2*i].interception + ' ДО ост. ' + passenger_poputi_district[2*i+1].busstop ;
//                  variant.push([ number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ' + passenger_poputi_district[2*i].street + '-' + passenger_poputi_district[2*i].interception + ' ДО ост. ' + passenger_poputi_district[2*i+1].busstop ]);
                  }

                  else {
                  var number_pass = i+1;
                  var keyboard = [];
                  keyboard.push([{'text': ( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' c ' + passenger_poputi_district[2*i].interception + '-' + passenger_poputi_district[2*i].street ) , 'callback_data': ('offer_to_pass '+ passenger_poputi_district[2*i].id_user + ' ' + user_id )}]);
                  var variant2 = number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ' + passenger_poputi_district[2*i].interception + '-' + passenger_poputi_district[2*i].street + ' ДО ' + passenger_poputi_district[2*i+1].street + '-' + passenger_poputi_district[2*i+1].interception ;
//                  variant.push( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ' + passenger_poputi_district[2*i].interception + '-' + passenger_poputi_district[2*i].street + ' ДО ' + passenger_poputi_district[2*i+1].street + '-' + passenger_poputi_district[2*i+1].interception );
                  }

                bot.sendMessage( user_id, variant2,
                 {
                  'reply_markup': JSON.stringify({
                    inline_keyboard: keyboard
                  })
                 }
                )
                }
//                var variant_joined = variant.join();
//                console.log('variant_joined ',variant_joined)

//                bot.sendMessage( user_id, variant_joined,
//                 {
//                  'reply_markup': JSON.stringify({
//                    inline_keyboard: keyboard
//                  })
//                 }
//                )
                }
             })
      }
//   }
   })
})
}


function timer_driver (){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

//var zapros = msg.chat.text;
//var user_id = query.message.chat.id;
var n_route_driver = 'n_route'+user_id;
var route_driver = 'route'+user_id;


pool.getConnection(function(err, connection) {

// Сначала проверяем на наличие активных водителей.
   connection.query(' SELECT DISTINCT id_user, all_districts FROM route WHERE time_end > NOW() AND status <> ? ', [ 'busy' ],  function(err, rows, fields) {
   if (err) throw err;
   var active_drivers = JSON.parse(JSON.stringify(rows));
   console.log('Нашли водителей', active_drivers);

             var splited = active_drivers[0].all_districts.split("00");

             if (splited.length == 2){
             var like = 'LIKE "%' + active_drivers[i].all_districts + '%"';
             }
             else if (splited.length == 3) {
             var like = 'LIKE "%' + splited[0] + '00' + splited[1] + '%" ' + 'OR LIKE "%' + splited[1] + '00' + splited[2] + '%" ' + 'OR LIKE "%' + splited[0] + '00' + splited[2] + '%" ';
             }
             else if (splited.length == 4) {
             var like = 'LIKE "%' + splited[0] + '00' + splited[1] + '%" ' + 'OR LIKE "%' + splited[1] + '00' + splited[2] + '%" ' + 'OR LIKE "%' + splited[0] + '00' + splited[2] + '%" '+ 'OR LIKE "%' + splited[2] + '00' + splited[3] + '%" '  + 'OR LIKE "%' + splited[0] + '00' + splited[3] + '%" '  + 'OR LIKE "%' + splited[1] + '00' + splited[3] + '%" ';
             }
             else{}

             console.log('лайки', like)
             var select = ' SELECT * FROM route_p WHERE time_end > NOW() AND status <> "busy" AND all_districts ' + like;
             connection.query( select, function(err, rows, fields) {
             if (err) throw err;
             var passenger_poputi_district = JSON.parse(JSON.stringify(rows));
             console.log('passenger_poputi_district', passenger_poputi_district)
                if (passenger_poputi_district.length == 0){
                var text = 'В данный момент в вашем направлений нет пассажиров';
                console.log(' нет пассажиров', user_id)
                bot.sendMessage(user_id, text)
                }
                else {
                console.log(' есть пассажиры', user_id)

                var keyboard = [];
                var variant = [];

                for (var i = 0; i < passenger_poputi_district.length/2; i++) {

                  if( passenger_poputi_district[2*i].interception === null && passenger_poputi_district[2*i+1].interception === null ) {
                  var mm = passenger_poputi_district[2*i].busstop;
                  var ww = mm.split("");
                  var joined = ww.join("");
                  console.log(ww);
                  console.log(joined);
                  var mm2 = passenger_poputi_district[2*i+1].busstop;
                  var ww2 = mm2.split("");
                  var joined2 = ww2.join("");
                  console.log(ww2);
                  console.log(joined2);
                  var number_pass = i+1;
                  keyboard.push([{'text': ( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + joined ) , 'callback_data': ('map '+ i + 1 + joined)}]);
                  variant.push[( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + joined + ' ДО ост. ' + joined2)] ;

                  }
                  else if ( passenger_poputi_district[2*i].interception === null && passenger_poputi_district[2*i+1].interception !== null ){
                  var mm = passenger_poputi_district[2*i].busstop;
                  var ww = mm.split("");
                  var joined = ww.join("");
                  console.log(ww);
                  console.log(joined);
                  var mm2 = passenger_poputi_district[2*i+1].busstop;
                  var ww2 = mm2.split("");
                  var joined2 = ww2.join("");
                  console.log(ww2);
                  console.log(joined2);
                  var number_pass = i+1;
                  keyboard.push([{'text': ( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + joined ) , 'callback_data': ('map '+ i + 1 + joined)}]);
                  variant.push([number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + joined + ' ДО ' + passenger_poputi_district[2*i+1].street + '-' + passenger_poputi_district[2*i+1].interception]);
                  }
                  else if ( passenger_poputi_district[2*i].interception !== null && passenger_poputi_district[2*i+1].interception === null ){
                  var mm = passenger_poputi_district[2*i].street;
                  var ww = mm.split("");
                  var joined = ww.join("");
                  console.log(ww);
                  console.log(joined);
                  var mm2 = passenger_poputi_district[2*i].interception;
                  var ww2 = mm2.split("");
                  var joined2 = ww2.join("");
                  console.log(ww2);
                  console.log(joined2);
                  var number_pass = i+1;
                  keyboard.push([{'text': ( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ост. ' + joined ) , 'callback_data': ('map '+ i + 1 + joined)}]);
                  variant.push([ number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ' + passenger_poputi_district[2*i].street + '-' + passenger_poputi_district[2*i].interception + ' ДО ост. ' + passenger_poputi_district[2*i+1].busstop ]);
                  }
                  else {
                  var mm = passenger_poputi_district[2*i].interception;
                  var ww = mm.split("");
                  var joined = ww.join("");
                  console.log(ww);
                  console.log(joined);
                  var mm2 = passenger_poputi_district[2*i].street;
                  var ww2 = mm2.split("");
                  var joined2 = ww2.join("");
                  console.log(ww2);
                  console.log(joined2);
                  var number_pass = i+1;
                  keyboard.push([{'text': ( number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' c ' + joined + '-' + joined2 ) , 'callback_data': ('map '+ i + 1 + joined)}]);
                  variant.push([number_pass +') ' + passenger_poputi_district[2*i+1].n_pass +' чел.'+ ' ОТ ' + joined + '-' + joined2 + ' ДО ' + passenger_poputi_district[2*i+1].street + '-' + passenger_poputi_district[2*i+1].interception]);
                  }

                }
                variant.join();

                bot.sendMessage( user_id, variant,
                 {
                  'reply_markup': JSON.stringify({
                    inline_keyboard: keyboard
                  })
                 }
                )
                }
             })


   })
})
}

bot.onText(/\/map/, msg => {

var keyboard = [];
var menu = ['Night0club', 'Par0ks', 'Restaur0ants', 'Tele0com', 'Inter0net'];

for (var i = 0; i < menu.length; i++) {

  var mm = menu[i];
  var ww = mm.split("0");
  var joined = ww.join("");
  console.log(ww);
  console.log(joined);
  keyboard.push([{'text': menu[i], 'callback_data': ('map '+ i + 1 + joined)}]);

}

bot.sendMessage( msg.chat.id, 'Возможно, эти пассажиры вам попути:',
{
  'reply_markup': JSON.stringify({
    inline_keyboard: keyboard
  })
}
)
})

bot.onText(/\/like/, msg => {
like(msg)
})

function like (msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var zapros = msg.chat.text;
var user_id = msg.chat.id;
var point_type = 1;
var n_route_passenger = 'n_route_p'+user_id;
var route_passenger = 'route_p'+user_id;
var ww = 'grd00grd';
var pp = 'SELECT * FROM route_p WHERE all_districts = '+'"'+ww+'"' ;
// LIKE %'+ww+'%'
   console.log('pp', pp);

pool.getConnection(function(err, connection) {

   connection.query(pp,  function(err, rows, fields) {
   if (err) throw err;
   var passenger = JSON.parse(JSON.stringify(rows));
   console.log('like', passenger);
   })

})
}

bot.onText(/\/rayon/, msg => {
rayon(msg)
})


function rayon (msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'route_driver'
    })

var zapros = msg.chat.text;
var user_id = msg.chat.id;
var route_driver = 'route'+user_id;


pool.getConnection(function(err, connection) {

connection.query(' SELECT * FROM ?? WHERE begend = "beg" OR begend = "end" ORDER BY id DESC LIMIT 2',[ route_driver ], function (err, rows, fields) {
if (err) throw err;
var str_vse2 = JSON.parse(JSON.stringify(rows));
console.log(str_vse2);
var pp = '%' + str_vse2[0].district + '%';
var pp1 = '%' + str_vse2[1].district + '%';
//
         connection.query(' SELECT DISTINCT district FROM ?? WHERE id_route = ? AND district NOT LIKE ? AND district NOT LIKE ?  ',[ route_driver, str_vse2[0].id_route, pp, pp1 ], function (err, rows, fields) {
         if (err) throw err;
         var str_vse3 = JSON.parse(JSON.stringify(rows));
         console.log('rayon', str_vse3);
            if (str_vse3 === [] ){
            var all_districts = str_vse2[1].district + '00' + str_vse2[0].district;
            console.log('all distrs if', all_districts);
            }
            else {
            var all_districts0 = [];
            for(var i = 0; i < rows.length; i++){
            all_districts0[all_districts0.length] = rows[i].district;
            }
            all_districts0.unshift(str_vse2[1].district);
            all_districts0.push(str_vse2[0].district);
            var all_districts = all_districts0.join('00')
            console.log('all distrs else', all_districts);
            }

         })
})
})
}


function pass_confirmed(query) {

var user_id = query.message.chat.id;
  var str = query.data;
  var res = str.split(" ");
  console.log( 'pass_confirmed user id is:', res[1] + ' ' + res[2]);

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

connection.query(' SELECT * FROM route_p WHERE id_user = ? AND begend = "end" ORDER BY id DESC LIMIT 1 ', [user_id], function(err, rows, fields) {
if (err) throw err;
var pass = JSON.parse(JSON.stringify(rows));

connection.query(' SELECT * FROM users WHERE id_user = ? AND vibor = "driver" ', [res[2]], function(err, rows, fields) {
if (err) throw err;
var user_driver = JSON.parse(JSON.stringify(rows));

connection.query(' SELECT * FROM users WHERE id_user = ? AND vibor = "passenger" ', [user_id], function(err, rows, fields) {
if (err) throw err;
var user = JSON.parse(JSON.stringify(rows));

if (pass[0].interception !== null){
var driveru_text = 'Пассажир подтвердил ваш запрос!\nЗаберите его/ее с ' + pass[0].street + '-' + pass[0].interception + '\nИмя: ' + user[0].fname + '. Номер тел.: ' + user[0].tel;
   bot.sendMessage(res[2], driveru_text)
   console.log('sent to passenger ');
}
else{
var driveru_text = 'Пассажир подтвердил ваш запрос!\nЗаберите его/ее с ост. ' + pass[0].busstop + ' по улице ' + pass[0].street + '\nИмя: ' + user[0].fname + '. Номер тел.: ' + user[0].tel;
   bot.sendMessage(res[2], driveru_text)
   console.log('sent to passenger ');
}

var passu_text = 'Машина марки ' + user_driver[0].marka + ' с гос.номером ' + user_driver[0].nomer + ' едет за вами. Номер тел. ' + user_driver[0].tel + ' Ждите!';
   bot.sendMessage(user_id, passu_text)
   console.log('sent to passenger ');

   connection.query(' UPDATE route_p SET status = "busy", id_driver = ? WHERE id_user = ? ',[ res[2] , res[1]], function(err, rows, fields) {
   if (err) throw err;
   })
})
})
})
})
}


function offer_to_pass(query) {

var user_id = query.message.chat.id;
  var str = query.data;
  var res = str.split(" ");
  console.log(' offer_to_pass user id is:', res[1] + ' ' + res[2]);

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

// Сначала находим всех активных пассажиров
connection.query(' SELECT TIME(time_beg) AS time_beg, street, interception, id_user FROM route WHERE time_end > NOW() AND id_user = ? ', [user_id], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));

var passu_text = 'Водитель предлагает Вас забрать. Он выезжает с пер. ' + driver[0].street + '-' + driver[0].interception + ' в ' + driver[0].time_beg;
   bot.sendMessage(res[1], passu_text, {
                    reply_markup: {
                    inline_keyboard: [
                    [{
                    text: 'Согласиться',
                    callback_data: 'accept_offer ' + res[1] + ' ' +res[2]
                    }]
                    ]
                    }
                  })
   console.log('sent to passenger ');
})
})
}



function accept_driver (query){

var user_id = query.message.chat.id;
  var str = query.data;
  var res = str.split(" ");
  console.log('res is:', res[0]);
  console.log('user id is:', res[1]);

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

// Сначала находим всех активных пассажиров
connection.query(' SELECT * FROM route_p WHERE time_end > NOW() AND status <> "busy" and id_user = ?', [user_id], function(err, rows, fields) {
if (err) throw err;
var active_passenger = JSON.parse(JSON.stringify(rows));

   connection.query(' SELECT * FROM users WHERE id_user = ? AND vibor = "passenger" ', [user_id], function(err, rows, fields) {
   if (err) throw err;
   var user = JSON.parse(JSON.stringify(rows));

   if(active_passenger[0].interception === null){
   var driveru_text = 'Пассажир по имени '+ user[0].fname + ' ждет вас на остановке ' + active_passenger[0].busstop + ' по улице ' + active_passenger[0].street +' Номер тел. ' + user[0].tel
   }
   else {
   var driveru_text = 'Пассажир по имени '+ user[0].fname + ' ждет вас на перекрестке ' + active_passenger[0].street + ' - ' + active_passenger[0].interception +' Номер тел. ' + user[0].tel
   }

   bot.sendMessage(res[1], driveru_text)
   console.log('sent to driver ');
   })

   connection.query(' SELECT * FROM users WHERE id_user = ? AND vibor = "driver" ', [res[1]], function(err, rows, fields) {
   if (err) throw err;
   var user = JSON.parse(JSON.stringify(rows));
   var passu_text = 'Машина марки ' + user[0].marka + ' с гос.номером ' + user[0].nomer + ' едет за вами. Номер тел. ' + user[0].tel + ' Ждите!';

   bot.sendMessage(user_id, passu_text)
   console.log('sent to passenger ');
   })

   connection.query(' UPDATE route_p SET status = "busy", id_driver = ? WHERE id_user = ? ',[ res[1] ,user_id], function(err, rows, fields) {
   if (err) throw err;
   })
})
})

}



function nayti_driver_poputi (msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

var zapros = msg.chat.text;
var user_id = msg.chat.id;
var point_type = 1;
var n_route_passenger = 'n_route_p'+user_id;
var route_passenger = 'route_p'+user_id;


pool.getConnection(function(err, connection) {

// Сначала находим всех активных пассажиров
connection.query(' SELECT * FROM route_p WHERE time_end > NOW() AND status <> "busy" ', function(err, rows, fields) {
if (err) throw err;
var active_passenger = JSON.parse(JSON.stringify(rows));
console.log('Активные пассажиры ',active_passenger);

for(var i = 0; i < active_passenger.length/2; i++){

console.log('1  ',active_passenger[2*i].id_point);
console.log('2  ',active_passenger[2*i+1].id_point);
var first_point = active_passenger[2*i].id_point;
var id_user_pas = active_passenger[2*i].id_user;

// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки
connection.query(' SELECT id, id_user, id_point FROM route WHERE id_point IN (?, ?) ', [ active_passenger[2*i].id_point, active_passenger[2*i+1].id_point ], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('Нашли авто',driver);
if (driver !== []){

// Теперь выбираем именно тех водителей, у которых начальный id_point пассажира стоит в списке маршрута водителя первым
    var test = [];
    for(var a = 0; a < driver.length/2; a++){
    console.log('Внутри форао',first_point);
       if ( driver[2*a].id_point == first_point ) {
       test.push ([ driver[2*a].id, driver[2*a].id_user, driver[2*a].id_point ]);
       test.push ([ driver[2*a+1].id, driver[2*a+1].id_user, driver[2*a+1].id_point ]);
       }
       else {}
    }
    console.log('По парам', test);
    console.log('Айди водителей', test[0][1]);
    console.log('Айди водителей lenght', test.length);
// Теперь выбираем водителей, чтобы не повторялись
    var test2 = [];
        for(var a = 0; a < test.length/2; a++){
          test2.push ([ test[2*a][0], test[2*a][1], test[2*a][2] ]);
        }
    console.log('Только Айди водителей', test2);

    var pasu_text = 'Этот водитель может вас забрать если согласны нажмите "ДА" ' + test2[0][1];

    console.log('PASU  ', pasu_text);
    bot.sendMessage(id_user_pas, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'ДА',
                           callback_data: 'yes'
                         }]
                       ]
                     }

    })
}
else {}
})
}
})
})
}


var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

var sql = ' SELECT DISTINCT PP_id_user, PP_id_route, DD_id_user  AS DDD_id_user, DD_id_route  AS DDD_id_route, ( SELECT street FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS street, ( SELECT interception FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS interception, DD_time_beg ' +
             ' FROM (SELECT PP_id_user, PP_id_route, PP_id_point, PP_begend, PP_time_beg, PP_time_end, PP_near1, PP_near2, DD_id_user,  DD_id_route, DD_street, DD_interception, DD_id_point, DD_time_beg, DD_time_end  ' +
                 ' FROM  (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_begend AS PP_begend, route_p1.P_time_beg AS PP_time_beg, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.street AS DD_street,  route.interception AS DD_interception,  route.id_point AS DD_id_point,  TIME(route.time_beg) AS  DD_time_beg,  route.time_end AS  DD_time_end ' +
                     ' FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_beg AS P_time_beg, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p ) AS route_p1 ' +
                         ' JOIN route  WHERE route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  ORDER BY PP_id_user, PP_id_route) AS table1 WHERE PP_begend = "beg"  AND ' +
                            ' EXISTS  (SELECT * FROM  (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_begend AS PP_begend, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.id_point AS DD_id_point,  route.time_end AS DD_time_end  ' +
                                ' FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p ) AS route_p1 ' +
                                    ' JOIN route  WHERE route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  ORDER BY PP_id_user, PP_id_route)  AS table2 WHERE PP_begend = "end" AND table1.PP_id_user = table2.PP_id_user AND table1.DD_id_user = table2.DD_id_user) ) AS table3 '

connection.query( sql , function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('experiment ', driver);

})
})

pool.getConnection(function(err, connection) {

var sql = ' SELECT DISTINCT PP_id_user, PP_begend, PP_id_route, PP_street, PP_interception, PP_busstop, (SELECT street FROM route_p WHERE begend = "end" AND id_route = PP_id_route AND id_user = PP_id_user ) AS PP_street_end, (SELECT interception FROM route_p WHERE begend = "end" AND id_route = PP_id_route AND id_user = PP_id_user ) AS PP_interception_end, (SELECT busstop FROM route_p WHERE begend = "end" AND id_route = PP_id_route AND id_user = PP_id_user ) AS PP_busstop_end, DD_id_user  AS DDD_id_user, DD_id_route  AS DDD_id_route, ( SELECT street FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS street, ( SELECT interception FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS interception, DD_time_beg' +
             ' FROM (SELECT PP_id_user, PP_id_route, PP_id_point, PP_street, PP_interception, PP_busstop, PP_begend, PP_time_beg, PP_time_end, PP_near1, PP_near2, DD_id_user,  DD_id_route, DD_street, DD_interception, DD_id_point, DD_time_beg, DD_time_end ' +
                ' FROM (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_street AS PP_street, route_p1.P_interception AS PP_interception, route_p1.P_busstop AS PP_busstop, route_p1.P_begend AS PP_begend, route_p1.P_time_beg AS PP_time_beg, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.street AS DD_street,  route.interception AS DD_interception,  route.id_point AS DD_id_point,  TIME(route.time_beg) AS  DD_time_beg,  route.time_end AS  DD_time_end  ' +
                     ' FROM (SELECT id_user AS P_id_user, begend AS P_begend, id_route AS P_id_route, id_point AS P_id_point, street AS P_street, interception AS P_interception, busstop AS P_busstop, time_beg AS P_time_beg, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p ) AS route_p1 ' +
                         ' JOIN route  WHERE  route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  OR  route_p1.near1 = route.point_parinter_min5  OR  route_p1.near2 = route.point_parinter_plu5 OR  route_p1.near2 = route.point_parinter_min5  OR  route_p1.near1 = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_min5  ORDER BY PP_id_user, PP_id_route) AS table1 WHERE PP_begend = "beg" ' +
                             ' AND  EXISTS  (SELECT * FROM  (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_begend AS PP_begend, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.id_point AS DD_id_point,  route.time_end AS DD_time_end   FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p ) AS route_p1 JOIN route ' +
                                   ' WHERE  route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  OR  route_p1.near1 = route.point_parinter_min5  OR  route_p1.near2 = route.point_parinter_plu5 OR  route_p1.near2 = route.point_parinter_min5  OR  route_p1.near1 = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_min5   ORDER BY PP_id_user, PP_id_route)  AS table2 WHERE PP_begend = "end" AND table1.PP_id_user = table2.PP_id_user AND table1.DD_id_user = table2.DD_id_user) ) AS table3 ';

connection.query(sql,function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('par interception ', driver);
})
})



function tabu_driver_poputi2 (msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

var sql = ' SELECT DISTINCT PP_id_user, PP_id_route, DD_id_user  AS DDD_id_user, DD_id_route  AS DDD_id_route, ( SELECT street FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS street, ( SELECT interception FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS interception, DD_time_beg ' +
             ' FROM (SELECT PP_id_user, PP_id_route, PP_id_point, PP_begend, PP_time_beg, PP_time_end, PP_near1, PP_near2, DD_id_user,  DD_id_route, DD_street, DD_interception, DD_id_point, DD_time_beg, DD_time_end  ' +
                 ' FROM  (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_begend AS PP_begend, route_p1.P_time_beg AS PP_time_beg, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.street AS DD_street,  route.interception AS DD_interception,  route.id_point AS DD_id_point,  TIME(route.time_beg) AS  DD_time_beg,  route.time_end AS  DD_time_end ' +
// Формирует новую таблицу route_p1, где создает два отдельных столбца near1 и near2 из одного столбца nearby_interception таблицы route_p
                     ' FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_beg AS P_time_beg, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p ) AS route_p1 ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception и формирует новую таблицу table1. И затем из строк таблицы table1 выбирает строки у которых столбец begend = "beg"
                         ' JOIN route  WHERE route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  ORDER BY PP_id_user, PP_id_route) AS table1 WHERE PP_begend = "beg"  AND ' +
// Возвращает TRUE если запрос, указанный ниже подтверждается
                            ' EXISTS  (SELECT * FROM  (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_begend AS PP_begend, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.id_point AS DD_id_point,  route.time_end AS DD_time_end  ' +
                                ' FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p ) AS route_p1 ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception и формирует новую таблицу table2. И затем из строк таблицы table2 выбирает строки у которых столбец begend = "end" и id_user строки из таблицы table1 равен id_user-у строки таблицы table2
                                    ' JOIN route  WHERE route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  ORDER BY PP_id_user, PP_id_route)  AS table2 WHERE PP_begend = "end" AND table1.PP_id_user = table2.PP_id_user AND table1.DD_id_user = table2.DD_id_user) ) AS table3 '

connection.query( sql , function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('experiment ', driver);

   if (driver.length !== 0){
   for(var i = 0; i < driver.length; i++){
    var pasu_text = 'Этот водитель выезжает с пересечения ' + driver[i].street + '-' + driver[i].interception + ' в ' + driver[i].DD_time_beg;

    console.log('PASU  ', pasu_text);
    bot.sendMessage(driver[i].PP_id_user, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Выбрать попутное авто',
                           callback_data:  'driver '+driver[i].DDD_id_user
                         }]
                       ]
                     }

    })
   }
   }
})
})

}


function tabu_pass_on_parinter2(msg) {

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

// Так как у пассажира и водителя, у которых совпался маршрут по нескольким столбцам, могут быть выбраны несколько строк, в конце выбираются уникальные столбцы из таблицы table3
var sql = ' SELECT DISTINCT PP_id_user, PP_begend, PP_id_route, PP_street, PP_interception, PP_busstop, (SELECT street FROM route_p WHERE begend = "end" AND id_route = PP_id_route AND id_user = PP_id_user ) AS PP_street_end, (SELECT interception FROM route_p WHERE begend = "end" AND id_route = PP_id_route AND id_user = PP_id_user ) AS PP_interception_end, (SELECT busstop FROM route_p WHERE begend = "end" AND id_route = PP_id_route AND id_user = PP_id_user ) AS PP_busstop_end, DD_id_user  AS DDD_id_user, DD_id_route  AS DDD_id_route, ( SELECT street FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS street, ( SELECT interception FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS interception, DD_time_beg' +
             ' FROM (SELECT PP_id_user, PP_id_route, PP_id_point, PP_street, PP_interception, PP_busstop, PP_begend, PP_time_beg, PP_time_end, PP_near1, PP_near2, DD_id_user,  DD_id_route, DD_street, DD_interception, DD_id_point, DD_time_beg, DD_time_end ' +
                ' FROM (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_street AS PP_street, route_p1.P_interception AS PP_interception, route_p1.P_busstop AS PP_busstop, route_p1.P_begend AS PP_begend, route_p1.P_time_beg AS PP_time_beg, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.street AS DD_street,  route.interception AS DD_interception,  route.id_point AS DD_id_point,  TIME(route.time_beg) AS  DD_time_beg,  route.time_end AS  DD_time_end  ' +
// Формирует новую таблицу route_p1, где создает два отдельных столбца near1 и near2 из одного столбца nearby_interception таблицы route_p
                     ' FROM (SELECT id_user AS P_id_user, begend AS P_begend, id_route AS P_id_route, id_point AS P_id_point, street AS P_street, interception AS P_interception, busstop AS P_busstop, time_beg AS P_time_beg, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p ) AS route_p1 ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception, с point_parinter_min5, с point_parinter_plu5 и формирует новую таблицу table1. И затем из строк таблицы table1 выбирает строки у которых столбец begend = "beg"
                         ' JOIN route  WHERE  route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  OR  route_p1.near1 = route.point_parinter_min5  OR  route_p1.near2 = route.point_parinter_plu5 OR  route_p1.near2 = route.point_parinter_min5  OR  route_p1.near1 = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_min5  ORDER BY PP_id_user, PP_id_route) AS table1 WHERE PP_begend = "beg" ' +
// Возвращает TRUE если запрос, указанный ниже подтверждается
                             ' AND  EXISTS  (SELECT * FROM  (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_begend AS PP_begend, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.id_point AS DD_id_point,  route.time_end AS DD_time_end   FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p ) AS route_p1 JOIN route ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception, с point_parinter_min5, с point_parinter_plu5 и формирует новую таблицу table2. И затем из строк таблицы table2 выбирает строки у которых столбец begend = "end" и id_user строки из таблицы table1 равен id_user-у строки таблицы table2  и все это сохраняет как таблицу table3
                                   ' WHERE  route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  OR  route_p1.near1 = route.point_parinter_min5  OR  route_p1.near2 = route.point_parinter_plu5 OR  route_p1.near2 = route.point_parinter_min5  OR  route_p1.near1 = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_min5   ORDER BY PP_id_user, PP_id_route)  AS table2 WHERE PP_begend = "end" AND table1.PP_id_user = table2.PP_id_user AND table1.DD_id_user = table2.DD_id_user) ) AS table3 ';

connection.query( sql , function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('parallel interception ', driver);

   if (driver.length !== 0){

   for(var i = 0; i < driver.length; i++){

   if (driver[i].PP_interception === null && driver[i].PP_interception_end === null) {
   var pasu_text = 'Возможно этот пассажир вам попути. Он/она выезжает с ост. "' + driver[i].PP_busstop + '"  по улице ' + driver[i].PP_street + ' и едет до ост. "' + driver[i].PP_busstop_end + '" по улице ' + driver[i].PP_street_end ;
   }
   else if (driver[i].PP_interception === null && driver[i].PP_interception_end !== null) {
   var pasu_text = 'Возможно этот пассажир вам попути. Он/она выезжает с ост. "' + driver[i].PP_busstop + '"  по улице ' + driver[i].PP_street + ' едет до пер. ' + driver[i].PP_interception_end + ' - ' + driver[i].PP_street_end ;
   }
   else if (driver[i].PP_interception !== null && driver[i].PP_interception_end === null) {
   var pasu_text = 'Возможно этот пассажир вам попути. Он/она выезжает с пер. ' + driver[i].PP_interception + ' - ' + driver[i].PP_street + ' едет до ост. "' + driver[i].PP_busstop_end + '" по улице ' + driver[i].PP_street_end ;
   }
   else if (driver[i].PP_interception !== null && driver[i].PP_interception_end !== null) {
   var pasu_text = 'Возможно этот пассажир вам попути. Он/она выезжает с пер. ' + driver[i].PP_interception + ' - ' + driver[i].PP_street + ' и едет до пер. ' + driver[i].PP_interception_end + ' - ' + driver[i].PP_street_end ;
   }

    console.log('PASU  ', pasu_text);
    bot.sendMessage(driver[i].DDD_id_user, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                          text: 'Отправить предложение пассажиру',
                          callback_data:  'confirm_pass '+ driver[i].PP_id_user + ' ' + driver[i].DDD_id_user
                         }]
                       ]
                     }

    })
   }
   }
})
})

}


bot.onText(/\/insert_paral_inter_ord/, msg => {setInterval(insert_paral_inter_ord, 10000)})

bot.onText(/\/insert_paral_inter_idpoint/, msg => {setInterval(insert_paral_inter_idpoint, 10000)})


function insert_paral_inter_ord(msg){

 var mysql  = require('mysql');
         var pool = mysql.createPool({
         host     : 'localhost',
         user     : 'mybd_user',
         password : 'admin123',
         database : 'sitebot'
     })

 pool.getConnection(function(err, connection) {


 connection.query(' SELECT id, id_point, id_street, id_interception FROM points1 WHERE id = (SELECT MIN(id) FROM points1 WHERE point_type = 1 AND ord_parinter_min5 IS NULL AND ord_parinter_plu5 IS NULL) ',

     function(err, rows, fields) {
     if (err) throw err;
     var par = JSON.parse(JSON.stringify(rows));
     console.log('Параллельные пересечения', par);
     var test = [];
     for(var i = 0; i < rows.length; i++){
     test.push([ par[i].id_street, par[i].id_interception ]);
     }
     console.log('В ассоц массиве', test);


     connection.query(' SELECT id, id_point, id_street, id_interception, ordinal FROM points1 WHERE (id_interception, id_street) IN (?) ',
     [test] ,
     function(err, rows, fields) {
     if (err) throw err;
     var par2 = JSON.parse(JSON.stringify(rows));
     console.log('Порядковый обратного пересечения', par2);

                if( par2[0] !== undefined ){
                     connection.query(' UPDATE points1 SET ord_parinter_min5 = ?, ord_parinter_plu5 = ? WHERE id = ? ',
                     [ par2[0].ordinal-5, par2[0].ordinal+5, par[0].id ] ,
                     function(err, rows, fields) {
                     if (err) throw err;
                     })
                console.log('since par2 is NOT undefined', par2);
                }
                else {
                     connection.query(' UPDATE points1 SET ord_parinter_min5 = ?, ord_parinter_plu5 = ? WHERE id = ? ',
                     [ 0, 0, par[0].id ] ,
                     function(err, rows, fields) {
                     if (err) throw err;
                     })
                console.log('since min5 is undefined', par2);
                }
     })
 })
 })
 }


function insert_paral_inter_idpoint(msg){

          var mysql  = require('mysql');
          var pool = mysql.createPool({
                  host     : 'localhost',
          user     : 'mybd_user',
          password : 'admin123',
          database : 'sitebot'
      })

  pool.getConnection(function(err, connection) {

  connection.query(' SELECT id, id_interception, ord_parinter_min5, ord_parinter_plu5 FROM points1 WHERE id = (SELECT MIN(id) FROM points1 WHERE point_type = 1 AND point_parinter_min5 IS NULL AND point_parinter_plu5 IS NULL)',
      function(err, rows, fields) {
      if (err) throw err;
      var par = JSON.parse(JSON.stringify(rows));
      console.log('id_inter and ordinals +-5 ', par);

           connection.query(' SELECT id_point FROM points1 WHERE EXISTS (SELECT id_point FROM points1 WHERE id_street = ? AND ordinal = ?) AND id_street = ? AND ordinal = ? ',
           [ par[0].id_interception, par[0].ord_parinter_min5, par[0].id_interception, par[0].ord_parinter_min5 ] ,
           function(err, rows, fields) {
           if (err) throw err;
           var par2 = JSON.parse(JSON.stringify(rows));
           console.log('idpoint min5', par2);

           if( par2[0] !== undefined ){
                connection.query(' UPDATE points1 SET point_parinter_min5 = ? WHERE id = ? ',
                [ par2[0].id_point, par[0].id ] ,
                function(err, rows, fields) {
                if (err) throw err;
                })
           console.log('since min5 is NOT undefined', par2);
           }
           else {
                connection.query(' UPDATE points1 SET point_parinter_min5 = ? WHERE id = ? ',
                [ 0, par[0].id ] ,
                function(err, rows, fields) {
                if (err) throw err;
                })
           console.log('since min5 is undefined', par2);
           }
           })

           connection.query(' SELECT id_point FROM points1 WHERE EXISTS (SELECT id_point FROM points1 WHERE id_street = ? AND ordinal = ?) AND id_street = ? AND ordinal = ? ',
           [ par[0].id_interception, par[0].ord_parinter_plu5, par[0].id_interception, par[0].ord_parinter_plu5 ] ,
           function(err, rows, fields) {
           if (err) throw err;
           var par3 = JSON.parse(JSON.stringify(rows));
           console.log('idpoint plu5', par3);
           if( par3[0] !== undefined ){
              connection.query(' UPDATE points1 SET point_parinter_plu5 = ? WHERE id = ? ',
              [ par3[0].id_point, par[0].id ] ,
              function(err, rows, fields) {
              if (err) throw err;
              })
           console.log('since plu5 is NOT undefined', par3);
           }
           else{
                connection.query(' UPDATE points1 SET point_parinter_plu5 = ? WHERE id = ? ',
                [ 0, par[0].id ] ,
                function(err, rows, fields) {
                if (err) throw err;
                })
           console.log('since plu5 is undefined', par3);
           }
           })


  })
  })

//  pool.getConnection(function(err, connection) {
//
//  connection.query(' SELECT id, id_interception, ord_parinter_min5, ord_parinter_plu5 FROM points1 WHERE id<10 AND point_type = 1 ',
//      function(err, rows, fields) {
//      if (err) throw err;
//      var par = JSON.parse(JSON.stringify(rows));
//      console.log('id_inter and ordinals +-5 ', par);
//      console.log('par вначале ', par[0]);
//      var test = [];
//      for(var i = 0; i < rows.length; i++){
//      test.push([ par[i].id, par[i].id_interception, par[i].ord_parinter_min5, par[i].ord_parinter_plu5 ]);
//      console.log('В ассоц массиве Iki', i);
//      }
//      console.log('В ассоц массиве', test);
//
//      for(var i = 0; i < rows.length; i++){
////           connection.query(' SELECT id_point FROM points1 WHERE EXISTS (SELECT id_point FROM points1 WHERE id_street = 41 AND ordinal = 20) AND id_street = 41 AND ordinal = 20 ',
//////           [ par[i].id_interception, par[i].ord_parinter_min5, par[i].id_interception, par[i].ord_parinter_min5 ] ,
////           function(err, rows, fields) {
////           if (err) throw err;
////           var par2 = JSON.parse(JSON.stringify(rows));
////           console.log('idpoint min5', par2);
////           console.log('idpoint min5 par', par.id);
////           console.log('IIIki min5 ', i);
////
//////           if( par2[i] !== undefined ){
//////                connection.query(' UPDATE points1 SET point_parinter_min5 = ? WHERE id = ? ',
//////                [ par2[i].id_point, par[i].id ] ,
//////                function(err, rows, fields) {
//////                if (err) throw err;
//////                })
//////           }
//////           else {
//////                connection.query(' UPDATE points1 SET point_parinter_min5 = ? WHERE id = ? ',
//////                [ 0, par[i].id ] ,
//////                function(err, rows, fields) {
//////                if (err) throw err;
//////                })
//////           console.log('since min5 is undefined', par2);
//////           }
////           })
//
//           connection.query(' SELECT id_point FROM points1 WHERE EXISTS (SELECT id_point FROM points1 WHERE id_street = ? AND ordinal = ?) AND id_street = ? AND ordinal = ? ',
//           [ par[i].id_interception, par[i].ord_parinter_plu5, par[i].id_interception, par[i].ord_parinter_plu5 ] ,
//           function(err, rows, fields) {
//           if (err) throw err;
//           var par3 = JSON.parse(JSON.stringify(rows));
//           console.log('idpoint plu5', par3);
//           console.log('par plu5 ', par[i]);
//           console.log('IIIki ', i);
//           console.log('par вначале ', par[0]);
////           if( par3[i] !== undefined ){
////              connection.query(' UPDATE points1 SET point_parinter_plu5 = ? WHERE id = ? ',
////              [ par3[i].id_point, par[i].id ] ,
////              function(err, rows, fields) {
////              if (err) throw err;
////              })
////           }
////           else{
////                connection.query(' UPDATE points1 SET point_parinter_plu5 = ? WHERE id = ? ',
////                [ 0, par[i].id ] ,
////                function(err, rows, fields) {
////                if (err) throw err;
////                })
////           console.log('since plu5 is undefined', par3);
////           }
//           })
//         console.log('IIIki za ifom', i);
//      }
//  })
//  })
}
