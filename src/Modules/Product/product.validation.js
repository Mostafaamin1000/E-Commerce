import Joi from "joi"; 

const AddProductVal =  Joi.object({
title:Joi.string().min(1).max(30).required(),
description:Joi.string().min(10).max(250).required(),
price:Joi.number().min(0).required(),
priceAfterDiscount:Joi.number().min(0).required(),
sold:Joi.number().min(0).required(),
Stock:Joi.number().min(0).required(),
rateCount:Joi.number().min(0).required(),
rateAvg:Joi.number().min(0).max(5).required(),

// imageCover:Joi.object({
// fieldname:Joi.string().required(),
// originalname:Joi.string().required(),
// encoding:Joi.string().required(),
// mimetype:Joi.string().required(),
// size:Joi.number().max(5242880).required(),
// destination:Joi.string().required(),
// filename:Joi.string().required(),
// path:Joi.string().required(),
// }).required(),
// images:Joi.object({
//     fieldname:Joi.string().required(),
//     originalname:Joi.string().required(),
//     encoding:Joi.string().required(),
//     mimetype:Joi.string().required(),
//     size:Joi.number().max(5242880).required(),
//     destination:Joi.string().required(),
//     filename:Joi.string().required(),
//     path:Joi.string().required(),
//     }).required(),

})

export{
    AddProductVal
}