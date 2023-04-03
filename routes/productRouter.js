// import controllers review, products
const productController = require('../controllers/productController.js')
const categorieController = require('../controllers/categorieController.js');
const product = require('../models/product.js');
var checkAuth = require('../middleware/auth.js')

// router
const router = require('express').Router()



// use routers
router.post('/addProduct',checkAuth,productController.addProduct)

router.get('/allProducts',checkAuth,productController.getAllProducts)



// Products router
router.get('/:id',checkAuth,productController.getOneProduct)

router.put('/:id',checkAuth,productController.updateProduct)

router.delete('/:id',checkAuth,productController.deleteProduct)



// Categorie Url and Controller

router.get('/allCategories', categorieController.getAllCategories)
router.post('/addCategorie/:id', categorieController.addCategorie)

// getOne(View) product Categories
router.get('/getProductCategories/:id',checkAuth,productController.getProductCatgeories)





module.exports = router