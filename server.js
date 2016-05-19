// set up
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var port = 8080;

// configuration
mongoose.connect('mongodb://localhost:27017/ToDoList');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	console.log('we are connected')
});

// define a model
var Todo = mongoose.model('Todo', {
	text: String
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({tyep:'application/vnd.api+json'}));
app.use(methodOverride());


// Routes
// Find all todos
app.get('/todos', function(req, res) {
	Todo.find(function(err, todos) {
		if(err)
			res.send(err);
		res.json(todos);
	});
});

// Create a new todo
app.post('/todos', function(req,res) {
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todos) {
		if(err)
			res.send(err);
		res.json(todos);
	});
});

// // Delete a todo
app.delete('/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id:req.params.todo_id
	}, function(err, todo) {
		if(err)
			res.send(err);
		Todo.find(function(err, todos) {
			if(err)
				res.send(err);
			res.json(todos);
		});
	});
});

// Application
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
})


// Port
app.listen(port);
console.log("App listening on " + port);
