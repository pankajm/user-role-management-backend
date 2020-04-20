const express = require('express');
const router = express.Router();
const shortid = require('shortid'); // For Assigning unique ID for each record (Users and roles)
const Joi = require('@hapi/joi'); 


/** Storing users in array data structures for easy searching */
let users = [
  {id:shortid.generate(), name:'John Williamson', email:'john10@gmail.com', role:'Admin'},
  {id:shortid.generate(), name:'Will Smith', email:'willS@gmail.com', role:'Supervisor'},
  {id:shortid.generate(), name:'Donald wislley', email:'donwislley@yahoo.com', role:'Client'}
];

/** Users APIs */

/** Get all Users */
router.get('/', (req, res, next) => {
  return res.status(200).send(users);
})

/** Update user data for given ID */
router.put('/:id', [
  (req, res, next) => {
    const result = validate(req.body);
    if(result.error)
      return res.status(400).send(result.error);
    next();
  },
  (req, res) => {
    let user = users.find((user) => user.id == req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    return res.status(200).send('User data updated');
  }
])

/** Create new user */
router.post('/', [
  (req, res, next) => {
    const result = validate(req.body);
    if(result.error)
      return res.status(400).send(result.error);
    next();
  },
  (req, res) => {
    let user = req.body;
    user.id = shortid.generate();
    users.push(user);                  // DB logic would have come here
    return res.status(200).send(user);
  }
])

/** Delete User with given id */
router.delete('/:id', (req, res, next) => {
  let indexToDelete = users.indexOf(users.find((user) => user.id == req.params.id));
  users.splice(indexToDelete, 1);
  return res.status(200).send('User Deleted Successfully.');
})

/** Function to validate req.body parameters */
function validate(body){   
  userSchema = {
    id: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required()
  }
  const joiSchema = Joi.object(userSchema);
  return joiSchema.validate(body);
}

module.exports = router;