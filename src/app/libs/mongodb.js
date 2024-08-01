// import mongoose from "mongoose";

// const MONGODB_URI = "mongodb+srv://pbr:pb8hPUUzKvz6fg4p@cluster0.efsfnkx.mongodb.net/crud_db";


// const connectMongoDB = async ()=>{
//     try{
//         await mongoose.connect(process.env.MONGODB_URI);
//         //console.log("connected to mongodb")
//     } catch (error) {
//         //console.log(error);
//     }
// }

// export default connectMongoDB;
import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://pbr:pb8hPUUzKvz6fg4p@cluster0.efsfnkx.mongodb.net/crud_db";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        //console.log("Connected to MongoDB");
    } catch (error) {
        //console.log(error);
    }
};

export default connectMongoDB;
