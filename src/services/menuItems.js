const pool = require('../db');


const getAll = async () =>{
    const result = await pool.query('select * from menu_items');
    return result.rows;
}

const getById = async(id) =>{
    const result = await pool.query('select * from menu_items where id=$1',[id]);
    return result.rows[0]; 
}

const create = async(name,price,category_id,is_available = true) => {
    const result = await pool.query('insert into menu_items(name,price,category_id,is_available) values ($1,$2,$3,$4) RETURNING *', [name,price,category_id,is_available]); 
    return result.rows[0];
}

const update = async(id,name,price,category_id,is_available = true) => {
    const result = await pool.query('update menu_items set name=$1, price=$2, category_id=$3, is_available=$4 where id=$5 RETURNING *', [name,price,category_id,is_available,id]);
    return result.rows[0]; 
}

const deleteOne = async(id) => {
    const result = await pool.query('delete from menu_items where id=$1', [id]);
    return result.rows[0];
}


module.exports = {getAll, getById, create, update, deleteOne}; 