const express = require("express");
const productModel = require("../model/product");
const { loginAuth } = require("../midleware/auth");
const { userAuth } = require("../midleware/userAuth");

const Product_Router = express.Router();

const itemsPerPage = 9

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
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const products = await productModel.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    const itemsToSend = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    
    res.status(200).json({ message: "Successfully got the data",
    product:itemsToSend,currentPage: page,
    totalPages: totalPages});
  } catch (error) {
    console.error("Error while fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


Product_Router.get("/:id", loginAuth, async (req, res) => {

  try {
    const vendorId = req.params.id;
    console.log(vendorId)
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const products = await productModel.find({"vendorId":vendorId});
    console.log(products)
    
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    const itemsToSend = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    res.status(200).json({ message: "Successfully got the product", product: itemsToSend,currentPage: page,
    totalPages: totalPages});
  } catch (error) {
    console.error("Error while fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


Product_Router.get("/user/:id", userAuth, async (req, res) => {

  try {
    const vendorId = req.params.id;
    console.log(vendorId)
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const products = await productModel.find({"vendorId":vendorId});
    console.log(products)
    
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    const itemsToSend = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    res.status(200).json({ message: "Successfully got the product", product: itemsToSend,currentPage: page,
    totalPages: totalPages});
  } catch (error) {
    console.error("Error while fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


Product_Router.get("/get/user",userAuth,async (req, res) => {
  try {
   
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const products = await productModel.find();
    
    if (products.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    const itemsToSend = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / itemsPerPage);


    
    res.status(200).json({ message: "Successfully got the data",
    product:itemsToSend,currentPage: page,
    totalPages: totalPages});
  } catch (error) {
    console.error("Error while fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


Product_Router.get("/product/:name", userAuth, async (req, res) => {

  try {
    const name = req.params.name;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Assuming you have a Vendor model and you want to filter by the name field
    const product = await productModel.find({ name: { $regex: new RegExp(name, "i") } });

    const itemsToSend = product.slice(startIndex, endIndex);
    const totalPages = Math.ceil(product.length / itemsPerPage);

    if (product.length === 0) {
      return res.status(204).json({ message: "Data not found" });
    }

    res.status(200).json({
      message: "Successfully got the data",
      vendorsList: itemsToSend,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error fetching vendor data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Product_Router.get("/product/:id/:name", userAuth, async (req, res) => {

  try {
    const name = req.params.name;
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Assuming you have a Vendor model and you want to filter by the name field
    const product = await productModel.find({ name: { $regex: new RegExp(name, "i") },vendorId:id });

    const itemsToSend = product.slice(startIndex, endIndex);
    const totalPages = Math.ceil(product.length / itemsPerPage);

    if (product.length === 0) {
      return res.status(204).json({ message: "Data not found" });
    }

    res.status(200).json({
      message: "Successfully got the data",
      vendorsList: itemsToSend,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error fetching vendor data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Product_Router.get("/admin/product/:name", loginAuth, async (req, res) => {

  try {
    const name = req.params.name;
    const id = req.body.vendorId;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Assuming you have a Vendor model and you want to filter by the name field
    const product = await productModel.find({ name: { $regex: new RegExp(name, "i") } ,
    vendorId:id
    });

    const itemsToSend = product.slice(startIndex, endIndex);
    const totalPages = Math.ceil(product.length / itemsPerPage);

    if (product.length === 0) {
      return res.status(204).json({ message: "Data not found" });
    }

    res.status(200).json({
      message: "Successfully got the data",
      vendorsList: itemsToSend,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error fetching vendor data:", error);
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
