const Joi = require('joi'); 

const createSchema = Joi.object({
    name: Joi.string().min(1).required()
}); 

const updateSchema = Joi.object({
    name: Joi.string().min(1).optional()
});

module.exports ={createSchema, updateSchema}; 