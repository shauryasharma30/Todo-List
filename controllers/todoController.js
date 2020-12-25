var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb+srv://test:test@todo-ylvch.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(Error, err.message);
    });

//creat a schema - a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

//creating a model based on a schema we created above
var Todo = mongoose.model('Todo', todoSchema);

//create a item of model and passing it as an object and saving it
// var itemOne = Todo({ item: 'buy flowers' }).save(function(err) {
//     if (err) throw err;
//     console.log('item saved');
// });


//var data = [{ item: 'get milk' }, { item: 'code' }, { item: 'walk dog' }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    app.get('', function(req, res) {
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        })


    });
    app.get('/todo', function(req, res) {
        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        })


    });

    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function(req, res) {
        //delete the requested item from mongodb
        Todo.find({ item: req.params.item.replace(/-/g, " ") }).deleteOne(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });


}