
const categoriesService = require('../services/categories'); 
const {createSchema, updateSchema} = require('../validators/categories.validator');

const getAll = async (req, res, next)=>{
    try{
        const categories = await categoriesService.getAll(); 
        res.json(categories);
    }
    catch(error){
        next(error);
    }
};
const getById = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const categories = await categoriesService.getById(id); 
        if(!categories){
            return res.status(404).json({message: 'Category not found'})
        }
        res.json(categories);
    }
    catch(error){
        next(error);
    }
};

const create = async (req,res,next) => {
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
        next(error);
    }
};
    
const update = async (req,res,next) => {
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
            next(error);
        }
}; 

const deleteOne = async(req, res,next) => {
    try{
        const {id} = req.params;
        const category = await categoriesService.deleteOne(id);
        if(!category){
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(204).send(); 
    }
    catch(error){
        next(error);
    }
};

module.exports = { getAll, getById, create, update, deleteOne};