const Transaction = require('../models/Transaction');

exports.createOrUpdateTransaction = async (req, res) => {
    try {
        const { id, name, kind, category, amount, date, description } = req.body;
        if (id) {
            let transaction = await Transaction.findByPk(id)
            transaction = await transaction.update({ id, name, kind, category, amount, date, description });
            console.log("Transaction updated successfully: ", transaction);
        } else {
            const transaction = await Transaction.create({ name, kind, category, amount, date, description, userId: req.session.userId });
            console.log("Transaction created successfully: ", transaction);
        }
        res.redirect('/home');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        await transaction.destroy();
        res.redirect('/home');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
