let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let session = require('express-session')
var cors = require('cors')


// let MemoryStore = require('memorystore')(session)

const { Console } = require("console");
// get fs module for creating write streams
const fs = require("fs");
const { nextTick } = require('process')

let app = express()


//Utilisation de socket.io
let http = require('http').Server(app)
let io = require('socket.io')(http, { path: "/api/ws", cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] } })

const oneDay = 1000 * 60 * 60 * 24;


//Middleware
// cookie parser middleware


app.use(cookieParser());

app.use(session({
    secret: "dama",
    saveUninitialized: true,
    cookie: { maxAge: oneDay, httpOnly: false },
    resave: false
}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let escape_html = (t) => {
    return t.replace(/'/g, "\\'").replace(/"/g, "\\\"")
}

app.use((req, res, next) => {
    req.io = io
    req.escape_html = escape_html
    next()
})



io.on('connection', (socket) => {
    console.log('user connected');
})


app.use('/api', require('./routes/api.route'))

http.listen(4044)