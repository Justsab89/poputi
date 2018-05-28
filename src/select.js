
function select() {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
            host     : 'localhost',
    user     : 'mybd_user',
    password : 'admin123',
    database : 'sitebot'
});

connection.connect();

connection.query('SELECT * FROM interception WHERE street = "Шахтеров" ', function(err, rows, fields) {
  if (err) throw err;

var menu = rows;

  var options = {
       reply_markup: JSON.stringify({
            inline_keyboard: menu.map((x, xi) => ([{
                text: x,
                callback_data: String(xi + 1),
            }])),
      }),
  };




})  ;

  connection.end();
}

module.exports = {select}