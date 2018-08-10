const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const nodemailer = require('nodemailer')
const config = require('./config')

function sendEmail(email, message) {
    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        auth: {
            user: config.email,
            pass: config.password
        }
    })

    transporter.sendMail({
        host : "smtp.gmail.com",
        port : "465",
        ssl: true,
        domain : "localhost",
        to : "donald.frisone@gmail.com",
        from : config.email,
        subject : 'Hi babe!!',
        text: 'Love you!',
        authentication : "login"
    }
}

const routerOptions = {
    root: path.join(__dirname, 'public')
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
    res.sendFile('index.html', routerOptions)
})

app.get('/about', function(req, res){
    res.sendFile('about.html', routerOptions)
})

app.get('/contact', function(req, res){
    res.sendFile('contact.html', routerOptions)
})

app.get('/training', function(req, res){
    res.sendFile('training.html', routerOptions)
})

app.get('*', function(req, res){
    res.sendFile('404.html', routerOptions);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}/`)
})
