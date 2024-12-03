// import path from'path';

import express from "express";

import * as adminController from "../controllers/admin.js";

import { isAuth } from "../middleware/is-auth.js"; // this used to protect the routes

export const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct); // i can add multiple middlewares and it will be executed from left to right

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", isAuth, adminController.postAddProduct);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth, adminController.postEditProduct);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);
