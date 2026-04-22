const pool = require('../db');

const getAll = async() => {
    const result = await pool.query('select * from customers');
    return result.rows; 
};

const getById = async(id) => {
    const result = await pool.query('select * from customers where id=$1',[id]);
    return result.rows[0]; 
}

const create = async(name,phone,email) => {
    const result = await pool.query('insert into customers(name,phone,email) values($1,$2,$3) RETURNING *',
        [name,phone,email]
    );
    return result.rows[0]; 
}

const update = async(id, name, phone, email) =>{
    const result = await pool.query('update customers set name=$1, phone=$2,email=$3 where id=$4 RETURNING *' 
        ,[name,phone,email,id]);
    return result.rows[0]; 
}


module.exports = {getAll,getById,create,update}; 



