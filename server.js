const express = require('express');
const categoriesRouter = require('./src/routes/categories');
const menuitemsRouter = require('./src/routes/menuItems'); 
const customersRouter = require('./src/routes/customers');
const ordersRouter = require('./src/routes/orders'); 
const authRouter = require('./src/routes/auth');
const logger = require('./src/utils/logger'); 
const errorHandler = require('./src/middleware/errorHandler'); 

const app = express(); 
app.use(express.json()); 
app.use((req, res , next) => {
    logger.info(`${req.method} ${req.url}`); 
    next(); 
});
app.use('/categories',categoriesRouter);
app.use('/menu-items',menuitemsRouter);
app.use('/customers',customersRouter);
app.use('/orders', ordersRouter); 
app.use('/auth', authRouter); 
app.use(errorHandler);


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () =>{
    logger.info(`Server is running on port ${PORT}`); 
}); 

