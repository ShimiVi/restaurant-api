const express = require('express');
const categoriesController = require('../controllers/categories');

const router = express.Router(); 

router.get('/',categoriesController.getAll);
router.get('/:id', categoriesController.getById);
router.post('/', categoriesController.create);
router.put('/:id',categoriesController.update);

module.exports =router; 
