const pool = require('../db');

const getAll = async() =>{
    const result = await pool.query('select * from orders');
    return result.rows;
}

const getById = async(id) =>{
    const result = await pool.query('select * from orders where id=$1', [id]);
    return result.rows[0]; 
}

const getCustomerByUserId = async(user_id) => {
    const result = await pool.query('select * from  customers where user_id = $1', 
        [user_id]
    ); 
    return result.rows[0];
}


const create = async (customer_id, items) => {
    const client = await pool.connect();    
    try{
        await client.query('BEGIN'); 
        const orderResult = await client.query('insert into orders (customer_id) values ($1) RETURNING *'
            ,[customer_id]);
        const order = orderResult.rows[0];
        for (const item of items){ 
        const menu_itemsResult = await client.query('select price, is_available from menu_items where id=$1',
            [item.menu_item_id]
        ); 
        if(!menu_itemsResult.rows[0]){
            throw new Error(`Item ${item.menu_item_id} not found`); 
        }
        if(!menu_itemsResult.rows[0].is_available){
            throw new Error(`Item ${item.menu_item_id} is not available`)
        }
        const price = menu_itemsResult.rows[0].price; 
        await client.query('insert into order_items (order_id, menu_item_id, quantity, price) values ($1,$2,$3,$4)',
            [order.id, item.menu_item_id, item.quantity, price]);
        }
        await client.query('COMMIT'); 
        return order; 
    }
    catch(error){
        await client.query('ROLLBACK');
        throw error; 
    }
    finally{
        client.release(); 
    }
};


const updateStatus = async(id, status) => {
    const current = await pool.query('select * from orders where id=$1',
        [id]
    ); 
    const order = current.rows[0]; 

    if(!order){
        throw new Error(`Order ${id} is not found`)
    }

    const blockedStatuses = ['preparing','ready','completed']; 
    if(blockedStatuses.includes(order.status)){
        throw new Error(`Cannot update order with status ${order.status}`);   
    }

    const result = await pool.query('update orders set status=$1 where id=$2 RETURNING *', 
        [status,id]
    );
    return result.rows[0]; 
}



module.exports = {getAll, getById , getCustomerByUserId, create, updateStatus}; 