const express = require('express');
const categoriesController = require('../controllers/categories');

const router = express.Router(); 

router.get('/',categoriesController.getAll);
router.get('/:id', categoriesController.getById);
router.post('/', categoriesController.create);

module.exports =router; 
