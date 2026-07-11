const mongoose = require("mongoose")

async function connectDB(){

   try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Successfully Connected to DataBase")

   }
   catch(err){
        console.log("Error Connecting DataBase - " , err)
   }
}

module.exports = connectDB