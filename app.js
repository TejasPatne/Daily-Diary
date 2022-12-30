const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const data = require('./public/contact.json');
const posts = require('./public/posts.json');
const addingData = require('./addData');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

// get requests
app.get('/', function(req, res){
    res.render('home', {posts: posts});
})

app.get('/compose', function(req, res){
    res.render('compose');
})

app.get('/about', function(req, res){
    res.render('about', {data: data});
})

app.get('/contact', function(req, res){
    res.render('contact', {data: data});
})

app.get('/post/:topic', function(req, res){
    const para = req.params.topic;
    const processedPara = _.lowerCase(para);
    posts.forEach(function(item){
        const processedTitle = _.lowerCase(item.title);
        if(processedTitle===processedPara){
            res.render('blog', {title: item.title, content: item.content});
        }
    })

})

// post requests
app.post('/compose', function(req, res){
    const reqBody = req.body;
    addingData(reqBody);
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, function(){
    console.log('server is running on http://localhost:3000');
})