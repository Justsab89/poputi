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

//connection.query('SELECT * FROM ?? WHERE id_user = ? AND begend = ?',[ route_driver ,user_id, 'beg' ], function (err, rows, fields) {
//if (err) throw err;
//var str_parse_rows = JSON.parse(JSON.stringify(rows));
//console.log('Vibor begov', rows);
//console.log('BEGENDIWEEE', rows.length-1);
//console.log('BEG', str_parse_rows[rows.length-1].begend);
//console.log('STREET', str_parse_rows[rows.length-1].street);
//console.log('INTERCEPTION', str_parse_rows[rows.length-1].interception);
//
//if (str_parse_rows[rows.length-1].begend ='beg' && (str_parse_rows[rows.length-1].street === null || str_parse_rows[rows.length-1].interception === null)){
//
//
//connection.beginTransaction(function(err) {
//  if (err) { throw err; }
//  connection.query('SELECT * FROM points WHERE street = ? AND interception = (SELECT interception FROM ?? WHERE id_user = ? AND id = (SELECT id FROM (SELECT * FROM ??) AS route2 ORDER BY id DESC LIMIT 1) AND street IS NULL AND interception IS NOT NULL)',[zapros, route_driver, user_id, route_driver], function (err, rows1, fields) {
//      if (err) {
//      return
//      connection.rollback(function() {
//        throw err;
//      });
//    }
//console.log('ВЫБРАЛИИИИ');
//    var district = [];
//              for(var i = 0; i < rows1.length; i++){
//              district[district.length] = rows1[i].district;
//              }
//          var point_type = [];
//              for(var i = 0; i < rows1.length; i++){
//              point_type[point_type.length] = rows1[i].point_type;
//              }
//          var id_street = [];
//              for(var i = 0; i < rows1.length; i++){
//              id_street[id_street.length] = rows1[i].id_street;
//              }
//          var id_interception = [];
//              for(var i = 0; i < rows1.length; i++){
//              id_interception[id_interception.length] = rows1[i].id_interception;
//              }
//          var id_point = [];
//              for(var i = 0; i < rows1.length; i++){
//              id_point[id_point.length] = rows1[i].id_point;
//              }
//          var ordinal = [];
//              for(var i = 0; i < rows1.length; i++){
//              ordinal[ordinal.length] = rows1[i].ordinal;
//              }
//          var nearby_interception = [];
//              for(var i = 0; i < rows1.length; i++){
//              nearby_interception[nearby_interception.length] = rows1[i].nearby_interception;
//              }
//
//    connection.query('UPDATE ?? SET street = ?, district = ?, point_type = ?, id_street = ?, id_interception = ?, id_point = ?, ordinal = ?, nearby_interception = ? WHERE id_user = ? AND id = (SELECT id FROM (SELECT * FROM ??) AS route2 ORDER BY id DESC LIMIT 1) AND street IS NULL AND interception IS NOT NULL ',
//    [ route_driver, zapros, district[0], point_type[0], id_street[0], id_interception[0], id_point[0], ordinal[0], nearby_interception[0], user_id, route_driver ], function (err, rows, fields) {
//        if (err) {
//        return
//        connection.rollback(function() {
//          throw err;
//        });
//      };
//      console.log('СТРИТ ВНЕСлиии');
//      console.log(district);
//
//      console.log('Стрит изменения'+rows.changedRows);
//           connection.query('UPDATE ?? SET interception = ? WHERE id_user = ? AND id = (SELECT id FROM (SELECT * FROM ??) AS route2 ORDER BY id DESC LIMIT 1 ) AND street IS NULL AND interception IS NULL',
//           [ route_driver, zapros, user_id, route_driver ], function(err, rows, fields) {
//           if (err) {return connection.rollback(function() {throw err}); }
//           console.log ('ИНТЕРСЕПШН  !!!!');
//           console.log(rows.changedRows);
//                 connection.commit(function(err) {
//                   if (err) {
//                     return connection.rollback(function() {
//                       throw err;
//                     });
//                   }
//                   console.log('success!');
//                 })
//           });
//      connection.commit(function(err) {
//        if (err) {
//          return connection.rollback(function() {
//            throw err;
//          });
//        }
//        console.log('success!');
//      });
//    });
//  });
//})
//}
////else {}
//else {

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



function find(msg){

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

// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки
connection.query(' SELECT id, id_user, id_point FROM route WHERE id_point IN (4152, 3756) ', function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('Нашли авто',driver);
// Теперь выбираем именно тех водителей, у которых начальный id_point пассажира стоит в списке маршрута водителя первым
    var test = [];
    for(var i = 0; i < driver.length/2; i++){
       if ( driver[2*i].id_point == 4152 ) {
       test.push ([ driver[2*i].id, driver[2*i].id_user, driver[2*i].id_point ]);
       test.push ([ driver[2*i+1].id, driver[2*i+1].id_user, driver[2*i+1].id_point ]);
       }
       else {}
    }
    console.log('По парам', test);
    console.log('Айди водителей', test[0][1]);
    console.log('Айди водителей lenght', test.length);
// Теперь выбираем водителей, чтобы не повторялись
    var test2 = [];
        for(var i = 0; i < test.length/2; i++){
          test2.push ([ test[2*i][0], test[2*i][1], test[2*i][2] ]);
        }
    console.log('Только Айди водителей', test2);
})
})
}



