const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());

let users = [
  {id:1, name:'John Williamson', email:'john10@gmail.com', role:'Admin'},
  {id:2, name:'Will Smith', email:'willS@gmail.com', role:'Supervisor'},
  {id:3, name:'Donald wislley', email:'donwislley@yahoo.com', role:'Client'}
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


