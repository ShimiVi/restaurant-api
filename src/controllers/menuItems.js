const menuItemsService = require('../services/menuitems'); 
const { createSchema,updateSchema } = require('../validators/menuItems.validator'); 

const getAll = async (req, res ,next) => {
    try{
        const menuItems = await menuItemsService.getAll(); 
        res.json(menuItems); 
    }
    catch(error){
        next(error);
    }
}; 

const getById = async (req, res, next) =>{
    try{
        const {id} = req.params; 
        const menuItems = await menuItemsService.getById(id); 
        if(!menuItems){
            return res.status(404).json({message: 'menu item not found'});
        }
        res.json(menuItems); 
    }
    catch(error){
        next(error);
    }
};

const create = async (req, res, next) => {
    try{
        const{name, price, category_id, is_available} = req.body; 

        const {error: errorJoi} = createSchema.validate(req.body); 
        if(errorJoi){
            return res.status(400).json({message: errorJoi.details[0].message});
        }

        const menuItems = await menuItemsService.create(name, price, category_id, is_available); 
        res.status(201).json(menuItems);
    }
    catch(error){
        next(error);
    }

};

const update = async(req, res, next) => {
    try{
        const {id} = req.params; 
        const{name, price, category_id, is_available} = req.body; 

        const{error: errorJoi} =  updateSchema.validate(req.body); 
        if(errorJoi){
            return res.status(400).json({message: errorJoi.details[0].message}); 
        }

        const menuItems = await menuItemsService.update(id,name,price,category_id,is_available); 

        if(!menuItems){
            return res.status(404).json({message: 'Menu item not found'}); 
        }

        res.status(200).json(menuItems);
    }
    catch(error){
        next(error);
    }
};

const deleteOne = async (req ,res, next) =>{
    try{
        const {id} = req.params;
        const menuItems = await menuItemsService.deleteOne(id);
        if(!menuItems){
            return res.status(404).json({message: 'Menu item not found'}); 
        }
        res.status(204).send();  
    } 
    catch(error){
        next(error);
    }
}





module.exports = {getAll, getById, create, update, deleteOne}; 