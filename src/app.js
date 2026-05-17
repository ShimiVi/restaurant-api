const express = require('express');
const categoriesRouter = require('./routes/categories');
const menuitemsRouter = require('./routes/menuItems'); 
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders'); 
const authRouter = require('./routes/auth');
const logger = require('./utils/logger'); 
const errorHandler = require('./middleware/errorHandler'); 
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express(); 
app.use(express.json()); 
app.use(helmet()); 
const limiter =  rateLimit({
    windowMs: 15*60*1000,
    max: 10, 
    message: { message: 'Too many requests, please try again later' }
}); 
app.use('/auth/login', limiter);
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`); 
    next(); 
});
app.use('/categories', categoriesRouter);
app.use('/menu-items', menuitemsRouter);
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter); 
app.use('/auth', authRouter); 
app.use(errorHandler);

module.exports = app;