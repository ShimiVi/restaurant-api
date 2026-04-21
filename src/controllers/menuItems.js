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
        res.json(menuItems); 
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

const create = async (req, res) => {
    try{
        const{name, price, category_id, is_available} = req.body; 
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
        const menuItems = await menuItemsService.update(id,name,price,category_id,is_available); 
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
        res.status(204).send();  
    } 
    catch(error){
        res.status(500).json({message: error.message});
    }
}





module.exports = {getAll, getById, create, update, deleteOne}; 