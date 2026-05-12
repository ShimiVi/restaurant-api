const authService = require('../services/auth'); 
const jwt = require('jsonwebtoken'); 
const {registerSchema , loginSchema} = require('../validators/auth.validator'); 

const register = async (req ,res) => {
    try{
    const {name,phone, email, password, role} = req.body; 

    const {error: errorJoi} = registerSchema.validate(req.body);
    
    if(errorJoi){
        return res.status(400).json({message: errorJoi.details[0].message})
    }

    const user = await authService.register(name,phone,email,password,role);
    res.status(201).json(user);
    }
    catch(error){
        if(error.message == 'Email already exists'){
            return res.status(400).json({message: error.message}); 
        }
        return res.status(500).json({message: error.message}); 
    }
};

const login = async (req, res) => {
    try{
    const{email , password } = req.body; 

    const {error: errorJoi} = loginSchema.validate(req.body); 
    if(errorJoi){
        return res.status(400).json({message: errorJoi.details[0].message})
    }

    const user = await authService.login(email,password); 

    const token = jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
    );
    res.json({ token });

    }
    catch(error){
        return res.status(401).json({message: error.message}); 
    }
};

module.exports = { register, login };