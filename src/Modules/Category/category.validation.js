import Joi from "joi"; 


const AddCategoryVal =  Joi.object({
name:Joi.string().min(1).max(30).required(),
image:Joi.object({
fieldname:Joi.string().required(),
originalname:Joi.string().required(),
encoding:Joi.string().required(),
mimetype:Joi.string().required(),
size:Joi.number().max(5242880).required(),
destination:Joi.string().required(),
filename:Joi.string().required(),
path:Joi.string().required(),
}).required()
})

export{
AddCategoryVal,

}