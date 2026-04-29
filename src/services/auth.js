const pool = require('../db'); 
const bcrypt = require('bcrypt'); 

const register = async(name,phone,email,password,role) => {

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds); 

    const result = await pool.query('INSERT INTO users (name, email, password, role) values ($1,$2,$3,$4) RETURNING id, name, email, role' , 
        [name,email,hashedPassword,role]
    );
    const user = result.rows[0]; 
    const customer = await pool.query('INSERT INTO customers (name ,phone ,user_id) values($1, $2, $3) RETURNING name , user_id', 
        [name ,phone ,user.id]
    );
    return user; 
};

const login = async(email,password) =>{

    const result = await pool.query('SELECT * from users where email=$1',
        [email]
    );
    const user = result.rows[0]; 

    if(!user){
        throw new Error('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(password , user.password); 

    if(!validPassword){
        throw new Error('Invalid email or password');
    }
    return user; 
};

module.exports = {register,login};