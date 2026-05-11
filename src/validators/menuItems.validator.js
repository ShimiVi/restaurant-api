const Joi = require('joi'); 

const createSchema = Joi.object({
    name: Joi.string().min(1).required(),   
    price: Joi.number().positive().required(), 
    category_id: Joi.number().positive().required()
});

module.exports = {createSchema}; 