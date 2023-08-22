const express = require("express");
const productModel = require("../model/product");
const { loginAuth } = require("../midleware/auth");

const Product_Router = express.Router();

Product_Router.post("/", loginAuth, async (req, res) => {
  const product = req.body;

  const newProduct = await productModel(product);
  const response = await newProduct.save();

  res.status(201).json({ message: "succesfully created", response });
});

Product_Router.get("/", loginAuth, async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({ message: "succesfully get the data", products });
});

Product_Router.delete("/delete/:id", loginAuth, async (req, res) => {
  const { id } = req.params;
  const result = await productModel.findOneAndDelete({ _id: id });

  if (!result) {
    return res.status(404).json({ message: "product not found" });
  }
  res.status(200).json({ message: "product Deleted Succesfully" });
});

Product_Router.patch("/update/:id", loginAuth, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await productModel.findOneAndUpdate({ _id: id }, data);

  if (!result) {
    res.status(404).json({ message: "product are not found" });
  }
  res.status(200).json({ message: "Product are succesFully updated" });
});

module.exports = Product_Router;
