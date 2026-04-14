const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  // console.log("shop.js", adminData.products);
  const products = adminData.products;
  console.log(products, ":fasdfasdfasdf");
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop", { prods: products, docTitle: "Shoppppp" });
});

module.exports = router;