function tabu_pass_on_parinter (msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

// Сначала находим всех активных пассажиров
connection.query(' SELECT * FROM route_p WHERE time_end > NOW() AND status <> "busy" ', function(err, rows, fields) {
if (err) throw err;
var active_passenger = JSON.parse(JSON.stringify(rows));
console.log('Активные пассажиры ',active_passenger);

if (active_passenger.length == 0) { console.log('Сейчас нет пассажиров не плохо было бы остановить таймер', active_passenger); timer.pause(); }
else{
console.log('есть пассажиры', active_passenger)
console.log('Колво активных пассажиров ', active_passenger.length)

// Всем активным пассажирам закидываем попутных водителей на утверждение
// Когда из базы выбираем активных пассажиров, в результате получаем  2 строки, поэтому кол-во итерации в цикле должно быть в два раза меньше (i < active_passenger.length/2)
for(var i = 0; i < active_passenger.length/2; i++){

console.log('Итерация 2*i  ', 2*i );
console.log('Итерация 2*i+1  ', 2*i+1 ); active_passenger[2*i].interception

console.log('active_passenger[2*i].interception  ', active_passenger[2*i].interception );
console.log('active_passenger[2*i+1].interception  ', active_passenger[2*i+1].interception );

console.log('1  ',active_passenger[2*i].id_point);
console.log('2  ',active_passenger[2*i+1].id_point);
var first_point = active_passenger[2*i].id_point;
var id_user_pas = active_passenger[2*i].id_user;

//  var inter_beg = active_passenger[2*i].interception;
//  var inter_end = active_passenger[2*i+1].interception;

  var nearby = active_passenger[2*i].nearby_interception;
  var beg = nearby.split(" ");
  console.log('nearby beg[0] is:', beg[0]);
  var busstop_beg = active_passenger[2*i].busstop;
  var street_beg = active_passenger[2*i].street;

  var nearby = active_passenger[2*i+1].nearby_interception;
  var end = nearby.split(" ");
  console.log('nearby end[0] is:', end[0]);
  var busstop_end = active_passenger[2*i+1].busstop;
  var street_end = active_passenger[2*i+1].street;

if (active_passenger[2*i].interception === null && active_passenger[2*i+1].interception === null) {

var beg_inter = active_passenger[2*i].id_point;
var end_inter = active_passenger[2*i+1].id_point;

//var pp = '%' + beg[0] + '%';
//var pp1 = '%' + end[0] + '%';
//
//var qq = '%' + beg[2] + '%';
//var qq1 = '%' + end[2] + '%';

var pp = beg[0];
var pp1 = end[0];

var qq = beg[2];
var qq1 = end[2];

// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки
connection.query(' SELECT TIME(time_beg) AS time_beg, street, interception, id_user FROM route WHERE begend = "beg" AND status IS NULL AND time_end > NOW() AND id_user IN (SELECT DISTINCT id_user FROM route AS route2 WHERE id_point IN (?,?,?) OR point_parinter_min5 IN (?,?,?)  OR point_parinter_plu5 IN (?,?,?) AND time_end > NOW() AND EXISTS (SELECT id_user FROM route WHERE id_point IN (?,?,?) OR point_parinter_min5 IN (?,?,?)  OR point_parinter_plu5 IN (?,?,?) AND id_user = route2.id_user AND time_end > NOW() ))  ',
[ pp, qq , beg_inter, pp, qq , beg_inter, pp, qq , beg_inter, pp1, qq1, end_inter, pp1, qq1, end_inter, pp1, qq1, end_inter ], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('Нашли авто both are busstops', driver);
   if (driver !== []){
   for(var i = 0; i < driver.length; i++){
    var pasu_text = 'Возможно этот пассажир вам попути. Он/она выезжает с ост. "' + busstop_beg + '"  по улице ' + street_beg + ' и едет до ост. "' + busstop_end + '" по улице ' + street_end ;

    console.log('PASU  ', pasu_text);
    bot.sendMessage(driver[i].id_user, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Отправить предложение пассажиру',
                           callback_data:  'confirm_pass '+id_user_pas
                         }]
                       ]
                     }

    })
   }
}
})
}

else if (active_passenger[2*i].interception === null && active_passenger[2*i+1].interception !== null) {

  var inter_end = active_passenger[2*i+1].interception;
  var nearby = active_passenger[2*i].nearby_interception;
  var beg = nearby.split(" ");
  console.log('nearby beg[0] is:', beg[0]);

  var nearby = active_passenger[2*i+1].nearby_interception;
  var end = nearby.split(" ");
  console.log('nearby end[0] is:', end[0]);

var beg_inter = active_passenger[2*i].id_point;
var end_inter = active_passenger[2*i+1].id_point;

var pp = '%' + beg[0] + '%';

var qq = '%' + beg[2] + '%';


// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки. Оба пункта остановки
connection.query(' SELECT TIME(time_beg) AS time_beg, street, interception, id_user FROM route WHERE begend = "beg" AND status IS NULL AND time_end > NOW() AND id_user IN (SELECT DISTINCT id_user FROM route AS route2 WHERE (id_point LIKE ? OR id_point LIKE ? OR id_point = ?) OR (point_parinter_min5 LIKE ? OR point_parinter_min5 LIKE ? OR point_parinter_min5 = ?)  OR (point_parinter_plu5 LIKE ? OR point_parinter_plu5 LIKE ? OR point_parinter_plu5 = ?)  AND time_end > NOW() AND EXISTS (SELECT id_user FROM route WHERE time_end > NOW() AND id_point LIKE ? OR point_parinter_min5 = ? OR point_parinter_plu5 = ? AND id_user = route2.id_user ))  ',
[ pp, qq , beg_inter, pp, qq , beg_inter, pp, qq , beg_inter, end_inter, end_inter, end_inter ], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('Нашли авто end is inter',driver);
if (driver !== []){
   for(var i = 0; i < driver.length; i++){
    var pasu_text = 'Возможно этот пассажир вам попути. Он/она выезжает с ост. "' + busstop_beg + '"  по улице ' + street_beg + ' едет до пер. ' + inter_end + ' - ' + street_end ;

    console.log('PASU  ', pasu_text);
    bot.sendMessage(driver[i].id_user, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Отправить предложение пассажиру',
                           callback_data:  'confirm_pass '+id_user_pas
                         }]
                       ]
                     }

    })
   }
}
else {}
})
}

