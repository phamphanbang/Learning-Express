var express = require('express');
var app = express();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var shortid = require('shortid');


db = low(adapter);

db.defaults({ users: []})
  .write()

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var port = 3000;



app.get('/', (req, res) => {
    res.render('index', {
        name : 'Bang'
    });
});

app.get('/users', (req, res) => {
    res.render('users/index', {
        users : db.get('users').value()
    });
});

app.get('/users/search', (req ,res) => {
    var q = req.query.q;
    var users = db.get('users').value();
    var matchUser = users.filter( (user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users : matchUser
    });
});

app.get('/users/create', (req, res) => {
    res.render('users/create');
})

app.get('/users/:id', (req, res) =>{
    var id = req.params.id;

    var user = db.get('users').find({id : id}).value();

    res.render('users/view', {
        user : user 
    })
})

app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))