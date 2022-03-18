// Requiring Modules
const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const passport = require('passport');
const session = require('express-session');
const UserDetails = require('./userDetails');
const routes = require('./routes/router');
require('dotenv').config();


//app.use(express.static(__dirname + "/public"));
app.use(express.static('public'))

// Set up view engine and layout
app.use(expressLayouts);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

// Set up session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));

// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(routes);

// Set up Express server
/*var port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});*/


// Set up HTTPS Express server
const https = require('https');
const fs = require('fs');
var port = process.env.PORT || 3000;
const options = {
  key: fs.readFileSync('./cert/cert-key.pem'), // Replace with the path to your key
  cert: fs.readFileSync('./cert/cert.pem') // Replace with the path to your certificate
}


https.createServer(options, app).listen(port,() => {
  console.log('Server listening on port ' + port);
});

// Register a user
//UserDetails.register({ username: 'pawa', active: false }, 'pawa1234'); 

 