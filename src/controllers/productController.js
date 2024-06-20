const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = new Product({ name, description, price, userId: req.userId });
        await product.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.userId });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;

        await product.save();
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.remove();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
