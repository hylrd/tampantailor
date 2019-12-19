const express = require('express')
const router = express.Router();
const Model = require('../models')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const UserModel = Model.User
const ShirtModel = Model.Shirt
const UserShirtModel = Model.UserShirt
var nodemailer = require('nodemailer');
const isLoggedin = require('./middlewares/isLoggedin')
const numHelper = require('../helpers/ordinalNumber.js') 


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'kikokartiko@gmail.com',
           pass: 'alahmaKk1'
       }
   });


   router.get('/checkout', isLoggedin, function(req, res){
    //    res.send(req.session)
    UserModel.findAll({
        include : ShirtModel,
        where:{
            id: req.session.user.id
        }
    })
    .then(baju =>{
        // res.send(baju)
        const mailOptions = {
                from: 'kikokartiko@gmail.com', // sender address
                to: `${baju[0].email}`, // list of receivers
                subject: `thanks udah beli`, // Subject line
                
                html: baju[0].Shirts.forEach((data, index) =>{
                   `anda membeli ${data.name}`
                })
                // plain text body
               };
    
               transporter.sendMail(mailOptions, function (err, info) {
                if(err){
                    console.log(err)
                }else{
                    console.log(info);
                    res.send(info)
                }    
             });
            res.render('checkout.ejs')
    })
    .catch(reject =>{
        res.send(reject)
    })
       
   })

   router.get('/cart', isLoggedin,(req, res) => {
    UserModel.findAll({
        include : ShirtModel,
        where:{
            id: req.session.user.id
        }
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
    UserShirtModel.destroy({
        where : {
            ShirtId : req.params.id
        }
    })
        .then(result => {
            res.redirect('/user/cart')
        })
        .catch(err => {
            res.send(err)
        })
})


   
   
   router.post('/edit', isLoggedin, function(req, res){
    //    let id = req.params.id
    // res.send(req.session)
       let pk = req.session.user.id
       UserModel.update(req.body,{
           where:{
               id: pk
            }
        })
        .then (resolve => {
            // res.send(resolve)
            
            // send email 
            res.redirect(`/user/select`)
        })
        .catch(reject => {
            res.send(reject)
        })
    })
    
    router.get('/edit', isLoggedin, function(req, res){
        let pk = req.session.user.id
        UserModel.findOne({
            where:{
                id:pk
            }
        })
        .then(resolve =>{
            // res.send(resolve)
            res.render('editUser.ejs', {resolve, pk})
        })
        .catch(reject =>{
            res.send(reject)
        })
    })
            
    
router.post('/select/beli/', isLoggedin, function(req, res){
        // res.send(req.session.user)
        // let iduser = req.params.iduser
        // let idbaju = req.params.idbaju
        // let baju = []
        
        // ShirtModel.findOne({
        //     where:{
        //         id: idbaju
        //     }
        // })

        // let userId = req.session.user.id
        // let shirtId = req.session.user.item
        // let obj = {
        //     UserId = req.session.user.id,
        //     ShirtId = req.session.user.item
        // }
        let user = req.session.user

        let obj = {
            UserId : user.id,
            ShirtId : user.ShirtId
        }

        // console.log(obj, '>>>>>>>>>>>')

        UserShirtModel.create(
            obj
        )
        .then(resolve =>{
            // baju = resolve
            // res.send(resolve)
            res.redirect('/user/cart')
            // res.render('beli.ejs', {resolve})
            // return UserModel.findOne({where:{ id: iduser}})
        })
        .catch(reject =>{
            res.send(reject)
        })
        // .then(userdata =>{
            // res.send(baju)
            //
        // })
})

router.get('/select/beli', isLoggedin, function(req, res){
    let pk = Math.floor(Math.random() * 10) + 1; 

    ShirtModel.findOne({
        where:{
            id:pk
        }
    })
    .then(resolve =>{
        // res.send(resolve)
        req.session.user.ShirtId = resolve.id
        let user = req.session.user
        res.render('beli.ejs', {user, resolve})
    })
    .catch(reject =>{
        res.send(reject)
    })
})

router.post('/select', isLoggedin, function(req, res){
    // res.send('masuk')
    let id = req.params.id
    res.redirect('/user/select/beli')
    // res.send(id)
    // res.redirect(`user/select/${id}/beli`, {id: req.params.id})

    // let pk = Math.floor(Math.random() * 10) + 1; 

    // ShirtModel.findOne({
    //     where:{
    //         id:pk
    //     }
    // })
    // .then(resolve =>{
    //     // res.send(resolve)
    //     // res.render('beli.ejs', {resolve})
    // })
    // .catch(reject =>{
    //     res.send(reject)
    // })
})



router.get('/select', isLoggedin, function(req, res){
       
    res.render("select.ejs", {user: req.session.user})
    // then(resolve=>{
    // })
    // .catch(reject =>{
    //     res.send(reject)
    // })
})

router.post('/login', function(req, res){

    UserModel.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(resolve =>{
        // res.send(resolve)
        if (!resolve){
            res.send('email salah')
        }else{
            let check = bcrypt.compareSync(req.body.password, resolve.password);
            // console.log(req.body.password)
            // console.log(check)
            if(check){
                req.session.user = resolve
                let id = req.session.user.id 
    
                // res.send(req.session)
                res.redirect(`/user/select`)
            }else{
                res.send('salah')
            }
        }
    })
    .catch(reject =>{
        res.send(reject)
    })
})

router.get('/login', function(req, res){
    res.render('login.ejs')
})

router.post('/', function(req, res){
    UserModel.create(
        req.body
    )
    .then(resolve=>{
        // res.send(resolve)
        // id = resolve.id
        req.session.user = resolve
        // let id = req.session.user.id 
        res.redirect('/user/select')
        //prefix /user use slash
    })
    .catch(reject =>{
        res.send(reject)
    })
})

router.get('/', function(req, res){
    UserModel.findAll({

    })
    .then(resolve =>{
        // res.send(resolve)
        // const data = resolve.map(val => val.get());
        res.render("register.ejs")
    })
    .catch( reject =>{
        res.send(reject)
    })
})

module.exports = router