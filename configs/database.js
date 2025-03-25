const mongoose =require("mongoose")

const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/appchat")
        console.log("connect db success")
    } catch (error) {
        console.log(error.message);
        
    }
}
// Xuất module để sử dụng trong các file khác
module.exports =connectDB;