else if (active_passenger[2*i].interception !== null && active_passenger[2*i+1].interception === null) {

  var inter_beg = active_passenger[2*i].interception;
  var nearby = active_passenger[2*i].nearby_interception;
  var beg = nearby.split(" ");
  console.log('nearby beg[0] is:', beg[0]);

  var nearby = active_passenger[2*i+1].nearby_interception;
  var end = nearby.split(" ");
  console.log('nearby end[0] is:', end[0]);

var beg_inter = active_passenger[2*i].id_point;
var end_inter = active_passenger[2*i+1].id_point;

var pp1 = '%' + end[0] + '%';

var qq1 = '%' + end[2] + '%';

// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки
connection.query(' SELECT TIME(time_beg) AS time_beg, street, interception, id_user FROM route WHERE begend = "beg" AND status IS NULL AND time_end > NOW()  AND id_user IN (SELECT DISTINCT id_user FROM route AS route2 WHERE (id_point LIKE ? OR id_point LIKE ? OR id_point = ?) OR (point_parinter_min5 LIKE ? OR point_parinter_min5 LIKE ? OR point_parinter_min5 = ?)  OR (point_parinter_plu5 LIKE ? OR point_parinter_plu5 LIKE ? OR point_parinter_plu5 = ?) AND time_end > NOW() AND EXISTS (SELECT id_user FROM route WHERE (id_point = ? OR point_parinter_min5 = ? OR point_parinter_plu5 = ?) AND id_user = route2.id_user AND time_end > NOW() ))   ',
[ pp1, qq1 , end_inter, pp1, qq1 , end_inter, pp1, qq1 , end_inter, beg_inter, beg_inter, beg_inter ], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('Нашли авто beg is inter',driver);
if (driver !== []){
   for(var i = 0; i < driver.length; i++){
    var pasu_text = 'Возможно этот пассажир вам попути. Он/она выезжает с пер. ' + inter_beg + ' - ' + street_beg + ' едет до ост. "' + busstop_end + '" по улице ' + street_end ;

    console.log('PASU  ', pasu_text);
    bot.sendMessage(driver[i].id_user, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Отправить предложение пассажиру',
                           callback_data:  'confirm_pass '+id_user_pas
                         }]
                       ]
                     }

    })
   }
}
else {}
})
}

else if (active_passenger[2*i].point_type == 1 && active_passenger[2*i+1].point_type == 1) {

  var id_point_beg = active_passenger[2*i].id_point;
  var id_point_end = active_passenger[2*i+1].id_point;

  var point_parinter_min5_beg = active_passenger[2*i].point_parinter_min5;
  var point_parinter_min5_end = active_passenger[2*i+1].point_parinter_min5;

  var point_parinter_plu5_beg = active_passenger[2*i].point_parinter_plu5;
  var point_parinter_plu5_end = active_passenger[2*i+1].point_parinter_plu5;

  var inter_beg = active_passenger[2*i].interception;
  var inter_end = active_passenger[2*i+1].interception;
  var street_beg = active_passenger[2*i].street;
  var street_end = active_passenger[2*i+1].street;

console.log('active_passenger[2*i].id_point ',id_point_beg);
console.log('active_passenger[2*i+1].id_point ',id_point_end);
console.log('active_passenger[2*i].point_parinter_min5 ',point_parinter_min5_beg);
console.log('active_passenger[2*i+1].point_parinter_min5 ',point_parinter_min5_end);
console.log('active_passenger[2*i].point_parinter_plu5 ',point_parinter_plu5_beg);
console.log('active_passenger[2*i+1].point_parinter_plu5 ',point_parinter_plu5_end);
console.log('inter_beg ', inter_beg);
console.log('inter_end ', inter_end);
console.log('street_beg ', street_beg);
console.log('street_end ', street_end);

// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки
connection.query(' SELECT TIME(time_beg) AS time_beg, street, interception, id_user FROM route WHERE begend = "beg" AND status IS NULL AND time_end > NOW() AND id_user IN ( SELECT DISTINCT id_user FROM route AS route2 WHERE id_point IN (?, ?, ?) OR point_parinter_min5 IN (?, ?, ?) OR point_parinter_plu5 IN (?, ?, ?) AND time_end > NOW() AND EXISTS (SELECT id_user FROM route WHERE id_point IN (?, ?, ?) OR point_parinter_min5 IN (?, ?, ?) OR point_parinter_plu5 IN (?, ?, ?) AND id_user = route2.id_user AND time_end > NOW() )  )  ',
[  id_point_beg, point_parinter_min5_beg, point_parinter_plu5_beg,  id_point_beg, point_parinter_min5_beg, point_parinter_plu5_beg,  id_point_beg, point_parinter_min5_beg, point_parinter_plu5_beg, id_point_end, point_parinter_min5_end, point_parinter_plu5_end,  id_point_end, point_parinter_min5_end, point_parinter_plu5_end,  id_point_end, point_parinter_min5_end, point_parinter_plu5_end ], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));



