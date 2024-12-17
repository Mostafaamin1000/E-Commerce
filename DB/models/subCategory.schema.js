import mongoose, {Schema,model} from "mongoose";

const schema=new Schema({
name:{
    type:String,
    required:[true,'Name is required'],
    trim:true,
    minLength:[2,'Tooo Short']
},
slug:{
    type:String,
    lowercase:true,
    required:true
},
category:{
    type:mongoose.Types.ObjectId,
    ref:"Category"
},
CreatedBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
}
},{
    timestamps:false,
    versionKey:false
})

export const SubCategory= model('SubCategory',schema)