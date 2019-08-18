var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser');
 
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middleware/auth.middleware');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

var port = 3000;

app.use('/users',authMiddleware.authRequire, userRoute);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.render('index', {
        name : 'Bang'
    });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))