const mongoose =require("mongoose")

const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/appchat")
        console.log("connect db success")
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports =connectDB;