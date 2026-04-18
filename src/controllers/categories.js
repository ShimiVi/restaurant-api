
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

module.exports = { getAll };