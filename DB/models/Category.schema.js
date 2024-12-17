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
image:String,
CreatedBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
}
},{
    timestamps:true,
    versionKey:false
})

schema.post('init',function (doc){
if(doc.image) doc.image = "http://localhost:3000/uploads/category/" + doc.image
})

export const Category= model('Category',schema)