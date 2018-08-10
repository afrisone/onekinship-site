const express = require('express')
const app = express()
const path = require('path')
const port = 3000

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
