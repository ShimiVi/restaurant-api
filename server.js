const express = require('express');
const categoriesRouter = require('./src/routes/categories');
const menuitemsRouter = require('./src/routes/menuItems'); 
const customersRouter = require('./src/routes/customers');
const ordersRouter = require('./src/routes/orders'); 
const authRouter = require('./src/routes/auth');

const app = express(); 
app.use(express.json()); 
  
app.use('/categories',categoriesRouter);
app.use('/menu-items',menuitemsRouter);
app.use('/customers',customersRouter);
app.use('/orders', ordersRouter); 
app.use('/auth', authRouter); 

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`); 
}); 

