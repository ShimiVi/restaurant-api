const Joi = require('joi'); 

const createSchema = Joi.object({
    name: Joi.string().min(1).required(),   
    price: Joi.number().positive().required(), 
    category_id: Joi.number().positive().required()
});

const updateSchema = Joi.object({
    name: Joi.string().min(1).optional(),
    price: Joi.number().positive().optional(), 
    category_id: Joi.number().positive().optional()
})

module.exports = {createSchema , updateSchema}; 