const express = require('express');
const menuItemsController = require('../controllers/menuitems');

const router = express.Router(); 

router.get('/',menuItemsController.getAll);
router.get('/:id',menuItemsController.getById);
router.post('/',menuItemsController.create);
router.put('/:id',menuItemsController.update);
router.delete('/:id',menuItemsController.deleteOne); 

module.exports =router; 