const express = require('express')
const app = express()
const port = 3000
const shirt = require('./routes/ShirtRouter')
const UserRouter = require ("./routes/UserRouter");

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.use('/shirt', shirt)
app.use('/user', UserRouter);

app.listen(port, () => {
    console.log('this app run in port :', port)
})