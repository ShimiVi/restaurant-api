const pool = require('../db');

const getAll = async() =>{
    const result = await pool.query('select * from categories');
    return result.rows; 
}

const getById = async(id) => {
    const result = await pool.query('select * from categories WHERE id = $1', [id]);
    return result.rows[0];
}

module.exports = { getAll , getById};