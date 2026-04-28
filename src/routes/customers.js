const express = require('express'); 
const customersController = require('../controllers/customers');
const {verifyToken, checkRole} = require('../middleware/auth')

const router = express.Router(); 

router.get('/',verifyToken,checkRole('owner','manager'),customersController.getAll);
router.get('/:id',verifyToken,checkRole('owner','manager'),customersController.getById);
router.post('/',customersController.create); 
router.put('/:id',verifyToken, checkRole('owner', 'manager'),customersController.update);


module.exports = router; 
