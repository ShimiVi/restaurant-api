const express = require('express');
const ordersControllers = require('../controllers/orders');
const{verifyToken, checkRole} = require('../middleware/auth');

const router = express.Router(); 

router.get('/',verifyToken,checkRole('owner', 'manager'),ordersControllers.getAll); 
router.get('/:id',verifyToken,checkRole('owner', 'manager','customer'),ordersControllers.getById); 
router.post('/',verifyToken,checkRole('customer'),ordersControllers.create);
router.put('/:id',verifyToken,checkRole('owner', 'manager'),ordersControllers.updateStatus); 


module.exports = router;
