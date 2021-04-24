const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const YOUR_NAME = "Thales"
const sqlInsert = `INSERT INTO people(name) values('${YOUR_NAME}')`
const sqlRemove = `DELETE FROM people`
connection.query(sqlRemove)
connection.query(sqlInsert)

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function (req, res) {
    var sql = 'SELECT name FROM people'
    connection.query(sql, function (err, data, fields) {
        if (err) throw err
        res.render('index.ejs', { pessoas: data })
        connection.end
    });
});

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})