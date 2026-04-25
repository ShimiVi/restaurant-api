const customersService = require('../services/customers');

const getAll = async (req, res) => {
    try{
        const customers = await customersService.getAll();
        res.json(customers);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
    
};

const getById = async (req, res) => {
    try{
        const {id} = req.params;
        const customers = await customersService.getById(id); 
        if(!customers){
            return res.status(404).json({message: 'Customers not found'}); 
        }
        res.json(customers); 
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const create = async (req, res)=>{
    try{
        const {name,phone,email} = req.body; 

        const errors = {}; 

        if(!name){
            errors.name = 'Name is required'; 
        }
        if(!phone){
            errors.phone = 'Phone is required'; 
        }

        if(Object.keys(errors).length >0){
            return res.status(400).json({errors}); 
        }
        const customers = await customersService.create(name,phone,email); 
        res.status(201).json(customers);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const update = async (req, res) => {
    try{
        const{id} = req.params;
        const{name,phone,email} = req.body;

        const errors = {}; 

        if(!name){
            errors.name = 'Name is required'; 
        }
        if(!phone){
            errors.phone = 'Phone is required'; 
        }

        if(Object.keys(errors).length >0){
            return res.status(400).json({errors}); 
        }

        const customers = await customersService.update(id,name,phone,email);
        if(!customers){
            return res.status(404).json({message: 'Customer not found'});
        }
        res.status(200).json(customers); 
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }
}; 


module.exports ={getAll, getById, create, update}; 