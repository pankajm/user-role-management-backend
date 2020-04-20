const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const users = require('./routes/users');
const roles = require('./routes/roles');
 
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // For all domains 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/api/users', users);
app.use('/api/roles', roles);


/** Event listener for handling uncaught exceptions during app execution */
process.on('uncaughtException', function(ex){
  console.error(ex.message, ex);
})

/** For handling and logging unhandled promise rejections */
process.on('unhandledRejection', function(ex){
  console.error(ex.message, ex);  
})
