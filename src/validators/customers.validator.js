const Joi = require('joi'); 

const createSchema = Joi.object({
    name: Joi.string().min(1).required(), 
    phone: Joi.string().pattern(/^0\d{9}$/).required(),
    email: Joi.string().email().optional()
}); 

const updateSchema = Joi.object({
    name: Joi.string().min(1).optional(),
    phone: Joi.string().pattern(/^0\d{9}$/).optional(),
    email: Joi.string().email().optional()
}); 

module.exports = {createSchema, updateSchema}; 