const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');
 
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

let users = [
  {id:shortid.generate(), name:'John Williamson', email:'john10@gmail.com', role:'Admin'},
  {id:shortid.generate(), name:'Will Smith', email:'willS@gmail.com', role:'Supervisor'},
  {id:shortid.generate(), name:'Donald wislley', email:'donwislley@yahoo.com', role:'Client'}
]

app.get('/api/users', (req, res, next) => {
  return res.status(200).send(users);
})

app.put('/api/users/:id', (req, res, next) => {
  let user = users.find((user) => user.id == req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.role = req.body.role;
  return res.status(200).send('User data updated');
})

app.post('/api/users', (req, res, next) => {
  let user = req.body;
  user.id = shortid.generate();
  users.push(user);
  console.log(users);
  return res.status(200).send('User added successfully');
})

app.delete('/api/users/:id', (req, res, next) => {
  let indexToDelete = users.indexOf(users.find((user) => user.id == req.params.id));
  users.splice(indexToDelete, 1);
  console.log(users);
  return res.status(200).send('User Deleted Successfully');
})


