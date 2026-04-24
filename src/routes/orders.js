const express = require('express');
const ordersControllers = require('../controllers/orders');

const router = express.Router(); 

router.get('/',ordersControllers.getAll); 
router.get('/:id',ordersControllers.getById); 
router.post('/',ordersControllers.create);
router.put('/:id', ordersControllers.updateStatus); 


module.exports = router;
