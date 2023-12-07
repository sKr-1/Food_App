const express = require("express")
var mysql = require('mysql');
var app = express()


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

var con = mysql.createConnection({
    host: "localhost",
    user: "root@localhost",
    password: "mysql",
    database: "food"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html');
}); 
   
app.post('/order', (req, res) => { 
    const id = req.body.id; 
    const name = req.body.name;
    var sql = "INSERT INTO food_categories (id, name) VALUES ('"+id+"', '"+name+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
    res.send("Order placed");
}); 

app.get('/getFoodDetails', (req,res) => {
    con.query("SELECT * FROM food_details", function (err, result, fields) {
        if (err) throw err;
        console.log("Final list");
        res.send(result);
    });
    
});





app.listen(10000, function () {
console.log("Started application on port %d", 10000)
});
