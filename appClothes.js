const express = require('express')
const app = express()
const port = 3000
const shirt = require('./routes/ShirtRouter')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.use('/shirt', shirt)

app.listen(port, () => {
    console.log('this app run in port :', port)
})