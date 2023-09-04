let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
var cors = require('cors')
 
let app = express() ;
let http = require('http').Server(app);
let io = require('socket.io')(http, { cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] } });

app.use(cookieParser({ saveUninitialized: true, httpOnly: false }));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080'
}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 500000 }));
app.use(bodyParser.json());

let escape_html = (t) => {
    return t.replace(/'/g, "\\'").replace(/"/g, "\\\"")
};

io.on('connection', (socket) => {
    socket.on('conne', () => {
        console.log('io');
    })
});
app.use((req, res, next) => {
    req.io = io
    req.escape_html = escape_html
    next()
});

app.use('/api', require('./routes/api.route'));

http.listen(4044);