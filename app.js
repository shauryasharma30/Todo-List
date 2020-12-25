var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//setting up template engines
app.set('view engine', 'ejs');

//static files ,use some middlewareand ,not making *route specific* to use them on all routes
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listening to port
app.listen(3000);
console.log('You\'re listening to port 3000');