console.log('Нашли авто BOTH inters',driver);
if (driver !== []){

   for(var i = 0; i < driver.length; i++){
     var inter_beg1 = inter_beg;
     var inter_end1 = inter_end;
     var street_beg1 = street_beg;
     var street_end1 = street_end;

   console.log('inter_beg1 ',inter_beg1);
   console.log('inter_end1 ',inter_end1);
   console.log('street_beg1 ',street_beg1);
   console.log('street_end1 ',street_end1);
    var pasu_text = 'Возможно этот пассажир вам попути. Он/она выезжает с пер. ' + inter_beg1 + ' - ' + street_beg1 + ' и едет до пер. ' + inter_end1 + ' - ' + street_end1 ;

    console.log('PASU  ', pasu_text);
    bot.sendMessage( driver[i].id_user, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Отправить предложение пассажиру',
                           callback_data:  'confirm_pass '+id_user_pas
                         }]
                       ]
                     }

    })
   }
}
})
}
else{}
}
}
})
})
}


function tabu_driver_poputi (msg){

var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
    })

pool.getConnection(function(err, connection) {

// Сначала находим всех активных пассажиров
connection.query(' SELECT * FROM route_p WHERE time_end > NOW() AND status <> "busy" ', function(err, rows, fields) {
if (err) throw err;
var active_passenger = JSON.parse(JSON.stringify(rows));
console.log('Активные пассажиры ',active_passenger);

if (active_passenger.length == 0) { console.log('Сейчас нет пассажиров не плохо было бы остановить таймер', active_passenger); timer.pause(); }
else{
console.log('есть пассажиры', active_passenger)

// Всем активным пассажирам закидываем попутных водителей на утверждение
// Когда из базы выбираем активных пассажиров, в результате получаем  2 строки, поэтому кол-во итерации в цикле должно быть в два раза меньше (i < active_passenger.length/2)
for(var i = 0; i < active_passenger.length/2; i++){

console.log('1  ',active_passenger[2*i].id_point);
console.log('2  ',active_passenger[2*i+1].id_point);
var first_point = active_passenger[2*i].id_point;
var id_user_pas = active_passenger[2*i].id_user;

if (active_passenger[2*i].interception === null && active_passenger[2*i+1].interception === null) {
  var nearby = active_passenger[2*i].nearby_interception;
  var beg = nearby.split(" ");
  console.log('nearby beg[0] is:', beg[0]);

  var nearby = active_passenger[2*i+1].nearby_interception;
  var end = nearby.split(" ");
  console.log('nearby end[0] is:', end[0]);

var beg_inter = active_passenger[2*i].id_point;
var end_inter = active_passenger[2*i+1].id_point;

var pp = '%' + beg[0] + '%';
var pp1 = '%' + end[0] + '%';

var qq = '%' + beg[2] + '%';
var qq1 = '%' + end[2] + '%';

// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки
connection.query(' SELECT TIME(time_beg) AS time_beg, street, interception, id_user FROM route WHERE begend = "beg" AND status IS NULL AND time_end > NOW() AND id_user IN (SELECT DISTINCT id_user FROM route AS route2 WHERE time_end > NOW() AND (id_point LIKE ? OR id_point LIKE ? OR id_point = ?) AND EXISTS (SELECT id_user FROM route WHERE (id_point LIKE ? OR id_point LIKE ?  OR id_point = ?) AND id_user = route2.id_user ))  ',
[ pp, qq , beg_inter, pp1, qq1, end_inter ], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('Нашли авто both are busstops', driver);
   if (driver !== []){
   for(var i = 0; i < driver.length; i++){
    var pasu_text = 'Этот водитель выезжает с пересечения ' + driver[i].street + '-' + driver[i].interception + ' в ' + driver[i].time_beg;

    console.log('PASU  ', pasu_text);
    bot.sendMessage(id_user_pas, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Выбрать попутное авто',
                           callback_data:  'driver '+driver[i].id_user
                         }]
                       ]
                     }

    })
   }
}
})
}

else if (active_passenger[2*i].interception === null && active_passenger[2*i+1].interception !== null) {
  var nearby = active_passenger[2*i].nearby_interception;
  var beg = nearby.split(" ");
  console.log('nearby beg[0] is:', beg[0]);

  var nearby = active_passenger[2*i+1].nearby_interception;
  var end = nearby.split(" ");
  console.log('nearby end[0] is:', end[0]);

var beg_inter = active_passenger[2*i].id_point;
var end_inter = active_passenger[2*i+1].id_point;

var pp = '%' + beg[0] + '%';

var qq = '%' + beg[2] + '%';


// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки
connection.query(' SELECT TIME(time_beg) AS time_beg, street, interception, id_user FROM route WHERE begend = "beg" AND status IS NULL AND time_end > NOW() AND id_user IN (SELECT DISTINCT id_user FROM route AS route2 WHERE time_end > NOW() AND id_point LIKE ? OR id_point LIKE ? OR id_point = ? AND EXISTS (SELECT id_user FROM route WHERE id_point = ? AND id_user = route2.id_user ))  ',
[ pp, qq , beg_inter, end_inter ], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('Нашли авто end is inter',driver);
if (driver !== []){
   for(var i = 0; i < driver.length; i++){
    var pasu_text = 'Этот водитель выезжает с пересечения ' + driver[i].street + '-' + driver[i].interception + ' в ' + driver[i].time_beg;

    console.log('PASU  ', pasu_text);
    bot.sendMessage(id_user_pas, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Выбрать попутное авто',
                           callback_data:  'driver '+driver[i].id_user
                         }]
                       ]
                     }

    })
   }
}
else {}
})
}

