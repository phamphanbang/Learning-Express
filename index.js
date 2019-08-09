var express = require('express');
var app = express();


app.set('view engine', 'pug');
app.set('views', './views');

var port = 3000;

app.get('/', (req, res) => {
    res.render('index', {
        name : 'Bang'
    });
});

app.get('/users', (req, res) => {
    res.render('users/index', {
        users : [
            {id: 1, name: 'Bang'},
            {id: 2, name: 'Goal'}
        ]
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))