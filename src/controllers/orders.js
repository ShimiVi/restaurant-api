const ordersService = require('../services/orders');
const {createSchema} = require('../validators/orders.validator'); 

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
        const user_id = req.user.id; 
        
        const{error: errorJoi} = createSchema.validate(req.body); 
        if(errorJoi){
            return res.status(400).json({message: errorJoi.details[0].message}); 
        }
        const customer = await ordersService.getCustomerByUserId(user_id); 
        const{items} =req.body; 

        const orders = await ordersService.create(customer.id, items); 
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