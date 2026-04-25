const menuItemsService = require('../services/menuitems'); 

const getAll = async (req, res) => {
    try{
        const menuItems = await menuItemsService.getAll(); 
        res.json(menuItems); 
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}; 

const getById = async (req, res) =>{
    try{
        const {id} = req.params; 
        const menuItems = await menuItemsService.getById(id); 
        if(!menuItems){
            return res.status(404).json({message: 'menu item not found'});
        }
        res.json(menuItems); 
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

const create = async (req, res) => {
    try{
        const{name, price, category_id, is_available} = req.body; 

        const errors = {}; 

        if(!name){
            errors.name = 'Name is required'; 
        }
        if(!price){
            errors.price = 'Price is required'; 
        }
        if(!category_id){
            errors.category_id = 'Category is required'; 
        }

        if(Object.keys(errors).length > 0){
            return res.status(400).json({errors}); 
        }

        const menuItems = await menuItemsService.create(name, price, category_id, is_available); 
        res.status(201).json(menuItems);
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }

};

const update = async(req, res) => {
    try{
        const {id} = req.params; 
        const{name, price, category_id, is_available} = req.body; 

        const errors = {}; 

        if(!name){
            errors.name = 'Name is required'; 
        }
        if(!price){
            errors.price ='Price is required';
        }
        if(!category_id){
            errors.category_id = 'Category is required'; 
        }

        if(Object.keys(errors).length > 0){
            return res.status(400).json({errors}); 
        }

        const menuItems = await menuItemsService.update(id,name,price,category_id,is_available); 

        if(!menuItems){
            return res.status(404).json({message: 'Menu item not found'}); 
        }

        res.status(200).json(menuItems);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const deleteOne = async (req ,res) =>{
    try{
        const {id} = req.params;
        const menuItems = await menuItemsService.deleteOne(id);
        if(!menuItems){
            return res.status(404).json({message: 'Menu item not found'}); 
        }
        res.status(204).send();  
    } 
    catch(error){
        res.status(500).json({message: error.message});
    }
}





module.exports = {getAll, getById, create, update, deleteOne}; 