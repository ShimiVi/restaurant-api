const express = require('express');
const categoriesController = require('../controllers/categories');

const router = express.Router(); 

router.get('/',categoriesController.getAll);
router.get('/:id', categoriesController.getById);

module.exports =router; 
