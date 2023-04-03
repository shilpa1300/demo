// import controllers review, products
const productController = require('../controllers/productController.js')
const categorieController = require('../controllers/categorieController.js');
const product = require('../models/product.js');
const categorie = require('../models/categorie.js');
var checkAuth = require('../middleware/auth.js')


// router
const categorieRouter = require('express').Router()


// use routers
categorieRouter.post('/addCategorie',checkAuth,categorieController.addCategorie)

categorieRouter.get('/allCategories',checkAuth,categorieController.getAllCategories)



// categories router
categorieRouter.get('/:id',checkAuth,categorieController.getOneCategorie)

categorieRouter.put('/:id',checkAuth,categorieController.updateCategorie)

categorieRouter.delete('/:id',checkAuth,categorieController.deleteCategorie)

module.exports = categorieRouter