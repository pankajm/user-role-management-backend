const express = require('express');
const router = express.Router();
const shortid = require('shortid'); // For Assigning unique ID for each record (Users and roles)
const Joi = require('@hapi/joi'); 


/** Storing roles in array data structures for easy searching */
let roles = [
  {id:shortid.generate(), role: 'Admin'}, 
  {id:shortid.generate(), role: 'Supervisor'}, 
  {id:shortid.generate(), role: 'Client'}
];

/** Roles APIs */

/** Get all roles */
router.get('/', (req, res, next) => {
  return res.status(200).send(roles);
})

/** Create New Role */
router.post('/', [
  (req, res, next) => {
    const result = validate(req.body);
    if(result.error)
      return res.status(400).send(result.error);
    next();
  }, 
  (req, res) => {
    let role = req.body;
    role.id = shortid.generate();
    roles.push(role);      // DB logic would have come here
    return res.status(200).send(role);
  }
])

/** Delete Role with given ID */
router.delete('/:id', (req, res, next) => {
  let indexToDelete = roles.indexOf(roles.find((role) => role.id == req.params.id));
  roles.splice(indexToDelete, 1);
  return res.status(200).send('Role Deleted Successfully.');
})

/** Function to validate req.body parameters of roles Post API */
function validate(body){   
  rolesSchema = {
    role: Joi.string().required()
  }
  const joiSchema = Joi.object(rolesSchema);
  return joiSchema.validate(body);
}

module.exports = router;