else if (active_passenger[2*i].interception !== null && active_passenger[2*i+1].interception === null) {
  var nearby = active_passenger[2*i].nearby_interception;
  var beg = nearby.split(" ");
  console.log('nearby beg[0] is:', beg[0]);

  var nearby = active_passenger[2*i+1].nearby_interception;
  var end = nearby.split(" ");
  console.log('nearby end[0] is:', end[0]);

var beg_inter = active_passenger[2*i].id_point;
var end_inter = active_passenger[2*i+1].id_point;

var pp1 = '%' + end[0] + '%';

var qq1 = '%' + end[2] + '%';

// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки
connection.query(' SELECT TIME(time_beg) AS time_beg, street, interception, id_user FROM route WHERE begend = "beg" AND status IS NULL AND time_end > NOW()  AND id_user IN (SELECT DISTINCT id_user FROM route AS route2 WHERE time_end > NOW() AND (id_point LIKE ? OR id_point LIKE ? OR id_point = ?) AND EXISTS (SELECT id_user FROM route WHERE id_point = ? AND id_user = route2.id_user ))   ',
[ pp1, qq1 , end_inter, beg_inter ], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('Нашли авто beg is inter',driver);
if (driver !== []){
   for(var i = 0; i < driver.length; i++){
    var pasu_text = 'Этот водитель выезжает с пересечения ' + driver[i].street + '-' + driver[i].interception + ' в ' + driver[i].time_beg;

    console.log('PASU  ', pasu_text);
    bot.sendMessage(id_user_pas, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Выбрать попутное авто',
                           callback_data:  'driver '+driver[i].id_user
                         }]
                       ]
                     }

    })
   }
}
else {}
})
}

else if (active_passenger[2*i].interception !== null && active_passenger[2*i+1].interception !== null) {

// Сначала просто находим всех водителей, у которых в маршруте есть определенные точки
connection.query(' SELECT TIME(time_beg) AS time_beg, street, interception, id_user FROM route WHERE begend = "beg" AND status IS NULL AND time_end > NOW() AND id_user IN ( SELECT id_user FROM route WHERE time_end > NOW() AND id_point IN (?, ?) )  ',
[ active_passenger[2*i].id_point, active_passenger[2*i+1].id_point ], function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('Нашли авто BOTH inters',driver);
if (driver !== []){

   for(var i = 0; i < driver.length; i++){
    var pasu_text = 'Этот водитель выезжает с пересечения ' + driver[i].street + '-' + driver[i].interception + ' в ' + driver[i].time_beg;

    console.log('PASU  ', pasu_text);
    bot.sendMessage(id_user_pas, pasu_text ,{
                     reply_markup: {
                       inline_keyboard: [
                         [{
                           text: 'Выбрать попутное авто',
                           callback_data:  'driver '+driver[i].id_user
                         }]
                       ]
                     }

    })
   }
}
else {}
})
}
else{}
}
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
// Формирует новую таблицу route_p1, где создает два отдельных столбца near1 и near2 из одного столбца nearby_interception таблицы route_p
                     ' FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_beg AS P_time_beg, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p  WHERE time_end > NOW() AND status <> "busy" ) AS route_p1 ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception и формирует новую таблицу table1. И затем из строк таблицы table1 выбирает строки у которых столбец begend = "beg"
                         ' JOIN route  WHERE (route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point) AND route.time_end > NOW() ORDER BY PP_id_user, PP_id_route) AS table1 WHERE PP_begend = "beg"  AND ' +
// Возвращает TRUE если запрос, указанный ниже подтверждается
                            ' EXISTS  (SELECT * FROM  (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_begend AS PP_begend, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.id_point AS DD_id_point,  route.time_end AS DD_time_end  ' +
                                ' FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p  WHERE time_end > NOW() AND status <> "busy" ) AS route_p1 ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception и формирует новую таблицу table2. И затем из строк таблицы table2 выбирает строки у которых столбец begend = "end" и id_user строки из таблицы table1 равен id_user-у строки таблицы table2
                                    ' JOIN route  WHERE (route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point)  AND route.time_end > NOW() ORDER BY PP_id_user, PP_id_route)  AS table2 WHERE PP_begend = "end" AND table1.PP_id_user = table2.PP_id_user AND table1.DD_id_user = table2.DD_id_user) ) AS table3 '

connection.query( sql , function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('experiment ', driver);

})
})

