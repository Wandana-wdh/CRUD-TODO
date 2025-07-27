const mongoose= require("mongoose"); // From this file trying to connect backend with DB
require("dotenv").config();

const connectToDb = async() => {
    try{
        const connect=await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log(`Database connected:${connect.connection.name}`);
    }
    catch(error){
        console.error("Database failed")
    }
};

module.exports= connectToDb;