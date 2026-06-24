const { Pool } = require('pg'); 
const bcrypt = require('bcrypt'); 
require('dotenv').config({ path: '.env.test' });

const pool = new Pool({
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT, 
    database: process.env.DB_NAME, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
}); 

module.exports = async () => {
    await pool.query('DELETE FROM order_items');
    await pool.query('DELETE FROM orders');
    await pool.query('DELETE FROM customers');
    await pool.query('DELETE FROM users');
    await pool.query('DELETE FROM menu_items');
    await pool.query('DELETE FROM categories');  
    
    const categoryResult = await pool.query(
        `INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id`,
        ['Test Category', 'Test Description']
    ); 
    const categoryId = categoryResult.rows[0].id; 

    const menuItemResult = await pool.query(
        `INSERT INTO menu_items (name, price, category_id) VALUES ($1, $2, $3) RETURNING id`,
        ['Test Item', 10, categoryId]
    );
    const menuItemId = menuItemResult.rows[0].id;

    const hashedPassword = await bcrypt.hash('1234', 10); 
    const userResult = await pool.query(
        `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id`,
        ['Shimi', 'shimi@gmail.com', hashedPassword, 'owner']
    );
    const userId = userResult.rows[0].id;

    const customerResult = await pool.query(
        `INSERT INTO customers (name, phone, email, user_id) VALUES ($1, $2, $3, $4) RETURNING id`,
        ['Test Customer', '0501234567', 'customer@test.com', userId]
    );
    const customerId = customerResult.rows[0].id;

    const orderResult = await pool.query(
        `INSERT INTO orders (customer_id) VALUES ($1) RETURNING id`,
        [customerId]
    );
    const orderId = orderResult.rows[0].id;

    process.env.TEST_CATEGORY_ID = categoryId;
    process.env.TEST_MENU_ITEM_ID = menuItemId;
    process.env.TEST_USER_ID = userId;
    process.env.TEST_CUSTOMER_ID = customerId;
    process.env.TEST_ORDER_ID = orderId;

    await pool.end();
};