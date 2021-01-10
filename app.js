// importing modules
const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const path  = require('path');

// local imports
const app = express();
const route = require('./routes/route.js');
const router = require('./routes/route.js');


// port 
 const port  = 3000;

//database config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/contactList', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;
mongoose.connection.on('connected', ()=>{
    console.log('connected to databse via 27017');
});
mongoose.connection.on('error', (error)=>{
    console.log('Error ocurred. Failed to connect', error.json)
    
});


// middleware settings
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', route);

//router setting or router endpoints
route.get('/', route)

route.get('/contacts', router);
 // create the server 
 app.listen(port, () =>{
     console.log(`server started at port ${port}`);
     console.log(`http://localhost:${port}/`);
 })

 



/* var express = require('express');

var app = express();

// Example requests:
//     curl http://localhost:3000/user/0
//     curl http://localhost:3000/user/0/edit
//     curl http://localhost:3000/user/1
//     curl http://localhost:3000/user/1/edit (unauthorized since this is not you)
//     curl -X DELETE http://localhost:3000/user/0 (unauthorized since you are not an admin)

// Dummy users
var users = [
    { id: 0, name: 'tj', email: 'tj@vision-media.ca', role: 'member' }
  , { id: 1, name: 'ciaran', email: 'ciaranj@gmail.com', role: 'member' }
  , { id: 2, name: 'aaron', email: 'aaron.heckmann+github@gmail.com', role: 'admin' }
];

function loadUser(req, res, next) {
  // You would fetch your user from the db
  var user = users[req.params.id];
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error('Failed to load user ' + req.params.id));
  }
}

function andRestrictToSelf(req, res, next) {
  // If our authenticated user is the user we are viewing
  // then everything is fine :)
  if (req.authenticatedUser.id === req.user.id) {
    next();
  } else {
    // You may want to implement specific exceptions
    // such as UnauthorizedError or similar so that you
    // can handle these can be special-cased in an error handler
    // (view ./examples/pages for this)
    next(new Error('Unauthorized'));
  }
}

function andRestrictTo(role) {
  return function(req, res, next) {
    if (req.authenticatedUser.role === role) {
      next();
    } else {
      next(new Error('Unauthorized'));
    }
  }
}

// Middleware for faux authentication
// you would of course implement something real,
// but this illustrates how an authenticated user
// may interact with middleware

app.use(function(req, res, next){
  req.authenticatedUser = users[0];
  next();
});

app.get('/', function(req, res){
  res.redirect('/user/0');
});

app.get('/user/:id', loadUser, function(req, res){
  res.send('Viewing user ' + req.user.name);
});

app.get('/user/:id/edit', loadUser, andRestrictToSelf, function(req, res){
  res.send('Editing user ' + req.user.name);
});

app.delete('/user/:id', loadUser, andRestrictTo('admin'), function(req, res){
  res.send('Deleted user ' + req.user.name);
});

/* istanbul ignore next 

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
*/