pool.getConnection(function(err, connection) {

// Так как у пассажира и водителя, у которых совпался маршрут по нескольким столбцам, могут быть выбраны несколько строк, в конце выбираются уникальные столбцы из таблицы table3
var sql = ' SELECT DISTINCT PP_id_user, PP_begend, PP_id_route, PP_street, PP_interception, PP_busstop, (SELECT street FROM route_p WHERE begend = "end" AND id_route = PP_id_route AND id_user = PP_id_user ) AS PP_street_end, (SELECT interception FROM route_p WHERE begend = "end" AND id_route = PP_id_route AND id_user = PP_id_user ) AS PP_interception_end, (SELECT busstop FROM route_p WHERE begend = "end" AND id_route = PP_id_route AND id_user = PP_id_user ) AS PP_busstop_end, DD_id_user  AS DDD_id_user, DD_id_route  AS DDD_id_route, ( SELECT street FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS street, ( SELECT interception FROM route WHERE begend = "beg" AND id_user = DDD_id_user AND id_route = DDD_id_route ) AS interception, DD_time_beg' +
             ' FROM (SELECT PP_id_user, PP_id_route, PP_id_point, PP_street, PP_interception, PP_busstop, PP_begend, PP_time_beg, PP_time_end, PP_near1, PP_near2, DD_id_user,  DD_id_route, DD_street, DD_interception, DD_id_point, DD_time_beg, DD_time_end ' +
                ' FROM (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_street AS PP_street, route_p1.P_interception AS PP_interception, route_p1.P_busstop AS PP_busstop, route_p1.P_begend AS PP_begend, route_p1.P_time_beg AS PP_time_beg, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.street AS DD_street,  route.interception AS DD_interception,  route.id_point AS DD_id_point,  TIME(route.time_beg) AS  DD_time_beg,  route.time_end AS  DD_time_end  ' +
// Формирует новую таблицу route_p1, где создает два отдельных столбца near1 и near2 из одного столбца nearby_interception таблицы route_p
                     ' FROM (SELECT id_user AS P_id_user, begend AS P_begend, id_route AS P_id_route, id_point AS P_id_point, street AS P_street, interception AS P_interception, busstop AS P_busstop, time_beg AS P_time_beg, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p  WHERE time_end > NOW() AND status <> "busy" ) AS route_p1 ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception, с point_parinter_min5, с point_parinter_plu5 и формирует новую таблицу table1. И затем из строк таблицы table1 выбирает строки у которых столбец begend = "beg"
                         ' JOIN route  WHERE  (route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  OR  route_p1.near1 = route.point_parinter_min5  OR  route_p1.near2 = route.point_parinter_plu5 OR  route_p1.near2 = route.point_parinter_min5  OR  route_p1.near1 = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_min5)  AND route.time_end > NOW()  ORDER BY PP_id_user, PP_id_route) AS table1 WHERE PP_begend = "beg" ' +
// Возвращает TRUE если запрос, указанный ниже подтверждается
                             ' AND  EXISTS  (SELECT * FROM  (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_begend AS PP_begend, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.id_point AS DD_id_point,  route.time_end AS DD_time_end   FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p  WHERE time_end > NOW() AND status <> "busy" ) AS route_p1 JOIN route ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception, с point_parinter_min5, с point_parinter_plu5 и формирует новую таблицу table2. И затем из строк таблицы table2 выбирает строки у которых столбец begend = "end" и id_user строки из таблицы table1 равен id_user-у строки таблицы table2  и все это сохраняет как таблицу table3
                                   ' WHERE  (route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  OR  route_p1.near1 = route.point_parinter_min5  OR  route_p1.near2 = route.point_parinter_plu5 OR  route_p1.near2 = route.point_parinter_min5  OR  route_p1.near1 = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_min5 )  AND route.time_end > NOW()  ORDER BY PP_id_user, PP_id_route)  AS table2 WHERE PP_begend = "end" AND table1.PP_id_user = table2.PP_id_user AND table1.DD_id_user = table2.DD_id_user) ) AS table3 ';

connection.query(sql,function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('par interception ', driver);
})
})



