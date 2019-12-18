const express = require('express')
const router = express.Router();
const Model = require('../models')
const UserModel = Model.User
const ShirtModel = Model.Shirt
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'kikokartiko@gmail.com',
           pass: 'alahmaKk1'
       }
   });

   
   
   
   router.post('/:id/edit', function(req, res){
       let id = req.params.id
       UserModel.update(req.body,{
           where:{
               id: id
            }
        })
        .then (resolve => {
            // res.send(resolve)
            
            // send email 
            res.redirect(`/user/select/${id}`)
        })
        .catch(reject => {
            res.send(reject)
        })
    })
    
    router.get('/:id/edit', function(req, res){
        let id = req.params.id
        UserModel.findOne({
            where:{
                id:req.params.id
            }
        })
        .then(resolve =>{
            // res.send(resolve)
            res.render('editUser.ejs', {resolve, id})
        })
        .catch(reject =>{
            res.send(reject)
        })
    })
            
    
    router.post('/select/:iduser/beli/:idbaju', function(req, res){
        let iduser = req.params.iduser
        let idbaju = req.params.idbaju
        let baju = []
        
        ShirtModel.findOne({
            where:{
                id: idbaju
            }
        })
        .then(resolve =>{
            baju = resolve
            // res.send(resolve)
            // res.render('beli.ejs', {resolve})
            return UserModel.findOne({where:{ id: iduser}})
        })
        .then(userdata =>{
            // res.send(baju)
            const mailOptions = {
                from: 'kikokartiko@gmail.com', // sender address
                to: `${userdata.email}`, // list of receivers
                subject: `anda membeli ${baju.name} seharga ${baju.price}`, // Subject line
                html: '<p>mantap</p>'// plain text body
               };

               transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                  console.log(err)
                else
                  console.log(info);
                  res.send(info)
             });
        })
        .catch(reject =>{
            res.send(reject)
    })
})

router.get('/select/:id/beli', function(req, res){
    let pk = Math.floor(Math.random() * 10) + 1; 

    ShirtModel.findOne({
        where:{
            id:pk
        }
    })
    .then(resolve =>{
        // res.send(resolve)
        res.render('beli.ejs', {resolve})
    })
    .catch(reject =>{
        res.send(reject)
    })
})

router.post('/select/:id', function(req, res){
    // res.send(req.body)
    let id = req.params.id
    // res.send(id)
    // res.redirect(`user/select/${id}/beli`, {id: req.params.id})
    let pk = Math.floor(Math.random() * 10) + 1; 

    ShirtModel.findOne({
        where:{
            id:pk
        }
    })
    .then(resolve =>{
        // res.send(resolve)
        res.render('beli.ejs', {resolve, id})
    })
    .catch(reject =>{
        res.send(reject)
    })
})



router.get('/select/:id', function(req, res){
       
    res.render("select.ejs", {id: req.params.id})
    // then(resolve=>{
    // })
    // .catch(reject =>{
    //     res.send(reject)
    // })
})

router.post('/', function(req, res){
    UserModel.create(
        req.body
    )
    .then(resolve=>{
        // res.send(resolve)
        id = resolve.id
        res.redirect(`user/select/${id}`)
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