import { Router } from "express";
import { AddCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./category.controller.js";
import { uploadSinleFile } from "../../fileUpload/fileUpload.js";
import { Validate } from "../../MiddleWares/validate.js";
import { AddCategoryVal } from "./category.validation.js";
import subCategoryRouter from "../SubCategory/subcategory.router.js";
const categoryRouter= Router()
categoryRouter.use('/:category/subcategory',subCategoryRouter)


categoryRouter.route('/').post(uploadSinleFile('image','category'),Validate(AddCategoryVal),AddCategory).get(getCategories)


categoryRouter.route('/:id').get(getCategory).put(uploadSinleFile('image','category'),updateCategory).delete(deleteCategory)


export default categoryRouter