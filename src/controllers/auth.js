const authService = require('../services/auth'); 
const jwt = require('jsonwebtoken'); 

const register = async (req ,res) => {

    try{
    const {name, email, password, role} = req.body; 

    if(!name || !email || !password){
        return res.status(400).json({message: 'name, email and password are required'});  
    }

    const user = await authService.register(name,email,password,role);
    res.status(201).json(user);
    }
    catch(error){
        return res.status(500).json({message: error.message}); 
    }
};

const login = async (req, res) => {
    try{
    const{email , password } = req.body; 

    if(!email || !password){
        return res.status(400).json({message: 'email and password are required'}); 
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