const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser')

const UserRouter = require ("./routes/UserRouter");
const session = require('express-session')

app.use(session({
  secret: 'bebas',
  resave: false,
  saveUninitialized: true,

}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', UserRouter);


app.listen(port, () => console.log("Listening At", port));