pool.getConnection(function(err, connection) {

var sql = ' SELECT route_p.id_user AS P_id_user, route_p.id_route AS P_id_route, route_p.begend AS P_begend, route_p.street AS P_street, route_p.interception AS P_interception, ' +
          ' route.id_user AS D_id_user, route.id_route AS D_id_route, route.begend AS D_begend, route.street AS D_street, route.interception AS D_interception ' +
          ' FROM route_p JOIN route ' +
          ' WHERE (route_p.id_point = route.id_point  OR  route_p.id_point = route.point_parinter_plu5  OR  route_p.id_point = route.point_parinter_min5) AND route.time_end > NOW() AND route_p.time_end > NOW() ' ;

// AND status <> "busy"
// Так как у пассажира и водителя, у которых совпался маршрут по нескольким столбцам, могут быть выбраны несколько строк, в конце выбираются уникальные столбцы из таблицы table3
var sql1 = ' SELECT PP_id_user, PP_id_route, PP_id_point, PP_street, PP_interception, PP_busstop, PP_begend, PP_time_beg, PP_time_end, PP_near1, PP_near2, DD_id_user,  DD_id_route, DD_street, DD_interception, DD_id_point, DD_time_beg, DD_time_end ' +
                ' FROM (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_street AS PP_street, route_p1.P_interception AS PP_interception, route_p1.P_busstop AS PP_busstop, route_p1.P_begend AS PP_begend, route_p1.P_time_beg AS PP_time_beg, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.street AS DD_street,  route.interception AS DD_interception,  route.id_point AS DD_id_point,  TIME(route.time_beg) AS  DD_time_beg,  route.time_end AS  DD_time_end  ' +
// Формирует новую таблицу route_p1, где создает два отдельных столбца near1 и near2 из одного столбца nearby_interception таблицы route_p
                     ' FROM (SELECT id_user AS P_id_user, begend AS P_begend, id_route AS P_id_route, id_point AS P_id_point, street AS P_street, interception AS P_interception, busstop AS P_busstop, time_beg AS P_time_beg, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p  WHERE time_end > NOW() AND status <> "busy" ) AS route_p1 ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception, с point_parinter_min5, с point_parinter_plu5 и формирует новую таблицу table1. И затем из строк таблицы table1 выбирает строки у которых столбец begend = "beg"
                         ' JOIN route  WHERE  (route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  OR  route_p1.near1 = route.point_parinter_min5  OR  route_p1.near2 = route.point_parinter_plu5 OR  route_p1.near2 = route.point_parinter_min5  OR  route_p1.near1 = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_min5)  AND route.time_end > NOW()  ORDER BY PP_id_user, PP_id_route) AS table1 WHERE PP_begend = "beg" ' +
// Возвращает TRUE если запрос, указанный ниже подтверждается
                             ' AND  EXISTS  (SELECT * FROM  (SELECT  route_p1.P_id_user AS PP_id_user,  route_p1.P_id_route AS PP_id_route,  route_p1.P_id_point AS PP_id_point, route_p1.P_begend AS PP_begend, route_p1.P_time_end AS PP_time_end, route_p1.near1 AS PP_near1, route_p1.near2 AS PP_near2, route.id_user AS DD_id_user,  route.id_route AS DD_id_route,  route.id_point AS DD_id_point,  route.time_end AS DD_time_end   FROM (SELECT id_user AS P_id_user, id_route AS P_id_route, id_point AS P_id_point, begend AS P_begend, time_end AS P_time_end, SUBSTRING (nearby_interception, 1,4) AS near1, SUBSTRING (nearby_interception, 8,4) AS near2 FROM route_p  WHERE time_end > NOW() AND status <> "busy" ) AS route_p1 JOIN route ' +
// Выбирает строки у которых совпадают id_point-ы, id_point с nearby_interception, с point_parinter_min5, с point_parinter_plu5 и формирует новую таблицу table2. И затем из строк таблицы table2 выбирает строки у которых столбец begend = "end" и id_user строки из таблицы table1 равен id_user-у строки таблицы table2  и все это сохраняет как таблицу table3
                                   ' WHERE  (route_p1.P_id_point = route.id_point  OR  route_p1.near1 = route.id_point OR  route_p1.near2 = route.id_point  OR  route_p1.near1 = route.point_parinter_min5  OR  route_p1.near2 = route.point_parinter_plu5 OR  route_p1.near2 = route.point_parinter_min5  OR  route_p1.near1 = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_plu5  OR  route_p1.P_id_point = route.point_parinter_min5)  AND route.time_end > NOW()  ORDER BY PP_id_user, PP_id_route)  AS table2 WHERE PP_begend = "end" AND table1.PP_id_user = table2.PP_id_user AND table1.DD_id_user = table2.DD_id_user) ';

connection.query( sql ,function(err, rows, fields) {
if (err) throw err;
var driver = JSON.parse(JSON.stringify(rows));
console.log('zanovo ', driver);
})
})




function update_direct1(query){

        var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
        })

var user_id = query.message.chat.id;
var zapros = query.data;
  var str = query.data;
  var res = str.split(" ");
  console.log('res is:', res[1]);

if (res[0] == 'mkdk_dir1'){ var district = 'mkdk';}
else if (res[0] == 'grd_dir1'){ var district = 'grd';}
else if (res[0] == 'saran_dir1'){ var district = 'saran';}
else if (res[0] == 'aktas_dir1'){ var district = 'aktas';}
else if (res[0] == 'dubovka_dir1'){ var district = 'dubovka';}
else if (res[0] == 'fedorovka_dir1'){ var district = 'fedorovka';}
else if (res[0] == 'bazar_dir1'){ var district = 'bazar';}
else if (res[0] == 'yug_dir1'){ var district = 'yug';}
else if (res[0] == 'srt_dir1'){ var district = 'srt';}
else if (res[0] == 'doskey_dir1'){ var district = 'doskey';}
else if (res[0] == 'trud_dir1'){ var district = 'trud';}
else if (res[0] == 'uwtobe_dir1'){ var district = 'uwtobe';}
else if (res[0] == 'prihon_dir1'){ var district = 'prihon';}
else if (res[0] == 'zhbi_dir1'){ var district = 'zhbi';}
else if (res[0] == 'novouzenka_dir1'){ var district = 'novouzenka';}
else if (res[0] == 'malsaran_dir1'){ var district = 'malsaran';}

pool.getConnection(function(err, connection) {

    connection.query(' INSERT INTO users (id_user, direct1) VALUES (?,?) ',[ user_id, district, user_id ], function(err, rows, fields) {
      if (err) throw err;
      console.log('direct 1 is inserted');
    })
})

}



function update_direct2(query){

        var mysql  = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'mybd_user',
        password : 'admin123',
        database : 'sitebot'
        })

var user_id = query.message.chat.id;
var zapros = query.data;
  var str = query.data;
  var res = str.split(" ");
  console.log('res is:', res[1]);

if (res[0] == 'mkdk_dir2'){ var district = 'mkdk';}
else if (res[0] == 'grd_dir2'){ var district = 'grd';}
else if (res[0] == 'saran_dir2'){ var district = 'saran';}
else if (res[0] == 'aktas_dir2'){ var district = 'aktas';}
else if (res[0] == 'dubovka_dir2'){ var district = 'dubovka';}
else if (res[0] == 'fedorovka_dir2'){ var district = 'fedorovka';}
else if (res[0] == 'bazar_dir2'){ var district = 'bazar';}
else if (res[0] == 'yug_dir2'){ var district = 'yug';}
else if (res[0] == 'srt_dir2'){ var district = 'srt';}
else if (res[0] == 'doskey_dir2'){ var district = 'doskey';}
else if (res[0] == 'trud_dir2'){ var district = 'trud';}
else if (res[0] == 'uwtobe_dir2'){ var district = 'uwtobe';}
else if (res[0] == 'prihon_dir2'){ var district = 'prihon';}
else if (res[0] == 'zhbi_dir2'){ var district = 'zhbi';}
else if (res[0] == 'novouzenka_dir2'){ var district = 'novouzenka';}
else if (res[0] == 'malsaran_dir2'){ var district = 'malsaran';}

