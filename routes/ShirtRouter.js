const express = require('express')
const router = express.Router()
const Model = require('../models')
const Shirt = Model.Shirt

router.get('/', (req, res) => {
    Shirt.findAll()
        .then(shirts => {
            res.render('./shirt/shirt.ejs', {shirts})
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/', (req, res) => {
    // res.send(req.body)
    Shirt.create(req.body)
        .then(shirt => {
            res.redirect('/shirt')
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/edit-shirt/:id', (req, res) => {
    Shirt.findOne({
        where : {id : req.params.id}
    })
        .then(shirts => {
            res.render('./shirt/edit-shirt.ejs', {shirts, id : req.params.id})
            // res.send(shirts)
        })
        .catch(err => {
            res.send(err)
        })
})
router.post('/edit-shirt/:id', (req, res) => {
    Shirt.update({
        name : req.body.name,
        price : req.body.price,
        url : req.body.url
    }, { 
        where : { id : req.params.id }
    })
        .then(data => {
            res.redirect('/shirt')
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/delete/:id', (req, res) => {
    Shirt.destroy({
        where : { id : req.params.id}
    })
        .then(data => {
            res.redirect('/shirt')
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router