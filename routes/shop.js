// const path = require('path');

import express from "express";

import * as shopController from "../controllers/shop.js";

export const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.post("/create-order", shopController.postOrder);

router.get("/orders", shopController.getOrders);

export default router;
