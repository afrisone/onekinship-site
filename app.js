const express = require("express");
const app = express();
const path = require("path");
const request = require("request");
// const config = require("./config");
let INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

if (!INSTAGRAM_ACCESS_TOKEN) {
  INSTAGRAM_ACCESS_TOKEN = require("./config").INSTAGRAM_ACCESS_TOKEN;
}

// const email = require('./server/email')

const routerOptions = {
  root: path.join(__dirname, "public")
};

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile("index.html", routerOptions);
});

app.get("/about", function(req, res) {
  res.sendFile("about.html", routerOptions);
});

app.get("/contact", function(req, res) {
  res.sendFile("contact.html", routerOptions);
});

app.get("/training", function(req, res) {
  res.sendFile("training.html", routerOptions);
});

app.get("/email", function(req, res) {
  const emailParams = {
    name: req.query.textinput[0],
    email: req.query.textinput[1],
    number: req.query.textinput[2],
    message: req.query.textarea
  };

  try {
    // email(emailParams)
    res.redirect("/contact?success");
  } catch (err) {
    res.redirect("/contact?failed");
  }
});

app.get("/getInstagramImage", function(req, res) {
  request(
    `https://api.instagram.com/v1/users/self/media/recent/?access_token=${
      config.access_token
    }`,
    (error, response, bodyStr) => {
      const body = JSON.parse(bodyStr);
      const data = {
        link: body.data[0].link,
        imageUrl: body.data[0].images.standard_resolution.url
      };
      res.send(data);
    }
  );
});

app.get("*", function(req, res) {
  res.sendFile("404.html", routerOptions);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}/`);
});
