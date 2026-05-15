const Joi = require('joi'); 

const createSchema = Joi.object({
    name: Joi.string().min(1).required(), 
    description: Joi.string().optional()
}); 

const updateSchema = Joi.object({
    name: Joi.string().min(1).optional(), 
    description: Joi.string().optional()
});

module.exports ={createSchema, updateSchema}; 