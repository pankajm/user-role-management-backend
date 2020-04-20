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
];

let roles = [
  {id:shortid.generate(), name: 'Admin'}, 
  {id:shortid.generate(), name: 'Supervisor'}, 
  {id:shortid.generate(), name: 'Client'}
];

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
  return res.status(200).send('User Deleted Successfully.');
})

// Roles APIs

app.get('/api/roles', (req, res, next) => {
  return res.status(200).send(roles);
})

app.post('/api/roles', (req, res, next) => {
  let role = req.body;
  role.id = shortid.generate();
  roles.push(role);
  console.log(roles);
  return res.status(200).send(role);
})

app.delete('/api/roles/:id', (req, res, next) => {
  let indexToDelete = roles.indexOf(roles.find((role) => role.id == req.params.id));
  roles.splice(indexToDelete, 1);
  console.log(roles);
  return res.status(200).send('Role Deleted Successfully.');
})

app.put('/api/roles/:id', (req, res, next) => {
  let role = roles.find((role) => role.id == req.params.id);
  role.name = req.body.name;
  console.log(roles);
  return res.status(200).send('Role updated.');
})

