const ordersService = require('../services/orders');

const getAll = async(req,res) =>{
    try{
        const orders = await ordersService.getAll();
        res.json(orders); 
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const getById = async(req,res) =>{
    try{
        const {id} = req.params;
        const orders = await ordersService.getById(id);
        res.json(orders); 
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const create = async(req,res) => {
    try{
        const{customer_id, items} =req.body; 
        const orders = await ordersService.create(customer_id, items); 
        res.status(201).json(orders);
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }
};

const updateStatus = async(req,res) =>{
    try{
        const{id} = req.params;
        const{status}=req.body;
        const orders = await ordersService.updateStatus(id,status);
        res.status(200).json(orders); 
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }
};

module.exports ={getAll, getById, create, updateStatus};