pool.getConnection(function(err, connection) {

    connection.query(' UPDATE users SET direct2 = ?  WHERE id_user = ? ',[ district, user_id ], function(err, rows, fields) {
    if (err) throw err;
    console.log('direct 2 is updated');

              connection.query(' SELECT DISTINCT direct1 FROM users WHERE id_user = ?  ',[ user_id ], function(err, rows, fields) {
              if (err) throw err;
              var dir = JSON.parse(JSON.stringify(rows));
              var direction = dir[0].direct1 + '00' + district;
              console.log('direction ', direction);

                            connection.query(' UPDATE users SET direction = ? WHERE id_user = ? ',[ direction, user_id ], function(err, rows, fields) {
                            if (err) throw err;
                            console.log('direction is updated');
                            })
              })
    })
})
// Теперь выдаем опцию с выбором режима
vodorpas_query(query);
}



function vibor_direct1(msg) {

const chatId = msg.chat.id

const text = 'Небольшой опрос перед регистрацией.\nУкажите в каком направлений вы часто ездите. Например из дома на работу\nУкажите сначала ОТКУДА'


// Теперь отправляем карту
bot.sendPhoto(chatId, fs.readFileSync(__dirname + '/picture-map.png'), {
caption: 'На карте указаны границы районов'
})

bot.sendMessage(chatId, text, {
                     reply_markup: {
                      inline_keyboard: [
                         [{
                           text: 'Из майкудука',
                           callback_data: 'mkdk_dir1'
                         }],
                         [{
                           text: 'Из центра',
                           callback_data: 'grd_dir1'
                         }],
                         [{
                           text: 'Из юго-востока',
                           callback_data: 'yug_dir1'
                         }],
                         [{
                           text: 'Из района базара',
                           callback_data: 'bazar_dir1'
                         }],
                         [{
                           text: 'Из пришахтинска',
                           callback_data: 'prihon_dir1'
                         }],
                         [{
                           text: 'Из новоузенки',
                           callback_data: 'novouzenka_dir1'
                         }],
                         [{
                           text: 'Из района ЖБИ',
                           callback_data: 'zhbi_dir1'
                         }],
                         [{
                           text: 'Из сарани',
                           callback_data: 'saran_dir1'
                         }],
                         [{
                           text: 'Из малой сарани',
                           callback_data: 'malsaran_dir1'
                         }],
                         [{
                           text: 'Из актаса',
                           callback_data: 'aktas_dir1'
                         }],
                         [{
                           text: 'Из дубовки',
                           callback_data: 'dubovka_dir1'
                         }],
                         [{
                           text: 'Из федоровки',
                           callback_data: 'fedorovka_dir1'
                         }],
                         [{
                           text: 'Из сортировки',
                           callback_data: 'srt_dir1'
                         }],
                         [{
                           text: 'Из доскея',
                           callback_data: 'doskey_dir1'
                         }],
                         [{
                           text: 'Из поселка Трудовое',
                           callback_data: 'trud_dir1'
                         }],
                         [{
                           text: 'Из уштобе',
                           callback_data: 'uwtobe_dir1'
                         }]
                       ]
                     }
                   })

}



function vibor_direct2(query) {

const chatId = query.message.chat.id

const text = 'Небольшой опрос перед регистрацией.\nУкажите в каком направлений вы часто ездите. Например из дома на работу\nТеперь укажите КУДА'


// Теперь отправляем карту
bot.sendPhoto(chatId, fs.readFileSync(__dirname + '/picture-map.png'), {
caption: 'На карте указаны границы районов'
})

bot.sendMessage(chatId, text, {
                     reply_markup: {
                      inline_keyboard: [
                         [{
                           text: 'В майкудук',
                           callback_data: 'mkdk_dir2'
                         }],
                         [{
                           text: 'В центр',
                           callback_data: 'grd_dir2'
                         }],
                         [{
                           text: 'НА юго-восток',
                           callback_data: 'yug_dir2'
                         }],
                         [{
                           text: 'В район базара',
                           callback_data: 'bazar_dir2'
                         }],
                         [{
                           text: 'В пришахтинск',
                           callback_data: 'prihon_dir2'
                         }],
                         [{
                           text: 'В новоузенку',
                           callback_data: 'novouzenka_dir2'
                         }],
                         [{
                           text: 'В район ЖБИ',
                           callback_data: 'zhbi_dir2'
                         }],
                         [{
                           text: 'В сарань',
                           callback_data: 'saran_dir2'
                         }],
                         [{
                           text: 'В малую сарань',
                           callback_data: 'malsaran_dir2'
                         }],
                         [{
                           text: 'В актас',
                           callback_data: 'aktas_dir2'
                         }],
                         [{
                           text: 'В дубовку',
                           callback_data: 'dubovka_dir2'
                         }],
                         [{
                           text: 'В федоровку',
                           callback_data: 'fedorovka_dir2'
                         }],
                         [{
                           text: 'В сортировку',
                           callback_data: 'srt_dir2'
                         }],
                         [{
                           text: 'В доскей',
                           callback_data: 'doskey_dir2'
                         }],
                         [{
                           text: 'В поселок Трудовое',
                           callback_data: 'trud_dir2'
                         }],
                         [{
                           text: 'В уштобе',
                           callback_data: 'uwtobe_dir2'
                         }]
                       ]
                     }
                   })

}