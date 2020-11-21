const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

//init express
const app = express();
//express middleware
app.use(express.json());

//connection to the database
const db = config.get('mongoURI')

mongoose.connect(db)
    .then(()=>console.log("Database connected successfully ...."))
    .catch(()=>console.log("Error connecting to the database"))


 app.use('/api/language',require('./routes/api/languages')) 
 app.use('/api/user',require('./routes/api/user'))
 app.use('/api/auth',require('./routes/api/auth'))  
const PORT =  process.env.PORT || 5000
    app.listen(PORT,()=>{console.log(`Database Started on port ${PORT}`)})