const express = require('express');
const connectDB = require('./config/db')

const app = express();

//Connect database
connectDB();

app.get('/',(req,res)=> res.json({msg:"Hello World!"}));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port: ${PORT}`));