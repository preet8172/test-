const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,);

        console.log("monogdb is connected sucessfully");
    }catch(error){
        console.log("error in connecting to mongodb", error.message);
        process.exit(1);
    }

};  

module.exports = connectDB;
     