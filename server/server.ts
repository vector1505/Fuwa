import express from "express"
import type { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import { connect } from "node:http2";

const app = express();
dotenv.config({path : "./.env"})

app.use(express.json());
app.use(express.urlencoded({"extended" : true}))

const PORT = Number(process.env.PORT) || 5000;
const mongo_uri = process.env.MONGO_URI;

const connectDB = async() => {
    try{
        const con = await mongoose.connect(mongo_uri as string)
        console.log('MongoDB connected!!!');

    } catch(e){
        console.log(e as Error);
        process.exit(1);
    } 
};

connectDB().then(() => {
    if(process.env.MODE == "development"){
        app.listen(PORT,()=> {
            console.log(`Server started at ${PORT}`);
        })
    }
});

app.get('/health',async(req: Request,res: Response ) => {
    res.status(200).send({"message": "Server is working fine"});
})