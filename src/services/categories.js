const pool = require('../db');

const getAll = async() =>{
    const result = await pool.query('select * from categories');
    return result.rows; 
}

module.exports = { getAll };