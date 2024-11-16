import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import {
  getProductsPage,
  getProductPage,
  getIndexPage,
  getCartPage,
  getOrdersPage,
  postCart,
  postCartDeleteProduct,
  postOrder,
} from "../controllers/shop.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory the file is in

/* ----- router import ----- */
export const router = express.Router();

/* ----- configuration ----- */
router.get("/", getIndexPage);

router.get("/products", getProductsPage);

router.get("/products/:productId", getProductPage); // any dynamic route should be placed after the static routes

router.get("/cart", getCartPage);

router.post("/cart", postCart);

router.post("/cart-delete-item", postCartDeleteProduct);

// router.get("/orders", getOrdersPage);

router.post("/create-order", postOrder);
