import { Product } from "../models/product.js";
import { Cart } from "../models/cart.js";
import { where } from "sequelize";

export const getIndexPage = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

export const getProductsPage = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

export const getProductPage = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

export const getCartPage = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

export const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

export const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId, (product) => {
    console.log(product);
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

export const getCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

export const getOrdersPage = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};
