const Joi = require('joi'); 

const createSchema = Joi.object({
    items: Joi.array().items({
    menu_item_id: Joi.number().positive().required(), 
    quantity: Joi.number().positive().min(1).required()
    }).min(1).required()
}); 

module.exports = {createSchema}; 