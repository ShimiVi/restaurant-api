const express = require('express');
const menuItemsController = require('../controllers/menuitems');
const {verifyToken , checkRole} = require('../middleware/auth');

const router = express.Router(); 

router.get('/',menuItemsController.getAll);
router.get('/:id',menuItemsController.getById);
router.post('/',verifyToken,checkRole('owner' , 'manager'),menuItemsController.create);
router.put('/:id',verifyToken,checkRole('owner', 'manager'),menuItemsController.update);
router.delete('/:id',verifyToken,checkRole('owner'),menuItemsController.deleteOne); 

module.exports =router; 