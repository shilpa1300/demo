const db = require('../models')

// create main Model
const Product = db.products
const Categorie = db.categories

// main work

// 1. create categorie

 const addCategorie = async (req, res) => {
    // validate request
     if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    } 

    const info = {    
        categoryName: req.body.categoryName
        // userId: req.body.userId, 
      };
    

      try {
        const categorie = await Categorie.create(info);
        res.status(200).send(categorie);
        console.log(categorie);
      } catch (err) {
        res.status(500).send({
          message: err.message || "Error occurred while creating the Product",
        });
      }
    }; 

// 2. get all categories

const getAllCategories = async (req, res) => {

    let categories = await Categorie.findAll({})
    res.status(200).send(categories)

}

// 3. get single category

const getOneCategorie = async (req, res) => {

    let id = req.params.id
    let categorie = await Categorie.findOne({ where: { id: id }})
    res.status(200).send(categorie)

}

// 4. update category

const updateCategorie = async (req, res) => {

    let id = req.params.id

    const categorie = await Categorie.update(req.body, { where: { id: id }})

    res.status(200).send(categorie)
   

}

// 5. delete category by id

const deleteCategorie = async (req, res) => {

    let id = req.params.id
    
    await Categorie.destroy({ where: { id: id }} )

    res.status(200).send('Category is deleted !')

}


module.exports = {
    addCategorie,
    getAllCategories,
    getOneCategorie,
    updateCategorie,
    deleteCategorie
}