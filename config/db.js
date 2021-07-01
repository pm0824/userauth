const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = ()=>{
    //Connection to MongoDB cluster
    mongoose.connect(db,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology:true,
        useFindAndModify: false         
    }).then(()=>console.log('MongoDB connected'))
    .catch(err=>{
        console.error("Database error",err.message);
        process.exit(1);               
    });
};

module.exports = connectDB;