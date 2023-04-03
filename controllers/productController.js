const db = require("../models");
// const {Categories} = require('../models/categorie');
// create main Model
const Product = db.products;
const Categories = db.categories;

// main work

// 1. create product

const addProduct = async (req, res) => {
  /* console.log(req.body) */
  //validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const info = {
    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,
    //  userId: req.body.userId,
    categoryId: req.body.categoryId,
  };

  try {
    const result = await Product.create(info);
    res.status(200).send(result);
    console.log(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Product",
    });
  }
};

// 2. get all products

const getAllProducts = async (req, res) => {
  let result= await Product.findAll({ include: ["categories"] });
  res.status(200).send(result);
};

// 3. get single product

const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

// 4. update Product

const updateProduct = async (req, res) => {
  let id = req.params.id;

  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send(product);
};

// 5. delete product by id

const deleteProduct = async (req, res) => {
  let id = req.params.id;

  await Product.destroy({ where: { id: id } });

  res.status(200).send("Product is deleted !");
};

// 6. connect one to many relation Product and Categories

const getProductCatgeories = async (req, res) => {
  const id = req.params.id;

  console.log("id ", id);

  const product = await Product.findByPk(id, { include: ["categories"] })
    .then((product) => {
      console.log("product ", product);
      return product;
    })
    .catch((err) => {
      console.log(">> Error while finding product: ", err);
    });
  return res.status(200).json({
    data: product,
  });
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getProductCatgeories,
};
