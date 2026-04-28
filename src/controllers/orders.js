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
        if(!orders){
            return res.status(404).json({message: 'Order not found'}); 
        }

        if (req.user.role === 'customer' && orders.customer_id !== req.user.id) {
            return res.status(403).json({ message: 'Permission denied' });
        }
        res.json(orders); 
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const create = async(req,res) => {
    try{
        const{customer_id, items} =req.body; 

        const errors = {};
        if(!customer_id){
            errors.customer_id = 'Customer is required';
        }

        if(!items || !Array.isArray(items) || items.length === 0){
            errors.items ='items must be a non-empty array'; 
        }

        if(Object.keys(errors).length > 0){
            return res.status(400).json({errors}); 
        }
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
        if(!status){
            return res.status(400).json({message: 'status is required'});
        }
        const orders = await ordersService.updateStatus(id,status);
        if(!orders){
            return res.status(404).json({message: 'orders not found'});
        }
        res.status(200).json(orders); 
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }
};

module.exports ={getAll, getById, create, updateStatus};