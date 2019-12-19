const express = require('express')
const router = express.Router()
const Model = require('../models')
const Shirt = Model.Shirt
const User = Model.User
const UserShirt = Model.UserShirt
const numHelper = require('../helpers/ordinalNumber.js') 

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

router.get('/cart', (req, res) => {
    User.findAll({
        include : Shirt
    })
        .then(users => {
            // res.send(users[0])
            res.render('tesCart.ejs', {user : users[0], numHelper})
        })
        .catch(err => {
            res.send(err)
        })
})
router.get('/cart/delete/:id', (req, res) => {
    UserShirt.destroy({
        where : {
            ShirtId : req.params.id
        }
    })
        .then(result => {
            res.redirect('/shirt/cart')
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router