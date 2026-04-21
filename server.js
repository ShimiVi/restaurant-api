const express = require('express');
const categoriesRouter = require('./src/routes/categories');
const menuitemsRouter = require('./src/routes/menuItems'); 

const app = express(); 
app.use(express.json()); 
  
app.use('/categories',categoriesRouter);
app.use('/menu-items',menuitemsRouter);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`); 
}); 

