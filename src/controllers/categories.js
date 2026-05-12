
const categoriesService = require('../services/categories'); 
const {createSchema, updateSchema} = require('../validators/categories.validator');

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
        if(!categories){
            return res.status(404).json({message: 'Category not found'})
        }
        res.json(categories);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const create = async (req,res) => {
    try{
        const {name , description} = req.body;
        
        const {error: errorJoi} = createSchema.validate(req.body); 
        if(errorJoi){
            return res.status(400).json({message: errorJoi.details[0].message});
        }

        const category = await categoriesService.create(name,description);
        res.status(201).json(category); 
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};
    
const update = async (req,res) => {
        try{
            const {id} = req.params;
            const {name, description} = req.body;
            
            const {error: errorJoi} = updateSchema.validate(req.body); 
            if(errorJoi){
                return res.status(400).json({message: errorJoi.details[0].message}); 
            }

            const category = await categoriesService.update(id,name,description); 
            if(!category){
                return res.status(404).json({message: 'Category not found'});
            }
            res.status(200).json(category);
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
}; 

const deleteOne = async(req, res) => {
    try{
        const {id} = req.params;
        const category = await categoriesService.deleteOne(id);
        if(!category){
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(204).send(); 
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports = { getAll, getById, create, update, deleteOne};