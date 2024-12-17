import { Router } from "express";
import { AddsubCategory, deletesubCategory, getSubCategories, getsubCategory, updatesubCategory } from "./subcategory.controller.js";
const subCategoryRouter= Router({mergeParams:true})



subCategoryRouter.route('/')
.post(AddsubCategory).get(getSubCategories)


subCategoryRouter.route('/:id').get(getsubCategory).put(updatesubCategory).delete(deletesubCategory)


export default subCategoryRouter