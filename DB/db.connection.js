import mongoose from "mongoose";

export const DBConnect= mongoose.connect('mongodb://localhost:27017/e-commerce').then(()=>{
    console.log('DB Connected Successfully..');
}).catch(()=>{
    console.log('Error in DB Connection');
    
})