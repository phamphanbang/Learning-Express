var express = require('express');
var app = express();


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var port = 3000;

var users = [
    {id: 1, name: 'Bang'},
    {id: 2, name: 'Goal'}
];

app.get('/', (req, res) => {
    res.render('index', {
        name : 'Bang'
    });
});

app.get('/users', (req, res) => {
    res.render('users/index', {
        users : users
    });
});

app.get('/users/search', (req ,res) => {
    var q = req.query.q;
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

app.post('/users/create', (req, res) => {
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))