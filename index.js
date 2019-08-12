var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var userRoute = require('./routes/user.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var port = 3000;

app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.render('index', {
        name : 'Bang'
    });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))