const express = require("express");
const productModel = require("../model/product");
const { loginAuth } = require("../midleware/auth");

const Product_Router = express.Router();

Product_Router.post("/", loginAuth, async (req, res) => {
  try {
    const product = req.body;

    const newProduct = await productModel(product);
    const response = await newProduct.save();

    res.status(201).json({ message: "Successfully created", response });
  } catch (error) {
    console.error("Error while creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


Product_Router.get("/", loginAuth, async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ message: "Successfully retrieved data", products });
  } catch (error) {
    console.error("Error while fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


Product_Router.delete("/delete/:id", loginAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.findOneAndDelete({ _id: id });

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.error("Error while deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


Product_Router.patch("/update/:id", loginAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await productModel.findOneAndUpdate({ _id: id }, data);

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product Successfully Updated" });
  } catch (error) {
    console.error("Error while updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = Product_Router;
