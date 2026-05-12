const Joi = require('joi'); 

const registerSchema = Joi.object({
    name: Joi.string().min(1).required(), 
    email: Joi.string().email().required(), 
    password: Joi.string().min(8).required(), 
    role: Joi.string().valid('owner', 'manager', 'customer').optional(),
    phone: Joi.string().pattern(/^0\d{9}$/).required()
}); 

const loginSchema = Joi.object({
    email: Joi.string().email().required(), 
    password: Joi.string().required()
}); 


module.exports = { registerSchema, loginSchema}; 