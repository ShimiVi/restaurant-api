const customersService = require('../services/customers');
const { createSchema,updateSchema } = require('../validators/customers.validator'); 


const getAll = async (req, res , next) => {
    try{
        const customers = await customersService.getAll();
        res.json(customers);
    }
    catch(error){
        next(error);
    }
    
};

const getById = async (req, res, next) => {
    try{
        const {id} = req.params;
        const customers = await customersService.getById(id); 
        if(!customers){
            return res.status(404).json({message: 'Customers not found'}); 
        }
        res.json(customers); 
    }
    catch(error){
        next(error);
    }
};

const create = async (req, res, next)=>{
    try{
        const {name,phone,email} = req.body; 

        const {error: errorJoi} = createSchema.validate(req.body); 
        if(errorJoi){
            return res.status(400).json({message: errorJoi.details[0].message}); 
        }

        const customers = await customersService.create(name,phone,email); 
        res.status(201).json(customers);
    }
    catch(error){
        next(error);
    }
};

const update = async (req, res, next) => {
    try{
        const{id} = req.params;
        const{name,phone,email} = req.body;

        const {error: errorJoi} = updateSchema.validate(req.body); 
        if(errorJoi){
            return res.status(400).json({message: errorJoi.details[0].message}); 
        }


        const customers = await customersService.update(id,name,phone,email);
        if(!customers){
            return res.status(404).json({message: 'Customer not found'});
        }
        res.status(200).json(customers); 
    }
    catch(error){
        next(error); 
    }
}; 


module.exports ={getAll, getById, create, update}; 