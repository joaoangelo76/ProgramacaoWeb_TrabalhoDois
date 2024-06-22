const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, productController.createProduct);
router.get('/list', authMiddleware, productController.getProducts);
router.put('/edit/:id', authMiddleware, productController.updateProduct);
router.delete('/delete/:id', authMiddleware, productController.deleteProduct);

module.exports = router;

