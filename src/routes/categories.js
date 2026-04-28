const express = require('express');
const categoriesController = require('../controllers/categories');


const router = express.Router(); 
const{verifyToken , checkRole} = require('../middleware/auth'); 

router.get('/',categoriesController.getAll);
router.get('/:id', categoriesController.getById);
router.post('/',verifyToken, checkRole('owner', 'manager'), categoriesController.create);
router.put('/:id',verifyToken,checkRole('owner', 'manager'),categoriesController.update);
router.delete('/:id',verifyToken,checkRole('owner'),categoriesController.deleteOne); 

module.exports =router; 
