import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAddProductPage,
  postAddProductPage,
  getProductsPage,
  getEditProductPage,
  postEditProductPage,
  postDeleteProduct,
} from "../controllers/admin.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory the file is in

// we can use the same url with deferent methods(get,post,put,delete), notes that the url is the same

/* ----- router import ----- */
export const router = express.Router();

/* ----- midlleware configuration ----- */
// /admin/add-product => GET
router.get("/add-product", getAddProductPage);

// /admin/add-product => POST
router.post("/add-product", postAddProductPage);

// /admin/add-product => GET
router.get("/products", getProductsPage);

// // /admin/edit-product => GET
router.get("/edit-product/:productId", getEditProductPage);

// // /admin/edit-product => POST
router.post("/edit-product", postEditProductPage);

// // /admin/delete-product => POST
router.post("/delete-product", postDeleteProduct);
