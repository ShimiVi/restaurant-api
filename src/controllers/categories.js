
const categoriesService = require('../services/categories'); 

const getAll = async (req, res)=>{
    try{
        const categories = await categoriesService.getAll(); 
        res.json(categories);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};
const getById = async (req, res)=>{
    try{
        const {id} = req.params;
        const categories = await categoriesService.getById(id); 
        res.json(categories);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports = { getAll, getById };