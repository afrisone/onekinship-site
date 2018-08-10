const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const email = require('./server/email')

const routerOptions = {
    root: path.join(__dirname, 'public')
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.sendFile('index.html', routerOptions)
})

app.get('/about', function(req, res) {
    res.sendFile('about.html', routerOptions)
})

app.get('/contact', function(req, res){
    res.sendFile('contact.html', routerOptions)
})

app.get('/training', function(req, res) {
    res.sendFile('training.html', routerOptions)
})

app.get('/email', function(req, res) {
    const emailParams = {
        name: req.query.textinput[0],
        email: req.query.textinput[1],
        number: req.query.textinput[2],
        message: req.query.textarea
    }

    try {
        email(emailParams)
        res.send("Yay!")
    }
    catch(err) {
        res.send("Boo :(")
    }
})

app.get('*', function(req, res){
    res.sendFile('404.html', routerOptions);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}/`)
})

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}
