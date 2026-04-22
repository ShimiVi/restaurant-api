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
        res.json(customers); 
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const create = async (req, res)=>{
    try{
        const {name,phone,email} = req.body; 
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
        const customers = await customersService.update(id,name,phone,email);
        res.status(200).json(customers); 
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }
}; 


module.exports ={getAll, getById, create, update}; 